// Load About text
fetch('content/about.txt')
  .then(res => res.text())
  .then(text => {
    const aboutEl = document.querySelector('#about p');
    if (aboutEl) aboutEl.textContent = text;
  });