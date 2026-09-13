const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createWeddingCalendar } = require('../script.js');

test('calendar event starts at 09:00 Moscow on October 24, 2026', () => {
  const calendar = createWeddingCalendar();
  assert.ok(calendar.includes('DTSTART:20261024T060000Z\r\n'));
  const local = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Moscow', dateStyle: 'short', timeStyle: 'short',
  }).format(new Date('2026-10-24T06:00:00Z'));
  assert.equal(local, '24/10/2026, 09:00');
  assert.ok(!calendar.includes('DTEND'));
  assert.ok(!calendar.includes('DURATION'));
});

test('calendar has names, escaped location and valid CRLF content lines', () => {
  const calendar = createWeddingCalendar();
  assert.ok(calendar.startsWith('BEGIN:VCALENDAR\r\nVERSION:2.0\r\n'));
  assert.ok(calendar.endsWith('END:VEVENT\r\nEND:VCALENDAR\r\n'));
  assert.ok(calendar.includes('SUMMARY:Свадьба Юрия и Александры\r\n'));
  assert.ok(calendar.includes('LOCATION:Москва\\, Грибоедовский ЗАГС\r\n'));
  for (const line of calendar.split('\r\n')) {
    assert.ok(Buffer.byteLength(line) <= 75, `Content line too long: ${line}`);
  }
});
