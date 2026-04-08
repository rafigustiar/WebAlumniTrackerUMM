import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  className = '',
  ...props
}) => {
  const baseClass = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-secondary text-white hover:bg-slate-700 active:bg-slate-800',
    danger: 'bg-danger text-white hover:bg-red-700 active:bg-red-800',
    outline: 'border-2 border-primary text-primary hover:bg-blue-50 active:bg-blue-100',
    ghost: 'text-primary hover:bg-blue-50 active:bg-blue-100'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
};

export const Input = ({
  label,
  error,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <input
        className={`input-field ${error ? 'border-danger' : ''} ${className}`}
        {...props}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export const Select = ({
  label,
  error,
  required = false,
  options = [],
  className = '',
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <select
        className={`input-field ${error ? 'border-danger' : ''} ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export const TextArea = ({
  label,
  error,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`input-field resize-none h-24 ${error ? 'border-danger' : ''} ${className}`}
        {...props}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};
