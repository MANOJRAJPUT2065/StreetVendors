const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Beverages', 'Snacks', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Other']
  },
  images: [{
    type: String
  }],
  availableQuantity: {
    type: Number,
    default: 0,
    min: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  unit: {
    type: String,
    default: 'piece'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  soldCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for reviews
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id'
});

module.exports = mongoose.model('Product', productSchema);
