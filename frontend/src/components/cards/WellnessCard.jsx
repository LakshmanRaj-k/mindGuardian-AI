import React from 'react';
import WellnessCardBase from '../WellnessCard';

/**
 * WellnessCard Wrapper
 */
export const WellnessCard = ({ recommendationData, stressData }) => {
  return <WellnessCardBase recommendationData={recommendationData} stressData={stressData} />;
};

export default WellnessCard;
