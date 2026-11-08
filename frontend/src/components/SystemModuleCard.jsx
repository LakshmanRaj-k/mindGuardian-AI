import React from 'react';
import { Camera, Mic, Activity, Lightbulb, Clock, CheckCircle2 } from 'lucide-react';

const iconMap = {
  'Face Analysis': Camera,
  'Voice Analysis': Mic,
  'Stress Engine': Activity,
  'Recommendation Engine': Lightbulb,
};

const colorMap = {
  'Face Analysis': {
    border: 'hover:border-cyan-500/40',
    iconBg: 'bg-cyan-950/80 text-cyan-400 border-cyan-800/80',
    badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60',
  },
  'Voice Analysis': {
    border: 'hover:border-purple-500/40',
    iconBg: 'bg-purple-950/80 text-purple-400 border-purple-800/80',
    badge: 'bg-purple-950/60 text-purple-300 border-purple-800/60',
  },
  'Stress Engine': {
    border: 'hover:border-indigo-500/40',
    iconBg: 'bg-indigo-950/80 text-indigo-400 border-indigo-800/80',
    badge: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60',
  },
  'Recommendation Engine': {
    border: 'hover:border-emerald-500/40',
    iconBg: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80',
    badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
  },
};

export const SystemModuleCard = ({ name, description, targetBlueprint, status = 'Waiting...' }) => {
  const IconComponent = iconMap[name] || Activity;
  const colors = colorMap[name] || colorMap['Stress Engine'];

  return (
    <div className={`glass-panel glass-panel-hover rounded-xl p-5 border border-slate-800 bg-slate-900/80 flex flex-col justify-between transition-all ${colors.border}`}>
      <div>
        {/* Top Icon & Target Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2.5 rounded-xl border ${colors.iconBg}`}>
            <IconComponent className="w-5 h-5" />
          </div>

          <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border ${colors.badge}`}>
            {targetBlueprint}
          </span>
        </div>

        {/* Title & Description */}
        <h4 className="text-base font-bold text-white tracking-wide">{name}</h4>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>

      {/* Status Pill Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Module Status:</span>
        </div>

        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-slate-950 text-slate-400 text-xs font-mono font-medium border border-slate-800">
          <span>{status}</span>
        </span>
      </div>
    </div>
  );
};

export default SystemModuleCard;
