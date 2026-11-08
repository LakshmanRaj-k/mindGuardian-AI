import React from 'react';

/**
 * Reusable LoadingSkeleton Component
 */
export const LoadingSkeleton = ({
  height = 'h-24',
  width = 'w-full',
  className = '',
}) => {
  return (
    <div
      className={`animate-pulse bg-slate-800/60 rounded-xl border border-white/[0.04] ${height} ${width} ${className}`}
    />
  );
};

export default LoadingSkeleton;
