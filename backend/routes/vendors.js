const express = require('express');
const Vendor = require('../models/Vendor');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/vendors/nearby - Find vendors near location
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, maxDistance = 5000 } = req.query;
    const vendors = await Vendor.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance)
        }
      },
      isActive: true
    }).populate('products');
    res.json(vendors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/vendors/:id - Get vendor by ID
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate('products');
    res.json(vendor);
  } catch (error) {
    res.status(404).json({ message: 'Vendor not found' });
  }
});

// PUT /api/vendors/:id - Update vendor profile (protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/vendors/:id - Delete vendor (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
