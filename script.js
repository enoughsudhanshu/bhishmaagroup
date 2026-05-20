// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const header = document.querySelector('.navbar');

if (navToggle && header) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    header.classList.toggle('nav-open');
    navToggle.classList.toggle('active');
  });

  window.addEventListener('click', (e) => {
    if (
      header.classList.contains('nav-open') &&
      !navToggle.contains(e.target) &&
      !header.querySelector('.nav-menu').contains(e.target)
    ) {
      header.classList.remove('nav-open');
      navToggle.classList.remove('active');
    }
  });
}
