const db = require('../db');

function logEvent(req, res) {
  const { feature, user, account, location } = req.body;
  if (!feature) return res.status(400).json({ error: 'feature required' });
  db.insertEvent(feature, user, account, location);
  res.json({ status: 'ok' });
}

function usage(req, res) {
  const { start, end, feature, location } = req.query;
  const startDate = start ? new Date(start) : new Date(Date.now() - 24*60*60*1000);
  const endDate = end ? new Date(end) : new Date();
  const params = {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
    feature: feature ? feature : '%',
    location: location ? `%${location}%` : '%'
  };
  const rows = db.getUsage(params);
  res.json(rows);
}

function listEvents(req, res) {
  const { start, end, feature, location } = req.query;
  const startDate = start ? new Date(start) : new Date(Date.now() - 24*60*60*1000);
  const endDate = end ? new Date(end) : new Date();
  const params = {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
    feature: feature ? feature : '%',
    location: location ? `%${location}%` : '%'
  };
  const rows = db.getEvents(params);
  res.json(rows);
}

function trend(req, res) {
  const { feature, start, end } = req.query;
  if (!feature) return res.status(400).json({ error: 'feature required' });
  const startDate = start ? new Date(start) : new Date(Date.now() - 24*60*60*1000);
  const endDate = end ? new Date(end) : new Date();
  const rows = db.getTrend({ feature, start: startDate.toISOString(), end: endDate.toISOString() });
  res.json(rows);
}

module.exports = { logEvent, usage, trend, listEvents };
