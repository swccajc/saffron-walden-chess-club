// Load venue (reusing locations.txt)
async function loadVenue() {
  const locationsResp = await fetch('content/locations.txt');
  const locationsText = await locationsResp.text();
  const lines = locationsText.split('\n');

  // We'll pick first venue for now (can extend later)
  const firstVenueLine = lines.find(line => line.trim());
  if (!firstVenueLine) return;

  const [key, name, address, map_url] = firstVenueLine.split(',');
  const container = document.getElementById('venue-details');
  container.innerHTML = `
    <div class="event-left">
      <p class="event-address">
        ${name}<br>
        ${address}
      </p>
    </div>
    <div class="event-right">
      <iframe src="${map_url}" allowfullscreen="" loading="lazy"></iframe>
    </div>
  `;

  container.style.display = 'grid';
  container.style.gridTemplateColumns = '1fr 1fr';
  container.style.gap = '2rem';
  container.querySelector('.event-right iframe').style.height = '300px';
  container.querySelector('.event-right iframe').style.width = '100%';
  container.querySelector('.event-right iframe').style.border = '0';
  container.querySelector('.event-right iframe').style.borderRadius = '8px';
  container.querySelector('.event-right iframe').style.verticalAlign = 'top';
}

// Load social links from contact.txt
async function loadSocial() {
  const resp = await fetch('content/contact.txt');
  const text = await resp.text();
  const container = document.getElementById('social-links');

  // Each line in contact.txt should be: name|url
  text.split('\n').forEach(line => {
    if (!line.trim()) return;
    const [name, url] = line.split('|');
    const li = document.createElement('li');
    li.innerHTML = `<a href="${url.trim()}" target="_blank" rel="noopener">${name.trim()}</a>`;
    container.appendChild(li);
  });
}

// Initialize
loadVenue();
loadSocial();