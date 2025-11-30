const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  quantity: { type: Number, required: true, min: 1 },
  startDate: { type: Date, required: true },
  endDate: Date,
  isActive: { type: Boolean, default: true },
  deliveryTime: String,
  nextDelivery: Date
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
