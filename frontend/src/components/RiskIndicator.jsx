import React from 'react';
import { ShieldCheck, AlertTriangle, Flame, AlertCircle } from 'lucide-react';

export const RiskIndicator = ({ stressLevel = 'Low', score = 0 }) => {
  const levelUpper = (stressLevel || 'Low').toUpperCase();

  if (levelUpper === 'LOW') {
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-semibold border border-emerald-800/80 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Low Stress ({score})</span>
      </span>
    );
  }

  if (levelUpper === 'MODERATE') {
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-400 text-xs font-semibold border border-amber-800/80 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>Moderate ({score})</span>
      </span>
    );
  }

  if (levelUpper === 'HIGH') {
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-950/80 text-orange-400 text-xs font-semibold border border-orange-800/80 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
        <Flame className="w-3.5 h-3.5" />
        <span>High Stress ({score})</span>
      </span>
    );
  }

  // CRITICAL
  return (
    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-950/80 text-rose-400 text-xs font-semibold border border-rose-800/80 shadow-sm">
      <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
      <AlertCircle className="w-3.5 h-3.5" />
      <span>Critical Strain ({score})</span>
    </span>
  );
};

export default RiskIndicator;
