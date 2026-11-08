import React from 'react';

export const SectionTitle = ({
  title,
  subtitle,
  icon: Icon = null,
  action = null,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-between border-b border-slate-200/80 pb-3 ${className}`}>
      <div className="flex items-center space-x-3">
        {Icon && (
          <div className="p-2.5 rounded-xl bg-slate-100 text-blue-600 border border-slate-200/80 shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-wide font-['Outfit']">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default SectionTitle;
