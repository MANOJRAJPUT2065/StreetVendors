const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.io setup
const clientOrigin = process.env.CLIENT_URL || 'http://localhost:3000';
const io = new Server(server, {
  cors: {
    origin: clientOrigin,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id);
  });
});

// Make io available to routes/controllers
app.set('io', io);

// Connect to Mongo
connectDB();

// Middleware
app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vendors', require('./routes/vendors'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

app.get('/', (_req, res) => {
  res.json({ message: 'StreetVendors API is running' });
});

// Global error handler fallback
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server Error',
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
