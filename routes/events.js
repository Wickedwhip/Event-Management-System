// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, async (req, res) => {
  const { title, description, date } = req.body;
  const event = await Event.create({ title, description, date, createdBy: req.user });
  res.status(201).json(event);
});

router.get('/', async (req, res) => {
  const events = await Event.find({ date: { $gte: new Date() } }).populate('createdBy', 'name');
  res.json(events);
});

router.put('/:id', protect, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event.createdBy.toString() !== req.user) return res.status(403).json({ msg: 'Unauthorized' });
  Object.assign(event, req.body);
  await event.save();
  res.json(event);
});

router.delete('/:id', protect, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event.createdBy.toString() !== req.user) return res.status(403).json({ msg: 'Unauthorized' });
  await event.remove();
  res.json({ msg: 'Event deleted' });
});

module.exports = router;
