const express = require('express');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
const Customer = require('../models/Customer');
const router = express.Router();

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

// POST /api/auth/register - Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    const Model = userType === 'vendor' ? Vendor : Customer;
    const user = await Model.findOne({ email }).select('+password');
    
    if (user) return res.status(401).json({ message: 'User already exists' });
    
    const newUser = await Model.create(req.body);
    const token = signToken(newUser._id);
    res.json({ token, user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    const Model = userType === 'vendor' ? Vendor : Customer;
    const user = await Model.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = signToken(user._id);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
