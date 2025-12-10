const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
const Customer = require('../models/Customer');

/**
 * Temporary relaxed auth: tries JWT, otherwise falls back to the first vendor
 * (so the app can be demoed without login). Remove fallback when re-enabling
 * real auth.
 */
const protect = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = (await Vendor.findById(decoded.id)) || (await Customer.findById(decoded.id));
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      req.user = user;
      req.userType = user.constructor.modelName.toLowerCase();
      return next();
    }

    // Fallback: pick first vendor to bypass auth for now
    const fallbackVendor = await Vendor.findOne();
    if (!fallbackVendor) {
      return res.status(401).json({ message: 'No user available and no token provided' });
    }
    req.user = fallbackVendor;
    req.userType = 'vendor';
    return next();
  } catch (err) {
    // As a last resort, attempt fallback vendor to keep demo usable
    const fallbackVendor = await Vendor.findOne();
    if (fallbackVendor) {
      req.user = fallbackVendor;
      req.userType = 'vendor';
      return next();
    }
    return res.status(401).json({ message: 'Not authorized', error: err.message });
  }
};

module.exports = { protect };

