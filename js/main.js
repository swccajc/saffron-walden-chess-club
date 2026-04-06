// HEADER
document.getElementById('header').innerHTML = `
<header>
  <div class="header-inner">
    <h1><a href="index.html">Saffron Walden Chess Club</a></h1>
    <nav>
      <a href="calendar.html">Calendar</a>
      <a href="news.html">News</a>
      <a href="contact.html">Contact</a>
    </nav>
  </div>
</header>
`;

// UTILITIES
async function loadText(path) {
  const res = await fetch(path);
  return await res.text();
}

function parseCSV(text) {
  const rows = text.trim().split('\n').slice(1);
  return rows.map(r => {
    const [date, time, location, note] = r.split(',');
    return { date, time, location, note };
  });
}

function parseDate(d) {
  return new Date(d + "T00:00:00");
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
}

// ABOUT
(async () => {
  const container = document.getElementById('about-container');
  if (!container) return;

  const text = await loadText('content/about.txt');

  text.split('\n\n').forEach(block => {
    const p = document.createElement('p');
    p.textContent = block;
    container.appendChild(p);
  });
})();

// NEXT EVENT
(async () => {
  const el = document.getElementById('next-event-link');
  if (!el) return;

  const text = await loadText('content/events.csv');
  const events = parseCSV(text);

  const today = new Date();

  const next = events
    .map(e => ({ ...e, d: parseDate(e.date) }))
    .filter(e => e.d >= today)
    .sort((a, b) => a.d - b.d)[0];

  if (!next) return;

  el.textContent = formatDate(next.date);
  document.getElementById('next-event-location').textContent = next.location;
})();