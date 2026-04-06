// Shared function: load + parse everything
async function getEventsData() {
  const [eventsResp, locationsResp] = await Promise.all([
    fetch('content/events.csv'),
    fetch('content/locations.txt')
  ]);

  const eventsText = await eventsResp.text();
  const locationsText = await locationsResp.text();

  // Parse locations
  const locations = {};
  locationsText.trim().split('\n').forEach(line => {
    const [key, name] = line.split('|');
    if (key) locations[key.trim()] = name.trim();
  });

  // Parse events
  const events = eventsText.trim().split('\n')
    .slice(1) // skip header
    .map(line => {
      const [date, time, location_key, note] = line.split(',');
      return {
        date: date.trim(),
        time: time.trim(),
        location_key: location_key.trim(),
        note: note ? note.trim() : ''
      };
    })
    .filter(e => e.date && locations[e.location_key]);

  // Filter: today → +365 days
  const today = new Date();
  today.setHours(0,0,0,0);

  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 365);

  return events
    .map(e => ({
      ...e,
      dateObj: new Date(e.date + 'T00:00:00'),
      location: locations[e.location_key]
    }))
    .filter(e => e.dateObj >= today && e.dateObj <= maxDate)
    .sort((a, b) => a.dateObj - b.dateObj);
}

// Render full calendar page
async function loadCalendar() {
  const events = await getEventsData();
  const container = document.getElementById('calendar-container');

  const years = {};
  events.forEach(e => {
    const year = e.dateObj.getFullYear();
    if (!years[year]) years[year] = [];
    years[year].push(e);
  });

  Object.keys(years).sort().forEach(year => {
    const heading = document.createElement('h3');
    heading.textContent = year;
    container.appendChild(heading);

    const table = document.createElement('table');
    table.className = 'calendar-table';

    const tbody = document.createElement('tbody');

    years[year].forEach(e => {
      const tr = document.createElement('tr');
      const dateStr = e.dateObj.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });

      tr.innerHTML = `
        <td>${e.time} ${dateStr}</td>
        <td>${e.location}</td>
        <td>${e.note}</td>
      `;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);
  });
}

// Render next upcoming event (homepage)
async function loadNextEvent(elementId) {
  const events = await getEventsData();
  if (!events.length) return;

  const e = events[0];
  const el = document.getElementById(elementId);

  const dateStr = e.dateObj.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  el.innerHTML = `
    <div class="event-date">
      <a href="calendar.html">
        ${e.time} ${dateStr}
      </a>
    </div>
    <p>${e.location}</p>
    ${e.note ? `<p>${e.note}</p>` : ''}
  `;
}