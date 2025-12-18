import { motion } from 'framer-motion';
import { forwardRef } from 'react';

/**
 * Reusable Button component with variants
 * @param {Object} props - Button props
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    rounded = 'full',
    isLoading = false,
    disabled = false,
    leftIcon = null,
    rightIcon = null,
    className = '',
    animate = true,
    ...props
  },
  ref
) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-red-700 shadow-lg shadow-primary/30',
    secondary: 'bg-secondary text-white hover:bg-gray-800',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    outlineWhite: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary',
    ghost: 'bg-transparent text-primary hover:bg-primary/10',
    accent: 'bg-accent text-secondary hover:bg-yellow-500 shadow-lg shadow-accent/30',
  };

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-10 text-lg',
    xl: 'py-5 px-12 text-xl',
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-primary/50
  `;

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${roundedStyles[rounded]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const Component = animate ? motion.button : 'button';
  const motionProps = animate ? {
    whileHover: disabled ? {} : { scale: 1.05 },
    whileTap: disabled ? {} : { scale: 0.95 },
  } : {};

  return (
    <Component
      ref={ref}
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...motionProps}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Chargement...</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </Component>
  );
});

export default Button;
