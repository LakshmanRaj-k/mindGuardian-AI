import React from 'react';
import Badge from '../common/Badge';

export const RiskIndicator = ({ stressLevel = 'Low', score = 0 }) => {
  const levelUpper = (stressLevel || 'Low').toUpperCase();

  if (levelUpper === 'LOW') {
    return <Badge variant="success" pulse>Low Stress ({score})</Badge>;
  }

  if (levelUpper === 'MODERATE') {
    return <Badge variant="warning" pulse>Moderate ({score})</Badge>;
  }

  if (levelUpper === 'HIGH') {
    return <Badge variant="warning" pulse className="!bg-orange-950/80 !text-orange-400 !border-orange-800/80">High Stress ({score})</Badge>;
  }

  return <Badge variant="error" pulse>Critical Strain ({score})</Badge>;
};

export default RiskIndicator;
