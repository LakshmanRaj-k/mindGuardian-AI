import React from 'react';
import { Brain, Code2 } from 'lucide-react';

/**
 * Glassy Compact Header Component (Light White-Grey Theme)
 */
export const Header = ({ isConnected = false, isDevMode = false, onToggleDevMode }) => {
  return (
    <header className="border-b border-slate-200/80 bg-white/70 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Brain className="w-5 h-5" />
          </div>
          <span className="text-base font-bold text-slate-900 tracking-wide font-['Outfit']">
            MindGuardian AI
          </span>
        </div>

        {/* Right Status & Controls */}
        <div className="flex items-center space-x-3">
          {/* Live Status Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/90 text-xs backdrop-blur-md">
            <span
              className={`h-2 w-2 rounded-full ${
                isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
              }`}
            />
            <span className="text-slate-700 font-semibold font-mono text-[11px]">
              {isConnected ? 'Backend ● Online' : 'Backend ● Offline'}
            </span>
          </div>

          {/* Dev Mode Toggle Button */}
          <button
            onClick={onToggleDevMode}
            className={`p-2 rounded-xl border transition-all text-xs font-semibold flex items-center space-x-1.5 glass-button ${
              isDevMode
                ? '!bg-blue-600 text-white border-blue-500 shadow-md'
                : 'text-slate-700 hover:text-slate-900 border-slate-200'
            }`}
            title="Toggle Developer & Telemetry Panel"
          >
            <Code2 className="w-4 h-4" />
            <span className="hidden sm:inline">Dev Mode</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
