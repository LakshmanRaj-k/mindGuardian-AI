import React from 'react';
import { Lightbulb, Sparkles, Sliders, ShieldAlert, ArrowRight } from 'lucide-react';

export const RecommendationPlaceholder = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-slate-900/90 flex flex-col h-full justify-between shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Adaptive Coping Engine</h3>
            <p className="text-xs text-slate-400">Personalized Intervention Protocols</p>
          </div>
        </div>

        {/* Blueprint Badge */}
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-semibold border border-emerald-800/80">
          <Sparkles className="w-3 h-3" />
          <span>Active in Blueprint 5.0</span>
        </span>
      </div>

      {/* Structured Recommendation Content Container */}
      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Intervention Matrix Status</span>
          </div>
          <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded text-slate-400">
            Ruleset V5
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-300">Protocol 1: Respiratory Biofeedback</span>
              <p className="text-slate-400 text-[11px]">4-7-8 Paced diaphragmatic breathing loop trigger</p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Standby
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-300">Protocol 2: Cognitive Environment Reset</span>
              <p className="text-slate-400 text-[11px]">Ambient luminance adjustments & auditory grounding</p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Standby
            </span>
          </div>
        </div>

        <div className="pt-2 text-center">
          <p className="text-xs text-slate-400">
            Real-time personalized coping recommendations activate in <strong className="text-emerald-400">Blueprint 5.0</strong> upon stress threshold detection.
          </p>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Trigger Threshold: <strong className="text-slate-300 font-mono">Dynamic AI Rule</strong></span>
        <span className="flex items-center space-x-1 text-emerald-400">
          <span>Blueprint 5.0 Target</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};

export default RecommendationPlaceholder;
