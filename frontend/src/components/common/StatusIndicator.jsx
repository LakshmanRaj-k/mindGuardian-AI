import React from 'react';

/**
 * Reusable StatusIndicator Component
 * Renders small status dot with label
 */
export const StatusIndicator = ({
  status = 'active', // active | warning | error | offline
  label = '',
  className = '',
}) => {
  const dotColors = {
    active: 'bg-emerald-400',
    warning: 'bg-amber-400',
    error: 'bg-red-400',
    offline: 'bg-slate-500',
  };

  return (
    <div className={`inline-flex items-center space-x-2 text-xs text-slate-300 ${className}`}>
      <span className={`h-2 w-2 rounded-full ${dotColors[status] || dotColors.offline} animate-pulse`} />
      {label && <span>{label}</span>}
    </div>
  );
};

export default StatusIndicator;
