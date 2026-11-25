import React from 'react';

export interface AlertBoxProps {
  title: string;
  description?: string;
  badgeText?: string;
  action?: React.ReactNode;
  className?: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({
  title,
  description,
  badgeText,
  action,
  className = '',
}) => {
  return (
    <div className={`bg-[#FEF3C7] border border-[#F59E0B] p-4 rounded flex items-center justify-between gap-4 ${className}`}>
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-sm text-[#F59E0B] uppercase tracking-wide">
            {title}
          </span>
          {badgeText && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#F59E0B] text-white rounded">
              {badgeText}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-[#120B8F] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};
