import React from 'react';
import { Shield, Cpu, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-100/60 py-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-slate-600">
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-slate-800">MindGuardian AI</span>
          <span>— On-Device Hackathon Platform</span>
        </div>

        <div className="flex items-center space-x-6 text-[11px] font-mono">
          <span className="flex items-center space-x-1 text-emerald-700 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero Data Storage</span>
          </span>
          <span className="flex items-center space-x-1 text-blue-700 font-medium">
            <Cpu className="w-3.5 h-3.5" />
            <span>Local Edge Inference</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
