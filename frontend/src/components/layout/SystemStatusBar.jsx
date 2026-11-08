import React from 'react';

/**
 * Slim System Status Bar with Glacy Finish (Light White-Grey Theme)
 */
export const SystemStatusBar = ({
  isCameraActive = false,
  isMicActive = false,
  isFaceDetected = false,
  isVoiceDetected = false,
  isStressEngineActive = false,
}) => {
  const items = [
    { label: 'Camera', active: isCameraActive },
    { label: 'Microphone', active: isMicActive },
    { label: 'Face Detected', active: isFaceDetected },
    { label: 'Voice Active', active: isVoiceDetected },
    { label: 'Stress Engine', active: isStressEngineActive },
    { label: 'Local AI', active: true },
  ];

  return (
    <div className="w-full px-4 py-2.5 rounded-xl glass-card flex flex-wrap items-center justify-between gap-2 text-xs">
      <div className="flex flex-wrap items-center gap-3 sm:gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="inline-flex items-center space-x-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                item.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span className={item.active ? 'text-slate-800 font-semibold' : 'text-slate-500'}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatusBar;
