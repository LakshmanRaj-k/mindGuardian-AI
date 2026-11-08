import React from 'react';
import { Lock, ShieldCheck, FileText, Check } from 'lucide-react';

export const PrivacyCard = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-slate-900/90 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Privacy & Ethical Standards</h3>
            <p className="text-xs text-slate-400">On-Device Edge Intelligence Guarantee</p>
          </div>
        </div>

        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-semibold border border-emerald-800/80">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Local Inference</span>
        </span>
      </div>

      {/* Bulleted Privacy Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start space-x-2.5 text-xs text-slate-300">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block font-semibold mb-0.5">No Cloud Uploads</strong>
            <span>Optical frames and acoustic audio chunks are processed entirely in local RAM.</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start space-x-2.5 text-xs text-slate-300">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block font-semibold mb-0.5">Zero Data Storage</strong>
            <span>No recordings, video frames, or personal identifiers are written to disk or database.</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start space-x-2.5 text-xs text-slate-300">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block font-semibold mb-0.5">Transparent AI</strong>
            <span>All stress calculations use rule-based explainable weights with full indicator visibility.</span>
          </div>
        </div>
      </div>

      {/* Scientific & Medical Disclaimer */}
      <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90 flex items-start space-x-2.5 text-xs text-slate-400 leading-relaxed">
        <FileText className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-300">Scientific Disclaimer:</strong> This application estimates physiological stress indicators for wellness support purposes only. It is not intended to diagnose medical or mental health conditions or replace professional medical care.
        </p>
      </div>
    </div>
  );
};

export default PrivacyCard;
