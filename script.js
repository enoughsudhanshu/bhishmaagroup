const loginBtn = document.getElementById('loginBtn');
const megaMenu = document.getElementById('megaMenu');

loginBtn.addEventListener('click', () => {
  megaMenu.classList.toggle('active');
});

window.addEventListener('click', (e) => {

  if(
    !loginBtn.contains(e.target) &&
    !megaMenu.contains(e.target)
  ){
    megaMenu.classList.remove('active');
  }
});
