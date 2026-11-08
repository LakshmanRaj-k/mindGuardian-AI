import React from 'react';
import { Code2, Server, Layers, GitCommit, ShieldCheck, Terminal } from 'lucide-react';
import Card from './common/Card';
import SessionSummaryCard from './SessionSummaryCard';
import PrivacyCard from './PrivacyCard';
import SystemModulesGrid from './SystemModulesGrid';
import DevelopmentTimeline from './DevelopmentTimeline';
import BackendStatusCard from './BackendStatusCard';

/**
 * Developer & Telemetry Panel (Blueprint 8.1 Redesign)
 * Collapsible technical panel containing implementation details, architecture, and telemetry.
 */
export const DeveloperModePanel = ({
  backendState,
  checkBackendHealth,
  isLoading,
  analysisCount,
  stressLevel,
  dominantEmotion,
  isVoiceActive,
}) => {
  return (
    <div className="space-y-6 pt-6 border-t border-white/[0.08] animate-fade-in">
      <div className="flex items-center space-x-2 text-blue-400">
        <Code2 className="w-5 h-5" />
        <h3 className="text-lg font-bold text-white font-['Outfit']">Developer & Telemetry Panel</h3>
      </div>

      {/* Backend Status Details */}
      <BackendStatusCard
        backendState={backendState}
        onRefresh={checkBackendHealth}
        isLoading={isLoading}
      />

      {/* Session Telemetry & Privacy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SessionSummaryCard
          analysisCount={analysisCount}
          stressLevel={stressLevel}
          emotion={dominantEmotion}
          voiceActive={isVoiceActive}
        />
        <PrivacyCard />
      </div>

      {/* System Subsystem Architecture Grid */}
      <SystemModulesGrid />

      {/* Hackathon Timeline */}
      <DevelopmentTimeline />
    </div>
  );
};

export default DeveloperModePanel;
