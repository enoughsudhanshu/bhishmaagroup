const loginBtn = document.getElementById('loginBtn');
const megaMenu = document.getElementById('megaMenu');
const navToggle = document.getElementById('navToggle');
const header = document.querySelector('.navbar');

loginBtn.addEventListener('click', () => {
  megaMenu.classList.toggle('active');
});

navToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  header.classList.toggle('nav-open');
  navToggle.classList.toggle('active');
});

window.addEventListener('click', (e) => {

  if(
    !loginBtn.contains(e.target) &&
    !megaMenu.contains(e.target)
  ){
    megaMenu.classList.remove('active');
  }

  if(
    header.classList.contains('nav-open') &&
    !navToggle.contains(e.target) &&
    !header.querySelector('nav').contains(e.target)
  ){
    header.classList.remove('nav-open');
    navToggle.classList.remove('active');
  }
});