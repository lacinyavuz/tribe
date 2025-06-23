const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database('data.db');

// create tables
const init = `
CREATE TABLE IF NOT EXISTS features (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  feature_id INTEGER NOT NULL,
  user TEXT,
  account TEXT,
  location TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(feature_id) REFERENCES features(id)
);
`;

db.exec(init);

const app = express();
app.use(cors());
app.use(express.json());

// helper to ensure feature exists
const getFeatureId = db.prepare('SELECT id FROM features WHERE name = ?');
const insertFeature = db.prepare('INSERT INTO features(name) VALUES (?)');
function ensureFeature(name) {
  let row = getFeatureId.get(name);
  if (!row) {
    const info = insertFeature.run(name);
    row = { id: info.lastInsertRowid };
  }
  return row.id;
}

// log feature usage event
app.post('/api/events', (req, res) => {
  const { feature, user, account, location } = req.body;
  if (!feature) return res.status(400).json({ error: 'feature required' });
  const featureId = ensureFeature(feature);
  const insertEvent = db.prepare('INSERT INTO events(feature_id, user, account, location) VALUES (?,?,?,?)');
  insertEvent.run(featureId, user, account, location);
  res.json({ status: 'ok' });
});

// aggregated usage data
app.get('/api/usage', (req, res) => {
  const { start, end, location } = req.query;
  const startDate = start ? new Date(start) : new Date(Date.now() - 24*60*60*1000);
  const endDate = end ? new Date(end) : new Date();
  const locFilter = location ? `%${location}%` : '%';
  const stmt = db.prepare(`
    SELECT f.name as feature, COUNT(e.id) as count
    FROM events e JOIN features f ON f.id = e.feature_id
    WHERE e.timestamp BETWEEN ? AND ? AND e.location LIKE ?
    GROUP BY f.name
    ORDER BY count DESC
  `);
  const rows = stmt.all(startDate.toISOString(), endDate.toISOString(), locFilter);
  res.json(rows);
});

// trend data per feature
app.get('/api/trend', (req, res) => {
  const { feature, start, end } = req.query;
  if (!feature) return res.status(400).json({ error: 'feature required' });
  const startDate = start ? new Date(start) : new Date(Date.now() - 24*60*60*1000);
  const endDate = end ? new Date(end) : new Date();
  const stmt = db.prepare(`
    SELECT strftime('%Y-%m-%d %H:00', e.timestamp) as hour, COUNT(e.id) as count
    FROM events e JOIN features f ON f.id = e.feature_id
    WHERE f.name = ? AND e.timestamp BETWEEN ? AND ?
    GROUP BY hour
    ORDER BY hour
  `);
  const rows = stmt.all(feature, startDate.toISOString(), endDate.toISOString());
  res.json(rows);
});

// serve production build of frontend
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
