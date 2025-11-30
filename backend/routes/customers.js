const express = require('express');
const Customer = require('../models/Customer');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/customers/:id - Get customer profile (protected)
router.get('/:id', protect, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (error) {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// PUT /api/customers/:id - Update customer profile (protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
