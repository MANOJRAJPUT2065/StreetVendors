const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
