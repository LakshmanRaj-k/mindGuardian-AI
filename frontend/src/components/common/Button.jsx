import React from 'react';

/**
 * Reusable Glassy Button Component for Light White-Grey Theme
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  icon: Icon = null,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed glass-button';

  const variantStyles = {
    primary: '!bg-gradient-to-b !from-blue-600 !to-blue-700 hover:!from-blue-500 hover:!to-blue-600 text-white border-blue-400/40 focus:ring-blue-500 !shadow-md shadow-blue-500/20',
    secondary: '!bg-white/80 hover:!bg-white text-slate-800 border-slate-200/90 focus:ring-slate-400 shadow-sm',
    success: '!bg-gradient-to-b !from-emerald-600 !to-emerald-700 hover:!from-emerald-500 hover:!to-emerald-600 text-white border-emerald-400/40 focus:ring-emerald-500 !shadow-md shadow-emerald-500/20',
    danger: '!bg-gradient-to-b !from-red-600 !to-red-700 hover:!from-red-500 hover:!to-red-600 text-white border-red-400/40 focus:ring-red-500 !shadow-md shadow-red-500/20',
    ghost: '!bg-transparent hover:!bg-slate-200/60 text-slate-700 hover:text-slate-900 border-transparent focus:ring-slate-400 shadow-none',
  };

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-5 py-3 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
