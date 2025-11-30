const express = require('express');
const Subscription = require('../models/Subscription');
const { protect } = require('../middleware/auth');
const router = express.Router();

// POST /api/subscriptions - Create subscription (protected)
router.post('/', protect, async (req, res) => {
  try {
    const subscription = await Subscription.create(req.body);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/subscriptions - Get all subscriptions (protected)
router.get('/', protect, async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate('customer vendor product');
    res.json(subscriptions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/subscriptions/:id - Cancel subscription (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Subscription.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Subscription cancelled' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
