fetch('content/news.txt')
  .then(res => res.text())
  .then(text => {
    const container = document.getElementById('news-container');
    text.split('\n').forEach(line => {
      if(!line.trim()) return;
      const [title, content] = line.split('|');
      const article = document.createElement('article');
      article.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
      container.appendChild(article);
    });
  });