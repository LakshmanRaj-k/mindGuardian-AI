import React from 'react';

/**
 * Reusable Badge Component for Light White-Grey Glassy Theme
 */
export const Badge = ({
  children,
  variant = 'neutral',
  pulse = false,
  icon: Icon = null,
  className = '',
}) => {
  const variantStyles = {
    success: 'bg-emerald-50/80 text-emerald-700 border-emerald-200/90 backdrop-blur-md font-semibold',
    warning: 'bg-amber-50/80 text-amber-700 border-amber-200/90 backdrop-blur-md font-semibold',
    error: 'bg-red-50/80 text-red-700 border-red-200/90 backdrop-blur-md font-semibold',
    neutral: 'bg-slate-100/80 text-slate-700 border-slate-200/90 backdrop-blur-md font-medium',
    active: 'bg-blue-50/80 text-blue-700 border-blue-200/90 backdrop-blur-md font-semibold',
    primary: 'bg-blue-50/80 text-blue-700 border-blue-200/90 backdrop-blur-md font-semibold',
  };

  const dotColors = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    neutral: 'bg-slate-500',
    active: 'bg-blue-500',
    primary: 'bg-blue-500',
  };

  return (
    <span
      className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs border shadow-sm ${
        variantStyles[variant] || variantStyles.neutral
      } ${className}`}
    >
      {pulse && (
        <span
          className={`h-2 w-2 rounded-full ${dotColors[variant] || dotColors.neutral} animate-pulse`}
        />
      )}
      {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
