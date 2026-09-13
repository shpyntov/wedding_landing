function createWeddingCalendar() {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Yuri and Alexandra//Wedding Invitation//RU',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:yuri-alexandra-20261024@wedding.invitation',
    'DTSTAMP:20260912T000000Z',
    'DTSTART:20261024T060000Z',
    'SUMMARY:Свадьба Юрия и Александры',
    'LOCATION:Москва\\, Грибоедовский ЗАГС',
    'DESCRIPTION:Ждём вас на нашей свадьбе!',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}

if (typeof document !== 'undefined') {
  document.getElementById('calendar').addEventListener('click', () => {
    const file = new Blob([createWeddingCalendar()], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'yuri-alexandra-24-10-2026.ics';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.getElementById('calendar-status').textContent = 'Откройте скачанный файл .ics, чтобы сохранить событие в календаре.';
  });
}

if (typeof module !== 'undefined') {
  module.exports = { createWeddingCalendar };
}
