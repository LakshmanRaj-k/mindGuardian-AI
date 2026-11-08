import React from 'react';
import StressAssessmentCard from '../StressAssessmentCard';

/**
 * StressCard Wrapper
 */
export const StressCard = ({ stressData, isAnalyzing }) => {
  return <StressAssessmentCard stressData={stressData} isAnalyzing={isAnalyzing} />;
};

export default StressCard;
