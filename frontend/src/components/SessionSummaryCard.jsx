import React, { useState, useEffect } from 'react';
import { BarChart3, Clock, Cpu, Smile, Mic, Shield } from 'lucide-react';

export const SessionSummaryCard = ({ analysisCount = 0, stressLevel = 'Low', emotion = 'Neutral', voiceActive = false }) => {
  const [sessionSeconds, setSessionSeconds] = useState(0);

  // Active session timer loop (seconds since dashboard open)
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-slate-900/90 flex flex-col justify-between shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Current Session Telemetry</h3>
            <p className="text-xs text-slate-400">In-Memory Application Session Counters</p>
          </div>
        </div>

        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{formatDuration(sessionSeconds)}</span>
        </span>
      </div>

      {/* Grid Counters */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Analyses Counter */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
          <span className="text-[10px] font-mono tracking-wider text-slate-400 block mb-1">ANALYSES EXECUTED</span>
          <div className="flex items-end space-x-1">
            <span className="text-2xl font-bold font-mono text-cyan-300">{analysisCount}</span>
            <span className="text-xs text-slate-500 mb-0.5">cycles</span>
          </div>
        </div>

        {/* Current Stress Level */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
          <span className="text-[10px] font-mono tracking-wider text-slate-400 block mb-1">CURRENT STRESS</span>
          <span className="text-xl font-bold text-white font-['Outfit'] block">{stressLevel}</span>
        </div>

        {/* Emotion Affect */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center space-x-2.5">
          <Smile className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">FACE AFFECT</span>
            <span className="text-xs font-semibold text-slate-200">{emotion}</span>
          </div>
        </div>

        {/* Voice Status */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center space-x-2.5">
          <Mic className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">VOICE ENGINE</span>
            <span className="text-xs font-semibold text-slate-200">{voiceActive ? 'Recording' : 'Standby'}</span>
          </div>
        </div>
      </div>

      {/* Persistence Note */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span className="flex items-center space-x-1">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Non-persistent session (RAM only)</span>
        </span>
        <span>Zero DB Writes</span>
      </div>
    </div>
  );
};

export default SessionSummaryCard;
