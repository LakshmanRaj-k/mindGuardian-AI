import React from 'react';
import { UserCheck, UserX, Search } from 'lucide-react';

export const FaceStatusBadge = ({ faceDetected, isAnalyzing }) => {
  if (faceDetected) {
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-semibold border border-emerald-800/80 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <UserCheck className="w-3.5 h-3.5" />
        <span>Face Tracked</span>
      </span>
    );
  }

  if (isAnalyzing) {
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-400 text-xs font-semibold border border-amber-800/80 shadow-sm">
        <Search className="w-3.5 h-3.5 animate-spin" />
        <span>Searching...</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-slate-400 text-xs font-semibold border border-slate-700/80">
      <UserX className="w-3.5 h-3.5" />
      <span>No Face Detected</span>
    </span>
  );
};

export default FaceStatusBadge;
