const { insertEvent } = require('../db');

const FEATURES = ['Tracking', 'Management', 'Security'];
const USERS = ['Kody Garza', 'Max Wilkins', 'Chandler Perry'];
const ACCOUNTS = ['Samsung', 'Apple', 'Google'];
const LOCATIONS = ['US', 'UK', 'EU'];

function weightedRandom(items, weights) {
  const rand = Math.random();
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += weights[i];
    if (rand < sum) return items[i];
  }
  return items[items.length - 1];
}

function formatDate(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

function addRandomEvents(count = 6000) {
  const now = Date.now();
  const segments = [
    { hours: [0, 6], weight: 0.5, feature: [0.6, 0.3, 0.1], user: [0.5, 0.3, 0.2], account: [0.5, 0.3, 0.2], location: [0.6, 0.2, 0.2] },
    { hours: [6, 12], weight: 0.3, feature: [0.3, 0.5, 0.2], user: [0.3, 0.5, 0.2], account: [0.3, 0.5, 0.2], location: [0.3, 0.4, 0.3] },
    { hours: [12, 18], weight: 0.15, feature: [0.2, 0.3, 0.5], user: [0.2, 0.3, 0.5], account: [0.2, 0.3, 0.5], location: [0.2, 0.3, 0.5] },
    { hours: [18, 24], weight: 0.05, feature: [0.4, 0.3, 0.3], user: [0.4, 0.4, 0.2], account: [0.4, 0.4, 0.2], location: [0.4, 0.3, 0.3] }
  ];

  segments.forEach(seg => {
    const segCount = Math.round(seg.weight * count);
    const start = now - seg.hours[1] * 60 * 60 * 1000;
    const end = now - seg.hours[0] * 60 * 60 * 1000;
    for (let i = 0; i < segCount; i++) {
      const timestamp = new Date(start + Math.random() * (end - start));
      const feature = weightedRandom(FEATURES, seg.feature);
      const user = weightedRandom(USERS, seg.user);
      const account = weightedRandom(ACCOUNTS, seg.account);
      const location = weightedRandom(LOCATIONS, seg.location);
      insertEvent(feature, user, account, location, formatDate(timestamp));
    }
  });
}

if (require.main === module) {
  addRandomEvents();
  console.log('Seeded database with random events');
}

module.exports = { addRandomEvents };
