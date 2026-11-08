import React from 'react';
import { Shield, Code, Cpu, Terminal } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-panel border-t border-slate-800 bg-slate-950/90 py-8 px-4 sm:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Branding */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white font-['Outfit']">
              MindGuardian AI <span className="text-slate-400 font-normal">| Blueprint 2.0</span>
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Physiological Stress Detection System • 24-Hour Hackathon Interface Architecture
          </p>
        </div>

        {/* Center Tech Stack Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono">
            React 18
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono">
            Vite 5
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono">
            Tailwind CSS
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono">
            FastAPI
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono">
            Axios
          </span>
        </div>

        {/* Right Disclaimer */}
        <div className="text-center md:text-right">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>Blueprint 1.0 & 2.0 Foundation Only</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
