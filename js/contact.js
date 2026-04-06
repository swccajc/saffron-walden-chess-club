// Load social links
fetch('content/contact.txt')
  .then(res => res.text())
  .then(text => {
    const container = document.getElementById('contact-container');
    const data = {};
    text.split('\n').forEach(line => {
      const [key, val] = line.split('|');
      if(key) data[key.trim()] = val.trim();
    });

    if(container){
      container.innerHTML = '';
      if(data.facebook){
        container.innerHTML += `<p>Join us on Facebook: <a href="${data.facebook}" target="_blank" rel="noopener">Saffron Walden Chess Club Facebook Group</a></p>`;
      }
      if(data.chesscom){
        container.innerHTML += `<p>Our Chess.com club: <a href="${data.chesscom}" target="_blank" rel="noopener">Saffron Walden UK</a></p>`;
      }
    }
  })
  .catch(err => console.error('Failed to load contact.txt', err));