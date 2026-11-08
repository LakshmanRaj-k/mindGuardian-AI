import React from 'react';
import { Server, RefreshCw, CheckCircle2, AlertCircle, Radio, Terminal } from 'lucide-react';

export const BackendStatusCard = ({ backendState, onRefresh, isLoading }) => {
  const { connected, data, error, lastChecked } = backendState;

  return (
    <section className="glass-panel rounded-2xl p-6 border border-slate-800 bg-slate-900/90 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
              Backend Health & Connection Status
            </h3>
            <p className="text-xs text-slate-400">Verifies FastAPI endpoint availability on startup</p>
          </div>
        </div>

        {/* Refresh Status Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 text-xs font-semibold tracking-wide transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Checking...' : 'Refresh Status'}</span>
        </button>
      </div>

      {/* Grid of Backend Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status Indicator Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Connection State</span>
            <Radio className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="flex items-center space-x-2 pt-1">
            {connected ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400 uppercase tracking-wide">Connected</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-amber-400 uppercase tracking-wide">Disconnected</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            {connected ? 'FastAPI service operational' : error || 'Unable to reach localhost:8000'}
          </p>
        </div>

        {/* Project Name Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Target Project</span>
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="text-sm font-bold text-slate-100 pt-1">
            {data?.project || 'MindGuardian AI'}
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Official System Registry Name
          </p>
        </div>

        {/* API Version Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>API Version</span>
            <span className="text-[10px] font-mono text-cyan-400">GET /health</span>
          </div>
          <div className="text-sm font-bold text-cyan-400 pt-1">
            v{data?.version || '1.0'}
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Blueprint 1.0 Verified Schema
          </p>
        </div>

        {/* Last Checked Card */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Last Health Verification</span>
            <span className="text-[10px] text-slate-400">Single On-Startup</span>
          </div>
          <div className="text-sm font-mono text-slate-200 pt-1">
            {lastChecked ? lastChecked.toLocaleTimeString() : 'Not Checked'}
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Manual refresh enabled
          </p>
        </div>
      </div>
    </section>
  );
};

export default BackendStatusCard;
