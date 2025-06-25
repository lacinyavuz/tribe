const app = require('./app');
const PORT = process.env.PORT || 3000;
const { insertRandomEvent } = require('./db');

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  if (process.env.NODE_ENV !== 'production' && require.main === module) {
    setInterval(insertRandomEvent, 1000);
  }
}
