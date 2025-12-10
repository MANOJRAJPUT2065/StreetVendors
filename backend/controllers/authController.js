const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
const Customer = require('../models/Customer');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { userType = 'vendor', ...payload } = req.body;
    const Model = userType === 'customer' ? Customer : Vendor;

    const user = await Model.create(payload);
    const token = signToken(user._id);

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password, userType = 'vendor' } = req.body;
    const Model = userType === 'customer' ? Customer : Vendor;

    const user = await Model.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user._id);
    // remove password before sending back
    user.password = undefined;

    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /api/auth/me
const me = async (req, res) => {
  res.json(req.user);
};

module.exports = { register, login, me };
