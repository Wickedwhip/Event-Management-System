const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/eventController');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.get('/', getEvents);
router.post('/', protect, authorize('admin'), createEvent);

module.exports = router;
