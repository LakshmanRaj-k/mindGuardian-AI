import React from 'react';
import { Mic, MicOff, Loader2, ShieldAlert } from 'lucide-react';

/**
 * MicrophoneStatusBadge – Blueprint 5.0
 * Displays the current microphone capture state as a styled badge.
 *
 * States:
 *  active      → green pulse, "Recording"
 *  requesting  → amber spinner, "Requesting..."
 *  denied      → red, "Permission Denied"
 *  idle        → gray, "Microphone Off"
 */
export const MicrophoneStatusBadge = ({ micState }) => {
  if (micState === 'active') {
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-semibold border border-emerald-800/80 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <Mic className="w-3.5 h-3.5" />
        <span>Recording</span>
      </span>
    );
  }

  if (micState === 'requesting') {
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-400 text-xs font-semibold border border-amber-800/80">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        <span>Requesting...</span>
      </span>
    );
  }

  if (micState === 'denied') {
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-950/80 text-rose-400 text-xs font-semibold border border-rose-800/80">
        <ShieldAlert className="w-3.5 h-3.5" />
        <span>Permission Denied</span>
      </span>
    );
  }

  // Default: idle
  return (
    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-slate-400 text-xs font-semibold border border-slate-700/80">
      <MicOff className="w-3.5 h-3.5" />
      <span>Mic Off</span>
    </span>
  );
};

export default MicrophoneStatusBadge;
