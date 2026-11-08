import React from 'react';
import { Sparkles, Shield, Radio } from 'lucide-react';

/**
 * Compact Hero Section for Light White-Grey Theme
 */
export const HeroBanner = () => {
  return (
    <div className="py-2 text-center sm:text-left space-y-1">
      {/* Line 1: Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
        MindGuardian AI
      </h1>

      {/* Line 2: Subtitle */}
      <p className="text-sm sm:text-base font-semibold text-slate-600">
        Real-Time Stress Detection
      </p>

      {/* Line 3: Badge Line */}
      <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-semibold">
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-50/90 text-blue-700 border border-blue-200/90 shadow-sm">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span>On-Device AI</span>
        </span>
        <span className="text-slate-400">•</span>
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50/90 text-emerald-700 border border-emerald-200/90 shadow-sm">
          <Shield className="w-3 h-3 text-emerald-600" />
          <span>Private</span>
        </span>
        <span className="text-slate-400">•</span>
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-cyan-50/90 text-cyan-700 border border-cyan-200/90 shadow-sm">
          <Radio className="w-3 h-3 text-cyan-600 animate-pulse" />
          <span>Live</span>
        </span>
      </div>
    </div>
  );
};

export default HeroBanner;
