import React, { useState, useEffect } from 'react';
import { ShieldAlert, Activity, Cpu } from 'lucide-react';

export const Header = ({ isConnected }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Branding */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-['Outfit']">
                MindGuardian <span className="text-cyan-400">AI</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                Blueprint 2.0
              </span>
            </div>
            <p className="text-xs text-slate-400">Physiological Stress Detection Architecture</p>
          </div>
        </div>

        {/* Right Info & Status */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hackathon Build v2.0</span>
          </div>

          <div className="text-xs font-mono text-slate-300 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
            {currentTime || '00:00:00'}
          </div>

          {/* Connection Status Pill */}
          <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <span className="text-xs font-medium text-slate-300">
              {isConnected ? 'System Ready' : 'Backend Standby'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
