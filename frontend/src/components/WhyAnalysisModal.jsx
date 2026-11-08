import React from 'react';
import { X, HelpCircle, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export const WhyAnalysisModal = ({ isOpen, onClose, stressData }) => {
  if (!isOpen) return null;

  const {
    stress_level = 'Low',
    confidence = 0.0,
    contributing_factors = ['No active indicators detected.']
  } = stressData || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900/95 p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5 text-cyan-400">
            <HelpCircle className="w-5 h-5" />
            <h3 className="text-base font-bold text-white tracking-wide font-['Outfit']">
              Why This Recommendation?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Level & Confidence Summary */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">FUSED STRESS LEVEL</span>
            <span className="text-lg font-bold text-white font-['Outfit']">{stress_level}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">MODEL CONFIDENCE</span>
            <span className="text-lg font-bold font-mono text-cyan-300">{confidence.toFixed(1)}%</span>
          </div>
        </div>

        {/* Traceable Reasoning List */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-400 block uppercase">
            CONTRIBUTING PHYSIOLOGICAL FACTORS
          </span>
          <div className="space-y-2">
            {contributing_factors.map((factor, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/90 border border-slate-800/80 flex items-start space-x-2.5 text-xs text-slate-300 leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Explainability Footer */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center space-x-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>XAI Engine (Blueprint 6 + 7)</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyAnalysisModal;
