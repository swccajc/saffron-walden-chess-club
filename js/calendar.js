// Load events.csv and locations.txt, generate table
async function loadCalendar() {
  const eventsResp = await fetch('content/events.csv');
  const eventsText = await eventsResp.text();
  const locationsResp = await fetch('content/locations.txt');
  const locationsText = await locationsResp.text();

  // Parse locations.txt
  const locations = {};
  locationsText.split('\n').forEach(line => {
    const [key, name, address, map_url] = line.split(',');
    if (key) locations[key.trim()] = { name: name.trim(), address: address.trim(), map_url: map_url.trim() };
  });

  // Parse events.csv
  const events = eventsText.split('\n')
    .slice(1) // skip header
    .map(line => {
      const [date, time, location_key, note] = line.split(',');
      return { date, time, location_key, note };
    })
    .filter(e => e.date && locations[e.location_key]); // keep only valid events

  // Filter dates >= today and <= today + 365
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 365);

  const upcoming = events
    .map(e => ({ ...e, dateObj: new Date(e.date + 'T00:00:00') }))
    .filter(e => e.dateObj >= today && e.dateObj <= maxDate)
    .sort((a, b) => a.dateObj - b.dateObj);

  // Group by year
  const years = {};
  upcoming.forEach(e => {
    const year = e.dateObj.getFullYear();
    if (!years[year]) years[year] = [];
    years[year].push(e);
  });

  const container = document.getElementById('calendar-container');
  for (const year of Object.keys(years).sort()) {
    const yearEl = document.createElement('h2');
    yearEl.className = 'year';
    yearEl.textContent = year;
    container.appendChild(yearEl);

    const table = document.createElement('table');
    table.className = 'calendar-table';
    const tbody = document.createElement('tbody');

    years[year].forEach(e => {
      const loc = locations[e.location_key];
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="date">${e.time} ${new Date(e.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</td>
        <td class="location">${loc.name}</td>
        <td class="note">${e.note || ''}</td>
      `;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);
  }
}

loadCalendar();