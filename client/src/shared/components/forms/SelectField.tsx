import React, { forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, error, helperText, id, className = '', ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        <label
          htmlFor={selectId}
          className="block text-[11px] font-bold uppercase tracking-wider text-[#120B8F]/90"
        >
          {label}
        </label>
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm text-[#120B8F] shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5087F7]/20 appearance-none pr-10 cursor-pointer ${
              error
                ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20 focus:ring-rose-400/20'
                : 'border-[#BDC7D7]/80 hover:border-[#5087F7]/60 focus:border-[#5087F7]'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-[#120B8F]/50">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </div>
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

SelectField.displayName = 'SelectField';
