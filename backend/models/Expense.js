const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      default: 'General'
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: String,
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'upi', 'other'],
      default: 'cash'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
