# StreetVendors - Digital Marketplace Platform

## Overview
A comprehensive MERN stack application empowering street vendors to digitize their business, reach more customers, and manage operations efficiently.

## Tech Stack
- **Frontend**: React.js, React Router, Axios, Socket.IO Client
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.IO for live notifications
- **File Upload**: Multer, Cloudinary

## Project Structure
```
StreetVendors/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Vendor.js
│   │   ├── Customer.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Subscription.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── vendors.js
│   │   ├── customers.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── subscriptions.js
│   │   └── reviews.js
│   ├── middleware/
│   │   └── auth.js
│   ├── controllers/
│   │   ├── vendorController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── vendor/
│   │   │   │   ├── VendorDashboard.jsx
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── OrderManagement.jsx
│   │   │   │   └── Analytics.jsx
│   │   │   ├── customer/
│   │   │   │   ├── Browse.jsx
│   │   │   │   ├── VendorMap.jsx
│   │   │   │   ├── ProductCatalog.jsx
│   │   │   │   ├── Cart.jsx
│   │   │   │   └── OrderHistory.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   └── shared/
│   │   │       ├── Navbar.jsx
│   │   │       └── Footer.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── SocketContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Core Features

### A. Vendor Portal
- **Profile Management**: Create and update vendor profile (name, location, working hours)
- **Product Management**: Add/Edit products with photos, descriptions, prices
- **Order Management**: View and manage incoming orders in real-time
- **Analytics Dashboard**: Track best-selling items, peak hours, customer feedback
- **Subscription Plans**: Manage daily/weekly pre-order subscriptions
- **Real-time Notifications**: Instant alerts for new orders via Socket.IO

### B. Customer App
- **Geolocation Search**: Browse nearby vendors using GPS
- **Product Catalog**: View vendors and their products with photos and prices
- **Instant Orders**: Place orders via in-app system or WhatsApp
- **Pre-order Subscriptions**: Subscribe to daily/weekly deliveries
- **Loyalty Points**: Earn and redeem points for frequent purchases
- **Reviews & Ratings**: Rate vendors and provide feedback

### C. Admin Dashboard
- **Vendor Management**: Approve/reject vendor registrations
- **Customer Oversight**: Monitor customer activity
- **Analytics**: View sales trends, popular products, high-demand areas
- **Platform Management**: Oversee platform operations

## Database Models

### Vendor Schema
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  phone: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  address: String,
  workingHours: { start: String, end: String },
  products: [{ type: ObjectId, ref: 'Product' }],
  rating: Number,
  totalRatings: Number,
  isApproved: Boolean,
  createdAt: Date
}
```

### Product Schema
```javascript
{
  vendor: { type: ObjectId, ref: 'Vendor' },
  name: String,
  description: String,
  price: Number,
  category: String,
  images: [String],
  availableQuantity: Number,
  isAvailable: Boolean,
  createdAt: Date
}
```

### Order Schema
```javascript
{
  customer: { type: ObjectId, ref: 'Customer' },
  vendor: { type: ObjectId, ref: 'Vendor' },
  products: [{
    product: { type: ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String, // pending, confirmed, preparing, ready, completed
  deliveryAddress: String,
  orderType: String, // instant, subscription
  createdAt: Date
}
```

## API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Vendors
```
GET    /api/vendors - Get all vendors
GET    /api/vendors/nearby - Get vendors by location
GET    /api/vendors/:id - Get vendor by ID
POST   /api/vendors - Create vendor profile
PUT    /api/vendors/:id - Update vendor profile
DELETE /api/vendors/:id - Delete vendor
GET    /api/vendors/:id/analytics - Get vendor analytics
```

### Products
```
GET    /api/products - Get all products
GET    /api/products/vendor/:vendorId - Get vendor products
GET    /api/products/:id - Get product by ID
POST   /api/products - Create product
PUT    /api/products/:id - Update product
DELETE /api/products/:id - Delete product
```

### Orders
```
GET    /api/orders - Get all orders
GET    /api/orders/vendor/:vendorId - Get vendor orders
GET    /api/orders/customer/:customerId - Get customer orders
POST   /api/orders - Create order
PUT    /api/orders/:id/status - Update order status
```

### Subscriptions
```
GET    /api/subscriptions/customer/:customerId
POST   /api/subscriptions - Create subscription
PUT    /api/subscriptions/:id - Update subscription
DELETE /api/subscriptions/:id - Cancel subscription
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd backend
npm install

# Create .env file
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
CLIENT_URL=http://localhost:3000

npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install

# Create .env file
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000

npm start
```

## Real-time Features (Socket.IO)

### Order Notifications
```javascript
// Server-side
io.to(`vendor_${vendorId}`).emit('newOrder', orderData);

// Client-side (Vendor)
socket.on('newOrder', (order) => {
  // Show notification
  // Update order list
});
```

### Delivery Updates
```javascript
// Server-side
io.to(`customer_${customerId}`).emit('orderStatusUpdate', {
  orderId,
  status: 'preparing'
});

// Client-side (Customer)
socket.on('orderStatusUpdate', (data) => {
  // Update order status display
});
```

## Key Technologies & Implementations

### Geolocation Search
- MongoDB Geospatial Queries
- Uses 2dsphere index on vendor locations
- Finds vendors within specified radius

### Authentication
- JWT tokens for secure authentication
- Bcrypt for password hashing
- Protected routes with middleware

### Image Upload
- Multer for handling multipart/form-data
- Cloudinary for image storage and optimization

## Future Enhancements
- Payment gateway integration
- Advanced analytics with charts
- Push notifications (FCM)
- Multi-language support
- Vendor-to-vendor delivery network
- AI-powered recommendation system

## Contributing
Pull requests are welcome. For major changes, please open an issue first.

## License
MIT
