const express = require('express');
const Review = require('../models/Review');
const { protect } = require('../middleware/auth');
const router = express.Router();

// POST /api/reviews - Create review (protected)
router.post('/', protect, async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/reviews - Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('customer vendor product');
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
