import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  header,
  footer,
}) => {
  return (
    <div className={`bg-white border border-[#BDC7D7]/70 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden ${className}`}>
      {header && (
        <div className="px-6 py-4.5 border-b border-[#BDC7D7]/60 bg-white">
          {header}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-3.5 border-t border-[#BDC7D7]/60 bg-[#F8FAFC]">
          {footer}
        </div>
      )}
    </div>
  );
};
