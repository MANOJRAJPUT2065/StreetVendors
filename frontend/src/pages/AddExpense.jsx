import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'General',
    date: '',
    notes: '',
    paymentMethod: 'cash'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/expenses', form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create expense');
    }
  };

  return (
    <div className="page-shell text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">New Entry</p>
          <h2 className="text-3xl font-semibold text-white">Add Expense</h2>
          <p className="text-sm text-slate-400">Capture spend with category, method, and notes.</p>
        </div>
      </div>
      {error && (
        <div className="mt-4 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
          {error}
        </div>
      )}
      <form
        className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/40 backdrop-blur md:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <input
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 md:col-span-2"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
        <select
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
          <option value="other">Other</option>
        </select>
        <textarea
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 md:col-span-2"
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-sky-500 px-5 py-2 font-semibold text-white shadow-md shadow-sky-500/30 transition hover:bg-sky-600"
          >
            Save Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
