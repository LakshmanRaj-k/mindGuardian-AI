import React, { forwardRef } from 'react';
import LiveCamera from '../LiveCamera';

/**
 * CameraCard Wrapper
 */
export const CameraCard = forwardRef(({ onStreamChange }, ref) => {
  return <LiveCamera ref={ref} onStreamChange={onStreamChange} />;
});

CameraCard.displayName = 'CameraCard';
export default CameraCard;
