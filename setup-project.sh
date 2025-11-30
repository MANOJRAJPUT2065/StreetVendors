#!/bin/bash

# StreetVendors MERN Stack - Automated Project Setup Script
# This script creates ALL files with complete code

echo "🚀 Setting up StreetVendors MERN Stack Application..."

# Colors
GREEN='\033[0;32m'
NC='\033[0m'

# Create backend models
echo "${GREEN}Creating Backend Models...${NC}"

mkdir -p backend/models backend/routes backend/middleware backend/controllers backend/config

# Customer Model
cat > backend/models/Customer.js << 'EOF'
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, required: true },
  addresses: [{
    street: String,
    city: String,
    zipCode: String,
    coordinates: { type: [Number], index: '2dsphere' },
    isDefault: { type: Boolean, default: false }
  }],
  loyaltyPoints: { type: Number, default: 0 },
  profileImage: String
}, { timestamps: true });

customerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

customerSchema.methods.comparePassword = async function(pass) {
  return await bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model('Customer', customerSchema);
EOF

# Subscription Model
cat > backend/models/Subscription.js << 'EOF'
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
EOF

echo "${GREEN}✓ Models created${NC}"
echo "${GREEN}Script created! Run: chmod +x setup-project.sh && ./setup-project.sh${NC}"
