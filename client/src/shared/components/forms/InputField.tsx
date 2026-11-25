import React, { forwardRef } from 'react';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, helperText, id, icon, className = '', ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-[11px] font-bold uppercase tracking-wider text-[#120B8F]/90"
        >
          {label}
        </label>
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#120B8F]/40">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm text-[#120B8F] placeholder-[#120B8F]/35 shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5087F7]/20 ${
              icon ? 'pl-10' : ''
            } ${
              error
                ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20 focus:ring-rose-400/20'
                : 'border-[#BDC7D7]/80 hover:border-[#5087F7]/60 focus:border-[#5087F7]'
            } ${className}`}
            {...props}
          />
        </div>

        {error && (
          <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center space-x-1">
            <span>•</span>
            <span>{error}</span>
          </p>
        )}

        {!error && helperText && (
          <p className="text-[11px] text-[#120B8F]/60 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
