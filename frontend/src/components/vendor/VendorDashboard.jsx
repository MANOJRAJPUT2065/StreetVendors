import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AddProduct from '../AddProduct';
import API from '../../services/api';
import './VendorDashboard.css';

const VendorDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendorData();
  }, []);

  const fetchVendorData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        API.get(`/products/vendor/${user._id}`),
        API.get('/orders/vendor')
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vendor data:', error);
      setLoading(false);
    }
  };

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status: newStatus });
      fetchVendorData();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleProductDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/products/${productId}`);
        fetchVendorData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="vendor-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.businessName || user?.name}</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowAddProduct(!showAddProduct)}
        >
          {showAddProduct ? 'Close' : 'Add New Product'}
        </button>
      </div>

      {showAddProduct && (
        <div className="add-product-section">
          <AddProduct onSuccess={() => {
            setShowAddProduct(false);
            fetchVendorData();
          }} />
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{products.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p className="stat-number">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{orders.length}</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Your Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              {product.images && product.images[0] && (
                <img src={product.images[0]} alt={product.name} />
              )}
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p className="category">{product.category}</p>
              <p className={`availability ${product.isAvailable ? 'available' : 'unavailable'}`}>
                {product.isAvailable ? 'Available' : 'Out of Stock'}
              </p>
              <div className="product-actions">
                <button className="btn-edit">Edit</button>
                <button 
                  className="btn-delete"
                  onClick={() => handleProductDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Orders</h2>
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span className="order-id">Order #{order._id.slice(-6)}</span>
                <span className={`order-status ${order.status}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-details">
                <p><strong>Customer:</strong> {order.customer?.name}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p><strong>Delivery:</strong> {order.deliveryAddress?.street}</p>
              </div>
              <div className="order-actions">
                {order.status === 'pending' && (
                  <button 
                    className="btn-accept"
                    onClick={() => handleOrderStatusUpdate(order._id, 'confirmed')}
                  >
                    Accept
                  </button>
                )}
                {order.status === 'confirmed' && (
                  <button 
                    className="btn-ready"
                    onClick={() => handleOrderStatusUpdate(order._id, 'ready')}
                  >
                    Mark Ready
                  </button>
                )}
                {order.status === 'ready' && (
                  <button 
                    className="btn-complete"
                    onClick={() => handleOrderStatusUpdate(order._id, 'completed')}
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
