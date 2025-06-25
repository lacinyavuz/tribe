const { truncateEvents } = require('../db');

if (require.main === module) {
  truncateEvents();
  console.log('Truncated events and features tables');
}

module.exports = { truncateEvents };
