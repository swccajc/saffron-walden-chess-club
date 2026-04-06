async function loadHeader() {
  const res = await fetch('includes/header.html');
  const html = await res.text();
  document.body.insertAdjacentHTML('afterbegin', html);
  initBurgerMenu();
}

function initBurgerMenu() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// Call it immediately
loadHeader();