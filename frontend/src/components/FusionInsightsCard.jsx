import React from 'react';
import { Network, CheckCircle2, Cpu, Smile, Mic } from 'lucide-react';

export const FusionInsightsCard = ({ stressData, emotionData, voiceData }) => {
  const contributing_factors = stressData?.contributing_factors || [
    'Multimodal fusion engine initialized.',
    'Awaiting active camera and microphone streams.'
  ];

  const dominantEmotion = emotionData?.dominant_emotion || 'Offline';
  const emotionConf = emotionData?.confidence ? `${emotionData.confidence.toFixed(1)}%` : '—';

  const voiceDetected = voiceData?.voice_detected || false;
  const pitch = voiceData?.pitch ? `${Math.round(voiceData.pitch)} Hz` : '—';
  const energy = voiceData?.energy ? `${Math.round(voiceData.energy * 100)}%` : '—';

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-slate-900/90 flex flex-col justify-between shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Fusion Explainability & Insights</h3>
            <p className="text-xs text-slate-400">Rule-Based Multimodal Signal Breakdown</p>
          </div>
        </div>

        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-400 text-xs font-semibold border border-cyan-800/80">
          <Cpu className="w-3.5 h-3.5" />
          <span>60% Face / 40% Voice</span>
        </span>
      </div>

      {/* Primary Contributing Factors List */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-semibold tracking-wider text-slate-400 block uppercase">
          PRIMARY CONTRIBUTING FACTORS
        </span>

        <div className="space-y-2">
          {contributing_factors.map((factor, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start space-x-2.5 text-xs text-slate-300"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subsystem Metric Snapshots */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {/* Face Snapshot */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800">
            <Smile className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">FACE AFFECT</span>
            <span className="text-xs font-bold text-white">{dominantEmotion} ({emotionConf})</span>
          </div>
        </div>

        {/* Voice Snapshot */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">VOICE ACOUSTICS</span>
            <span className="text-xs font-bold text-white">
              {voiceDetected ? `${pitch} | ${energy}` : 'No Voice'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FusionInsightsCard;
