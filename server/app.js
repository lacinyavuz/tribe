const express = require('express');
const cors = require('cors');
const path = require('path');
const eventsRoutes = require('./routes/events');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', eventsRoutes);

app.use(express.static(path.join(__dirname, '../client', 'dist')));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

module.exports = app;
