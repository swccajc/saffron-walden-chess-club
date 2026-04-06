(async () => {
  const text = await loadText('content/events.csv');
  const events = parseCSV(text);

  const today = new Date();
  const max = new Date();
  max.setDate(today.getDate() + 365);

  const filtered = events
    .map(e => ({ ...e, d: parseDate(e.date) }))
    .filter(e => e.d >= today && e.d <= max)
    .sort((a, b) => a.d - b.d);

  const tbody = document.getElementById('calendar-body');

  filtered.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.time} ${formatDate(e.date)}</td>
      <td>${e.location}</td>
      <td>${e.note || ''}</td>
    `;
    tbody.appendChild(tr);
  });
})();