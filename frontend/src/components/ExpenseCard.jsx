import React from 'react';

const ExpenseCard = ({ expense, onDelete, onEdit }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-lg shadow-slate-900/40">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-lg font-semibold text-white">{expense.title}</h4>
          <p className="text-xs uppercase tracking-wide text-slate-400">{expense.category}</p>
          {expense.notes && <p className="text-sm text-slate-300">{expense.notes}</p>}
        </div>
        <div className="text-right text-xl font-bold text-emerald-300">₹{expense.amount}</div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{new Date(expense.date).toLocaleDateString()}</span>
        <span className="rounded-full bg-white/5 px-3 py-1 text-slate-200">
          {expense.paymentMethod}
        </span>
      </div>
      <div className="mt-4 flex gap-2">
        {onEdit && (
          <button
            className="rounded-lg bg-white/5 px-3 py-1 text-sm text-slate-100 hover:bg-white/10"
            onClick={() => onEdit(expense)}
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            className="rounded-lg bg-rose-500/20 px-3 py-1 text-sm font-semibold text-rose-200 hover:bg-rose-500/30"
            onClick={() => onDelete(expense._id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpenseCard;
