import React from 'react';

/**
 * Radial / Linear Stress Gauge Visualization (Light Theme)
 */
export const StressGauge = ({ score = 0, level = 'Low', confidence = 0 }) => {
  const pct = Math.min(Math.max(score, 0), 100);

  const getGradient = (lvl) => {
    if (lvl === 'Low') return 'from-emerald-500 to-emerald-600';
    if (lvl === 'Moderate') return 'from-amber-500 to-amber-600';
    if (lvl === 'High') return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 font-mono tracking-wider">MULTIMODAL STRESS INDEX</span>
        <span className="font-mono text-blue-600 font-semibold">{confidence.toFixed(1)}% confidence</span>
      </div>

      <div className="h-3.5 w-full bg-slate-200/80 rounded-full overflow-hidden border border-slate-300/40 p-0.5">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getGradient(level)} transition-all duration-500 shadow-sm`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] font-mono text-slate-500">
        <span>0 (Low)</span>
        <span>25</span>
        <span>50 (Moderate)</span>
        <span>75</span>
        <span>100 (Critical)</span>
      </div>
    </div>
  );
};

export default StressGauge;
