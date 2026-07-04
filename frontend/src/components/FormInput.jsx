import React from 'react';

const FormInput = React.forwardRef(({
  label,
  error,
  helperText,
  required = false,
  type = 'text',
  options = [],
  children,
  className = '',
  id,
  disabled = false,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const labelClasses = 'block text-xs font-semibold text-primary font-sans mb-1.5 uppercase tracking-wider';
  const errorLabelClasses = 'text-red-500';
  const disabledLabelClasses = 'opacity-60';

  const baseInputClasses = 'w-full px-3.5 py-2.5 text-sm font-sans text-primary bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed';
  const defaultBorderClasses = 'border-border focus:border-primary focus:ring-gray-300';
  const errorBorderClasses = 'border-red-500 focus:border-red-500 focus:ring-red-200';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`${labelClasses} ${error ? errorLabelClasses : ''} ${disabled ? disabledLabelClasses : ''}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1 font-bold">*</span>}
        </label>
      )}

      <div className="relative">
        {type === 'select' ? (
          <>
            <select
              ref={ref}
              id={inputId}
              disabled={disabled}
              className={`${baseInputClasses} ${error ? errorBorderClasses : defaultBorderClasses} appearance-none cursor-pointer pr-10`}
              {...props}
            >
              {children ? children : options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 11-1.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </>
        ) : (
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            className={`${baseInputClasses} ${error ? errorBorderClasses : defaultBorderClasses}`}
            {...props}
          />
        )}
      </div>

      {error ? (
        <p className="mt-1 text-xs text-red-500 font-sans font-medium flex items-center gap-1">
          <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-gray-500 font-sans">{helperText}</p>
      ) : null}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
