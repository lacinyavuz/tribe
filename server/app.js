const express = require('express');
const cors = require('cors');
const path = require('path');
const eventsRoutes = require('./routes/events');
const { insertEvent } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', eventsRoutes);

function insertRandomEvent() {
  const feature = ['Tracking', 'Management', 'Security'][Math.floor(Math.random() * 3)];
  const user = ['Kody Garza', 'Max Wilkins', 'Chandler Perry'][Math.floor(Math.random() * 3)];
  const account = ['Samsung', 'Apple', 'Google'][Math.floor(Math.random() * 3)];
  const location = ['US', 'UK', 'EU'][Math.floor(Math.random() * 3)];
  insertEvent(feature, user, account, location);
}

if (process.env.NODE_ENV !== 'production') {
  // setInterval(insertRandomEvent, 1000);
}

app.use(express.static(path.join(__dirname, '../client', 'dist')));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

module.exports = app;
