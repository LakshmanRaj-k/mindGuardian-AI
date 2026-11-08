import React from 'react';
import SessionSummaryCard from '../SessionSummaryCard';

/**
 * SessionCard Wrapper
 */
export const SessionCard = ({ analysisCount, stressLevel, emotion, voiceActive }) => {
  return (
    <SessionSummaryCard
      analysisCount={analysisCount}
      stressLevel={stressLevel}
      emotion={emotion}
      voiceActive={voiceActive}
    />
  );
};

export default SessionCard;
