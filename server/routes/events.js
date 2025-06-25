const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/events');

router.post('/events', ctrl.logEvent);
router.get('/usage', ctrl.usage);
router.get('/trend', ctrl.trend);
router.get('/events', ctrl.listEvents);

module.exports = router;
