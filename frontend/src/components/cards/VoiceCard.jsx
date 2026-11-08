import React from 'react';
import VoiceAnalysisCard from '../VoiceAnalysisCard';

/**
 * VoiceCard Wrapper
 */
export const VoiceCard = ({ onVoiceData }) => {
  return <VoiceAnalysisCard onVoiceData={onVoiceData} />;
};

export default VoiceCard;
