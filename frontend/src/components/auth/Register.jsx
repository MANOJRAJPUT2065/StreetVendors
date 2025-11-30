import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', userType: 'vendor', phone: '', businessName: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register for StreetVendors</h2>
        {error && <div className="error-message">{error}</div>}
        <input type="text" placeholder="Name" value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email" value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <input type="tel" placeholder="Phone" value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
        <select value={formData.userType} onChange={(e) => setFormData({...formData, userType: e.target.value})}>
          <option value="vendor">Vendor</option>
          <option value="customer">Customer</option>
        </select>
        {formData.userType === 'vendor' && (
          <input type="text" placeholder="Business Name" value={formData.businessName}
            onChange={(e) => setFormData({...formData, businessName: e.target.value})} required />
        )}
        <button type="submit" className="btn-primary">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
