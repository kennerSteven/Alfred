import React from 'react';

export interface BadgeProps {
  variant?: 'blue' | 'lightBlue' | 'green' | 'orange' | 'darkBlue' | 'gray';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'lightBlue',
  children,
  className = '',
}) => {
  const variantStyles = {
    lightBlue: 'bg-[#8BCFF1]/30 text-[#120B8F] border border-[#8BCFF1]/60',
    blue: 'bg-[#5087F7] text-white shadow-xs',
    darkBlue: 'bg-[#120B8F] text-white shadow-xs',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    orange: 'bg-[#FEF3C7] text-[#F59E0B] border border-[#F59E0B]/50',
    gray: 'bg-[#F8FAFC] border border-[#BDC7D7] text-[#120B8F]',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
