import React from 'react';

const EMOTION_ORDER = ['happy', 'neutral', 'surprise', 'sad', 'angry', 'fear', 'disgust'];

const EMOTION_COLORS = {
  happy: 'bg-emerald-500',
  neutral: 'bg-blue-500',
  surprise: 'bg-cyan-500',
  sad: 'bg-indigo-500',
  angry: 'bg-red-500',
  fear: 'bg-purple-500',
  disgust: 'bg-amber-500',
};

export const EmotionBars = ({ emotions = {} }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
        <span>EMOTION SPECTRUM</span>
        <span>PROBABILITY</span>
      </div>

      <div className="space-y-1.5">
        {EMOTION_ORDER.map((emotionKey) => {
          const score = emotions[emotionKey] || emotions[emotionKey.capitalize?.() || emotionKey] || 0;
          const pct = Math.min(Math.max(score, 0), 100);
          const barColor = EMOTION_COLORS[emotionKey] || 'bg-blue-500';

          return (
            <div key={emotionKey} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="capitalize text-slate-800 font-semibold">{emotionKey}</span>
                <span className="font-mono text-slate-600 text-[11px] font-medium">{pct.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden border border-slate-300/40">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionBars;
