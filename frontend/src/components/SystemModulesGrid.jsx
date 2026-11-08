import React from 'react';
import SystemModuleCard from './SystemModuleCard';
import { Layers } from 'lucide-react';

const MODULES_DATA = [
  {
    id: 'face-analysis',
    name: 'Face Analysis',
    description: 'Facial micro-expression parsing, action unit extraction, and valence visual tracking.',
    targetBlueprint: 'Blueprint 4.0',
    status: '🟢 Active'
  },
  {
    id: 'voice-analysis',
    name: 'Voice Analysis',
    description: 'Acoustic pitch perturbation, speech cadence analysis, and vocal jitter detection.',
    targetBlueprint: 'Blueprint 5.0',
    status: '🟢 Active'
  },
  {
    id: 'stress-engine',
    name: 'Stress Engine',
    description: 'Multi-biomarker sensor fusion, cognitive strain calculation, and acute stress scoring.',
    targetBlueprint: 'Blueprint 6.0',
    status: '🟢 Active'
  },
  {
    id: 'recommendation-engine',
    name: 'Recommendation Engine',
    description: 'Autonomous biofeedback triggers, breathing pace guidance, and restorative environment loops.',
    targetBlueprint: 'Blueprint 7.0',
    status: '🟢 AWIE Engine Active'
  }
];

export const SystemModulesGrid = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white tracking-wide font-['Outfit']">
            System Modules Architecture
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">4 Core Subsystems Configured</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MODULES_DATA.map((module) => (
          <SystemModuleCard
            key={module.id}
            name={module.name}
            description={module.description}
            targetBlueprint={module.targetBlueprint}
            status={module.status}
          />
        ))}
      </div>
    </section>
  );
};

export default SystemModulesGrid;
