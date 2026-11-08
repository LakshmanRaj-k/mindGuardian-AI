import React from 'react';
import { Activity, Gauge, Sparkles, AlertCircle } from 'lucide-react';

export const StressGaugePlaceholder = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-slate-900/90 flex flex-col h-full justify-between shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-slate-800 text-indigo-400 border border-slate-700">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Stress Index Engine</h3>
            <p className="text-xs text-slate-400">Physiological Biomarker Fusion</p>
          </div>
        </div>

        {/* Blueprint Badge */}
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-950/80 text-indigo-400 text-xs font-semibold border border-indigo-800/80">
          <Sparkles className="w-3 h-3" />
          <span>Active in Blueprint 4.0</span>
        </span>
      </div>

      {/* Radial Gauge Visual Container */}
      <div className="relative p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
        {/* Semi-Circular SVG Dial Outline */}
        <div className="relative w-44 h-24 mb-2 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 50">
            {/* Background Arc */}
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#1e293b"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Neutral Indicator Arc Segment */}
            <path
              d="M 10 50 A 40 40 0 0 1 35 22"
              fill="none"
              stroke="#334155"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>

          {/* Center Indicator Needle / Neutral Text */}
          <div className="absolute bottom-0 text-center">
            <span className="text-xl font-bold text-slate-500 font-mono">--</span>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Index Pending</p>
          </div>
        </div>

        <h4 className="text-sm font-semibold text-slate-300">Biometric Scoring Offline</h4>
        <p className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed">
          Multi-modal HRV, facial tension, and voice strain fusion scoring activates in <strong className="text-indigo-400">Blueprint 4.0</strong>.
        </p>
      </div>

      {/* Biomarker Sub-metrics Readiness Grid */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
          <span className="block text-[10px] text-slate-400">Heart Rate Var.</span>
          <span className="text-xs font-semibold text-slate-400">Waiting...</span>
        </div>

        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
          <span className="block text-[10px] text-slate-400">Facial Action</span>
          <span className="text-xs font-semibold text-slate-400">Waiting...</span>
        </div>

        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
          <span className="block text-[10px] text-slate-400">Vocal Acoustic</span>
          <span className="text-xs font-semibold text-slate-400">Waiting...</span>
        </div>
      </div>
    </div>
  );
};

export default StressGaugePlaceholder;
