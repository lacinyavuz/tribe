const Database = require('better-sqlite3');
const path = require('path');

const dbFile = process.env.DB_PATH || path.join(__dirname, '../data.db');
const db = new Database(dbFile);

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
);`;

function initDb() {
  db.exec(init);
}

function truncateEvents() {
  db.exec('DELETE FROM events; DELETE FROM features;');
}

initDb();

const getFeatureId = db.prepare('SELECT id FROM features WHERE name = ?');
const insertFeature = db.prepare('INSERT INTO features(name) VALUES (?)');
const insertEventStmt = db.prepare('INSERT INTO events(feature_id, user, account, location) VALUES (?,?,?,?)');
const insertEventWithTsStmt = db.prepare('INSERT INTO events(feature_id, user, account, location, timestamp) VALUES (?,?,?,?,?)');

function ensureFeature(name) {
  let row = getFeatureId.get(name);
  if (!row) {
    const info = insertFeature.run(name);
    row = { id: info.lastInsertRowid };
  }
  return row.id;
}

function insertEvent(feature, user, account, location, timestamp) {
  const featureId = ensureFeature(feature);
  if (timestamp) {
    insertEventWithTsStmt.run(featureId, user, account, location, timestamp);
  } else {
    insertEventStmt.run(featureId, user, account, location);
  }
}

function getUsage({ start, end, feature = '%', location = '%' }) {
  const stmt = db.prepare(`
    SELECT f.name as feature, COUNT(e.id) as count
    FROM events e JOIN features f ON f.id = e.feature_id
    WHERE e.timestamp BETWEEN ? AND ?
      AND f.name LIKE ? AND e.location LIKE ?
    GROUP BY f.name
    ORDER BY count DESC
  `);
  return stmt.all(start, end, feature, location);
}

function getEvents({ start, end, feature = '%', location = '%' }) {
  const stmt = db.prepare(`
    SELECT e.id, f.name as feature, user, account, location, timestamp
    FROM events e JOIN features f ON f.id = e.feature_id
    WHERE e.timestamp BETWEEN ? AND ?
      AND f.name LIKE ? AND e.location LIKE ?
    ORDER BY e.timestamp DESC
  `);
  return stmt.all(start, end, feature, location);
}

function getTrend({ feature, start, end }) {
  const stmt = db.prepare(`
    SELECT strftime('%Y-%m-%d %H:00', e.timestamp) as hour, COUNT(e.id) as count
    FROM events e JOIN features f ON f.id = e.feature_id
    WHERE f.name = ? AND e.timestamp BETWEEN ? AND ?
    GROUP BY hour
    ORDER BY hour
  `);
  return stmt.all(feature, start, end);
}

module.exports = {
  initDb,
  truncateEvents,
  insertEvent,
  getUsage,
  getEvents,
  getTrend
};
