import React from 'react';
import EmotionAnalysisCard from '../EmotionAnalysisCard';

/**
 * EmotionCard Wrapper
 */
export const EmotionCard = ({ emotionData, isAnalyzing }) => {
  return <EmotionAnalysisCard emotionData={emotionData} isAnalyzing={isAnalyzing} />;
};

export default EmotionCard;
