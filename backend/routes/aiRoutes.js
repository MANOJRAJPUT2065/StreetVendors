const express = require('express');
const { getSuggestions } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protected so we still attach a user (with relaxed auth fallback).
router.post('/suggest', protect, getSuggestions);

module.exports = router;

