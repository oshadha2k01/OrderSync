import React from 'react';

const ActionButton = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-sans font-medium rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-white hover:bg-gray-800 active:bg-gray-900 border border-primary focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    secondary: 'bg-secondary text-primary hover:bg-gray-200 active:bg-gray-300 border border-border focus:ring-2 focus:ring-gray-300 focus:ring-offset-2',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border border-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
    outline: 'bg-transparent text-primary hover:bg-secondary border border-border focus:ring-2 focus:ring-gray-300 focus:ring-offset-2',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  };

  const selectedVariant = variants[variant] || variants.primary;
  const selectedSize = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${selectedVariant} ${selectedSize} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!isLoading && iconLeft && <span className="flex items-center">{iconLeft}</span>}
      <span>{children}</span>
      {!isLoading && iconRight && <span className="flex items-center">{iconRight}</span>}
    </button>
  );
};

export default ActionButton;
