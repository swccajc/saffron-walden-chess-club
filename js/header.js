// header.js - loads header.html and sets up burger menu, returns a Promise for when ready
window.loadHeader = async function() {
  const container = document.getElementById('header-container');
  if (!container) return;

  try {
    const resp = await fetch('includes/header.html');
    if (!resp.ok) throw new Error(`Failed to fetch header.html: ${resp.status}`);

    container.innerHTML = await resp.text();

    const burger = container.querySelector('.burger');
    const nav = container.querySelector('.main-nav');

    if (burger && nav) {
      burger.addEventListener('click', () => {
        const expanded = nav.classList.toggle('active');
        burger.setAttribute('aria-expanded', expanded);
      });
    }

  } catch (err) {
    console.error(err);
  }
};