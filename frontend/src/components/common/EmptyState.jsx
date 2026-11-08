import React from 'react';
import { AlertCircle } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = AlertCircle,
  title = 'No Data Available',
  description = 'No information to display at this time.',
  actionLabel = null,
  onAction = null,
  className = '',
}) => {
  return (
    <div className={`p-8 rounded-xl bg-slate-50/80 border border-slate-200/80 text-center flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className="p-3 rounded-full bg-white border border-slate-200 shadow-sm text-slate-500">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
