document.addEventListener('DOMContentLoaded', async () => {
  // Load header.html into every page
  const container = document.getElementById('header-container');
  if (container) {
    try {
      const resp = await fetch('includes/header.html');
      const html = await resp.text();
      container.innerHTML = html;

      // After injecting, set up burger menu
      const burger = container.querySelector('.burger');
      const nav = container.querySelector('.main-nav');
      if (burger && nav) {
        burger.addEventListener('click', () => {
          const expanded = nav.classList.toggle('active');
          burger.setAttribute('aria-expanded', expanded);
        });
      }
    } catch (err) {
      console.error('Failed to load header:', err);
    }
  }
});