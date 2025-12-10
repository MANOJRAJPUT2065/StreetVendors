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

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-8 text-slate-200">Loading...</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 text-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">Overview</p>
          <h2 className="text-2xl font-semibold text-white">Your Expenses</h2>
        </div>
        <Link
          to="/expenses/new"
          className="rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white shadow-md shadow-sky-500/30 transition hover:bg-sky-600"
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
        <p className="mt-6 text-slate-300">No expenses yet. Start adding one!</p>
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
