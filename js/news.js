(async () => {
  const text = await loadText('content/news.txt');
  const entries = text.trim().split('\n\n');

  const container = document.getElementById('news-container');

  entries.forEach(entry => {
    const [header, body] = entry.split('\n');
    const [date, title] = header.split('|');

    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${title}</h3>
      <p><em>${date}</em></p>
      <p>${body}</p>
    `;

    container.appendChild(div);
  });
})();