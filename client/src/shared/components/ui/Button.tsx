import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs shadow-xs',
    md: 'px-4 py-2 text-xs shadow-xs',
    lg: 'px-5 py-2.5 text-sm shadow-sm',
  };

  const variantStyles = {
    primary: 'bg-[#5087F7] hover:bg-[#3f76e5] text-white hover:shadow-md hover:shadow-[#5087F7]/25',
    secondary: 'bg-[#8BCFF1]/30 hover:bg-[#8BCFF1]/50 text-[#120B8F] border border-[#8BCFF1]/60',
    outline: 'border border-[#BDC7D7] bg-white hover:bg-[#F8FAFC] text-[#120B8F] hover:border-[#5087F7]',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white hover:shadow-md hover:shadow-rose-600/25',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Cargando...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
