import React from 'react';

/**
 * Lightweight horizontal bar chart for expense breakdown.
 * Avoids extra chart dependencies by using simple divs.
 */
const ChartComponent = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-slate-300">No data to display.</p>;

  const maxValue = Math.max(...data.map((item) => item.value), 0) || 1;

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="w-28 text-sm text-slate-200">{item.label}</span>
          <div className="h-2 flex-1 rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-300"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
          <span className="w-20 text-right text-sm font-semibold text-white">
            ₹{item.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChartComponent;
