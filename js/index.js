// Load About text
fetch('content/about.txt')
  .then(res => res.text())
  .then(text => {
    const aboutEl = document.querySelector('#about p');
    if(aboutEl) aboutEl.textContent = text;
  });

// Load events and locations, display next event
Promise.all([
  fetch('content/events.csv').then(res => res.text()),
  fetch('content/locations.txt').then(res => res.text())
]).then(([eventsText, locationsText]) => {
  const locations = {};
  locationsText.split('\n').forEach(line => {
    const [key, name, address, map_url] = line.split('|');
    if(key) locations[key.trim()] = { name, address, map_url };
  });

  const today = new Date();
  const events = eventsText.split('\n').slice(1).map(line => {
    if(!line.trim()) return null;
    const [date, time, location_key, note] = line.split(',');
    return { date, time, location_key, note };
  }).filter(e => e && new Date(e.date+"T00:00:00") >= today);

  if(events.length === 0) return;

  events.sort((a,b) => new Date(a.date) - new Date(b.date));
  const nextEvent = events[0];
  const location = locations[nextEvent.location_key];
  const container = document.querySelector('#calendar .event-details');

  if(container && location){
    container.innerHTML = `
      <div>
        <p class="event-date">
          <a href="calendar.html">${nextEvent.time} ${new Date(nextEvent.date).toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}</a>
        </p>
        <p class="event-address">
          ${location.name}<br>
          ${location.address.replace(/, /g,'<br>')}
        </p>
      </div>
      <div>
        <iframe src="${location.map_url}&output=embed" loading="lazy" title="Map showing ${location.name}"></iframe>
      </div>
    `;
  }
});