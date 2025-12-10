import React, { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import ChartComponent from '../components/ChartComponent';

const Insights = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/expenses');
        setExpenses(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load insights');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totals = useMemo(() => {
    const sum = expenses.reduce((acc, e) => acc + Number(e.amount || 0), 0);
    const byCategory = expenses.reduce((acc, e) => {
      const key = e.category || 'Other';
      acc[key] = (acc[key] || 0) + Number(e.amount || 0);
      return acc;
    }, {});
    return { sum, byCategory };
  }, [expenses]);

  if (loading) return <div className="page-shell text-slate-200">Loading...</div>;

  return (
    <div className="page-shell text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Analytics</p>
          <h2 className="text-3xl font-semibold text-white">Insights</h2>
          <p className="text-sm text-slate-400">Totals, counts, and category split for your spend.</p>
        </div>
      </div>
      {error && (
        <div className="mt-4 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
          {error}
        </div>
      )}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-900/40 backdrop-blur">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Total Spend</h4>
          <p className="mt-2 text-3xl font-bold text-emerald-300">₹{totals.sum.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-900/40 backdrop-blur">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Total Entries</h4>
          <p className="mt-2 text-3xl font-bold text-white">{expenses.length}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-900/40 backdrop-blur">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">By Category</h4>
          <div className="mt-3 space-y-2">
            {Object.entries(totals.byCategory).map(([cat, val]) => (
              <div key={cat} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-slate-200">
                <span>{cat}</span>
                <strong>₹{val.toFixed(2)}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-slate-900/40 backdrop-blur">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Category Split</h4>
          <div className="mt-4">
            <ChartComponent
              data={Object.entries(totals.byCategory).map(([label, value]) => ({
                label,
                value
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
