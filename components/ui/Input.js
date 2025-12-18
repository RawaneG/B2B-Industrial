import { forwardRef } from 'react';

/**
 * Reusable Input component
 * @param {Object} props - Input props
 */
const Input = forwardRef(function Input(
  {
    label,
    error,
    touched,
    type = 'text',
    className = '',
    containerClassName = '',
    labelClassName = '',
    required = false,
    ...props
  },
  ref
) {
  const hasError = error && touched;

  const baseInputClasses = `
    w-full px-4 py-3 rounded-xl
    bg-gray-50 border-2
    transition-all duration-300
    focus:outline-none focus:ring-0
    placeholder:text-gray-400
  `;

  const stateClasses = hasError
    ? 'border-red-500 focus:border-red-500 focus:bg-red-50'
    : 'border-gray-200 focus:border-primary focus:bg-white';

  const inputClasses = `${baseInputClasses} ${stateClasses} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className={`block text-sm font-semibold text-secondary ${labelClassName}`}>
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          ref={ref}
          className={`${inputClasses} min-h-[120px] resize-y`}
          {...props}
        />
      ) : (
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
        />
      )}
      {hasError && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
