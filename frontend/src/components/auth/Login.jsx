import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <form
        className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/40 backdrop-blur"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-xl font-semibold text-white">Login to StreetVendors</h2>
          <p className="text-sm text-slate-300">Welcome back! Sign in to continue.</p>
        </div>
        {error && (
          <div className="rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </div>
        )}
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
        <button
          type="submit"
          className="w-full rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white shadow-md shadow-sky-500/30 transition hover:bg-sky-600"
        >
          Login
        </button>
        <p className="text-sm text-slate-300">
          Don't have an account?{' '}
          <Link className="font-semibold text-sky-400 hover:text-sky-300" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
