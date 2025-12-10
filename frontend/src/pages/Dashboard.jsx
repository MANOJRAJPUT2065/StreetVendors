import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ExpenseCard from '../components/ExpenseCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchExpenses = async () => {
    try {
      const res = await api.get('/expenses');
      setExpenses(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete expense');
    }
  };

  if (loading) return <div className="page-shell text-slate-200">Loading...</div>;

  return (
    <div className="page-shell text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Overview</p>
          <h2 className="text-3xl font-semibold text-white">Your Expenses</h2>
          <p className="text-sm text-slate-400">Track spending, methods, and categories in one view.</p>
        </div>
        <Link
          to="/expenses/new"
          className="rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md shadow-sky-500/30 transition hover:opacity-90"
        >
          Add Expense
        </Link>
      </div>
      {error && (
        <div className="mt-4 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
          {error}
        </div>
      )}
      {expenses.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-slate-300">
          <p className="text-lg font-semibold text-white">No expenses yet</p>
          <p className="mt-1 text-slate-400">Add your first expense to see insights here.</p>
          <Link
            to="/expenses/new"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-500/30 transition hover:bg-sky-600"
          >
            Add Expense
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {expenses.map((expense) => (
            <ExpenseCard key={expense._id} expense={expense} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
