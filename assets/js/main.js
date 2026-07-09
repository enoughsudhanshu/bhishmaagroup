document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Logic ---
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const htmlElement = document.documentElement;

  // Retrieve theme preference from localStorage or check system preference
  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    htmlElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);

    // Update button icons
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun-fill';
        themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
      } else {
        themeIcon.className = 'bi bi-moon-fill';
        themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
      }
    }
  };

  // Set initial theme
  setTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-bs-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // --- Active Nav Link Handler ---
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      // Clean up path matching
      const linkPath = href.replace('../', '').replace('./', '');
      const cleanCurrentPath = currentPath.split('/').pop() || 'index.html';

      if (cleanCurrentPath === linkPath || (cleanCurrentPath === '' && linkPath === 'index.html')) {
        link.classList.add('active');
        // If it's a dropdown item, also highlight the parent dropdown toggle
        if (link.classList.contains('dropdown-item')) {
          const parentToggle = link.closest('.dropdown')?.querySelector('.dropdown-toggle');
          if (parentToggle) {
            parentToggle.classList.add('active');
          }
        }
      }
    }
  });

  // --- Contact Form: Validation + Redirect to Email App (mailto) ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      let isValid = true;

      // Name validation
      const nameInput = document.getElementById('name');
      const nameError = document.getElementById('nameError');
      if (nameInput.value.trim() === '') {
        nameInput.classList.add('is-invalid');
        if (nameError) nameError.textContent = 'Please enter your name.';
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
      }

      // Email validation
      const emailInput = document.getElementById('email');
      const emailError = document.getElementById('emailError');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      }

      // Subject validation
      const subjectInput = document.getElementById('subject');
      const subjectError = document.getElementById('subjectError');
      if (subjectInput.value.trim() === '') {
        subjectInput.classList.add('is-invalid');
        if (subjectError) subjectError.textContent = 'Please enter a subject.';
        isValid = false;
      } else {
        subjectInput.classList.remove('is-invalid');
        subjectInput.classList.add('is-valid');
      }

      // Message validation
      const messageInput = document.getElementById('message');
      const messageError = document.getElementById('messageError');
      if (messageInput.value.trim() === '') {
        messageInput.classList.add('is-invalid');
        if (messageError) messageError.textContent = 'Please enter your message.';
        isValid = false;
      } else {
        messageInput.classList.remove('is-invalid');
        messageInput.classList.add('is-valid');
      }

      if (isValid) {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        const toEmail = 'bhishmaagroup@gmail.com'; // receiving email
        const emailSubject = `[Website Inquiry] ${subject}`;
        const emailBody =
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Subject: ${subject}\n\n` +
          `Message:\n${message}`;

        const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        // Show confirmation UI with both options, in case the default mail app doesn't open
        const formContainer = contactForm.parentElement;
        formContainer.innerHTML = `
          <div class="text-center py-5 animate-fade-in">
            <div class="display-1 text-primary mb-4">
              <i class="bi bi-envelope-check-fill"></i>
            </div>
            <h3 class="h4 mb-3">Almost there!</h3>
            <p class="text-muted mb-4">Your message is ready. Click below to open your email app with everything pre-filled, then hit Send.</p>
            <a href="${mailtoLink}" class="btn btn-primary-custom mb-2" id="openMailApp">
              <i class="bi bi-send-fill me-2"></i>Open Email App
            </a>
            <p class="small text-muted mt-3 mb-0">
              Email app not opening? <a href="${gmailLink}" target="_blank" rel="noopener noreferrer">Use Gmail instead</a>
            </p>
            <div class="mt-4">
              <button class="btn btn-outline-primary btn-sm" onclick="window.location.reload()">Send Another Message</button>
            </div>
          </div>
        `;

        // Auto-trigger the email app open
        window.location.href = mailtoLink;
      }
    });
  }

  // --- Interactive Dashboard Chart Effects ---
  const chartBars = document.querySelectorAll('.chart-bar');
  if (chartBars.length > 0) {
    setInterval(() => {
      chartBars.forEach(bar => {
        // Slightly fluctuate the height to give it a living, dashboard feel
        const originalHeight = bar.style.height || getComputedStyle(bar).height;
        const percent = parseInt(originalHeight);
        if (!isNaN(percent)) {
          const fluctuation = Math.floor(Math.random() * 15) - 7; // -7% to +7%
          let newPercent = percent + fluctuation;
          newPercent = Math.max(20, Math.min(100, newPercent)); // keep bounds between 20% and 100%
          bar.style.height = `${newPercent}%`;
        }
      });
    }, 4000);
  }
});
