import React from 'react';
import { Camera, EyeOff, Lock, Sparkles } from 'lucide-react';

export const LiveCameraPlaceholder = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-slate-900/90 flex flex-col h-full justify-between shadow-lg">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Live Optical Stream</h3>
            <p className="text-xs text-slate-400">Webcam Feed Integration</p>
          </div>
        </div>

        {/* Blueprint Badge */}
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-400 text-xs font-semibold border border-cyan-800/80">
          <Sparkles className="w-3 h-3" />
          <span>Active in Blueprint 3.0</span>
        </span>
      </div>

      {/* Video Viewport Frame */}
      <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center overflow-hidden group">
        {/* Optical Crosshair Visual Accents */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-slate-700"></div>
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-slate-700"></div>
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-slate-700"></div>
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-slate-700"></div>

        {/* Disabled Overlay Visual */}
        <div className="p-4 rounded-full bg-slate-900 border border-slate-800 text-slate-500 mb-3 shadow-inner">
          <EyeOff className="w-8 h-8" />
        </div>

        <h4 className="text-sm font-semibold text-slate-300">Camera Feed Offline</h4>
        <p className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed">
          Webcam stream ingestion and facial landmark detection will be integrated in <strong className="text-cyan-400">Blueprint 3.0</strong>.
        </p>

        <div className="mt-4 inline-flex items-center space-x-2 text-[11px] text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
          <Lock className="w-3 h-3 text-slate-400" />
          <span>Media stream hardware access disabled</span>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Status: <strong className="text-slate-300 font-mono">Standby</strong></span>
        <span>Resolution: <strong className="text-slate-300 font-mono">1080p Target</strong></span>
      </div>
    </div>
  );
};

export default LiveCameraPlaceholder;
