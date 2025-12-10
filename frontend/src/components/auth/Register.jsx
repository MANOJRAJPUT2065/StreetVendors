import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'vendor',
    phone: '',
    businessName: ''
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
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <form
        className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/40 backdrop-blur"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-xl font-semibold text-white">Register for StreetVendors</h2>
          <p className="text-sm text-slate-300">Create an account to start tracking.</p>
        </div>
        {error && (
          <div className="rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </div>
        )}
        <input
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <input
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <select
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          value={formData.userType}
          onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
        >
          <option value="vendor">Vendor</option>
          <option value="customer">Customer</option>
        </select>
        {formData.userType === 'vendor' && (
          <input
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            type="text"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            required
          />
        )}
        <button
          type="submit"
          className="w-full rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white shadow-md shadow-sky-500/30 transition hover:bg-sky-600"
        >
          Register
        </button>
        <p className="text-sm text-slate-300">
          Already have an account?{' '}
          <Link className="font-semibold text-sky-400 hover:text-sky-300" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
