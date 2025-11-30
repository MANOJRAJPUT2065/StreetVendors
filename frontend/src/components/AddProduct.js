import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AddProduct = () => {
  const [formData, setFormData] = useState({ name: '', price: '', description: '', category: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product Name" value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="number" placeholder="Price" value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})} required />
        <textarea placeholder="Description" value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})} required />
        <input type="text" placeholder="Category" value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
