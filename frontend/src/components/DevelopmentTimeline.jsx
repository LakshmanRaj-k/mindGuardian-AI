import React from 'react';
import { GitCommit, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

const TIMELINE_STEPS = [
  {
    version: 'Blueprint 1.0',
    title: 'Project Foundation',
    description: 'FastAPI backend setup, GET /health endpoint, CORS configuration, monorepo directory layout.',
    status: 'completed',
    active: true,
  },
  {
    version: 'Blueprint 2.0',
    title: 'Dashboard Interface',
    description: 'Modern dark hackathon UI, 9 component dashboard layout, single startup health verification.',
    status: 'completed',
    active: true,
  },
  {
    version: 'Blueprint 3.0',
    title: 'Live Camera Ingestion',
    description: 'Browser-native MediaDevices getUserMedia stream integration, track lifecycle management.',
    status: 'completed',
    active: true,
  },
  {
    version: 'Blueprint 4.0',
    title: 'Facial Emotion Recognition',
    description: 'Real-time facial expression analysis using DeepFace & OpenCV, returning dominant emotion and probability distribution.',
    status: 'completed',
    active: true,
  },
  {
    version: 'Blueprint 5.0',
    title: 'Voice Acoustic Analysis',
    description: 'Microphone PCM capture, pitch estimation via autocorrelation, and energy extraction for physiological voice metrics.',
    status: 'completed',
    active: true,
  },
  {
    version: 'Blueprint 6.0',
    title: 'Stress Fusion Engine',
    description: 'Multimodal rule-based signal fusion combining facial valence and acoustic voice indicators into explainable risk scoring.',
    status: 'completed',
    active: true,
  },
  {
    version: 'Blueprint 7.0',
    title: 'Adaptive Interventions',
    description: 'Context-aware AWIE guidance engine, guided 4-4-4 biofeedback breathing, and explainable XAI reasoning.',
    status: 'completed',
    active: true,
  },
];

export const DevelopmentTimeline = () => {
  return (
    <section className="glass-panel rounded-2xl p-6 border border-slate-800 bg-slate-900/90 shadow-lg space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide font-['Outfit']">
              24-Hour Hackathon Development Roadmap
            </h3>
            <p className="text-xs text-slate-400">Blueprint Version Iteration Progression</p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold border border-emerald-800/80">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Blueprint 7.0 Platform Complete</span>
        </span>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TIMELINE_STEPS.map((step, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all ${
              step.status === 'current'
                ? 'bg-cyan-950/30 border-cyan-500/50 shadow-md shadow-cyan-500/5'
                : step.status === 'completed'
                ? 'bg-slate-950/80 border-slate-800'
                : 'bg-slate-950/40 border-slate-800/60 opacity-75'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold text-cyan-400">
                {step.version}
              </span>

              {step.status === 'completed' && (
                <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ready</span>
                </span>
              )}

              {step.status === 'current' && (
                <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-cyan-300 px-2 py-0.5 rounded-md bg-cyan-900/60 border border-cyan-700/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>Active Build</span>
                </span>
              )}

              {step.status === 'upcoming' && (
                <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-slate-500">
                  <Circle className="w-3 h-3" />
                  <span>Planned</span>
                </span>
              )}
            </div>

            <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DevelopmentTimeline;
