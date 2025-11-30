const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');
const router = express.Router();

// POST /api/orders - Create order (protected)
router.post('/', protect, async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/orders - Get all orders (protected)
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find().populate('customer vendor items.product');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/orders/:id/status - Update order status (protected)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
