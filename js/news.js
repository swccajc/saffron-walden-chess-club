async function loadNews() {
  const resp = await fetch('content/news.txt');
  const text = resp.text ? await resp.text() : '';
  const container = document.getElementById('news-content');
  text.split('\n\n').forEach(item => { // assume double newline separates news items
    if (!item.trim()) return;
    const p = document.createElement('p');
    p.textContent = item.trim();
    container.appendChild(p);
  });
}

loadNews();