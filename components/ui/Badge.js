import { motion } from 'framer-motion';

/**
 * Badge component for labels and tags
 * @param {Object} props - Badge props
 */
export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  className = '',
  animate = false,
}) {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/30',
    secondary: 'bg-secondary/10 text-secondary border-secondary/30',
    accent: 'bg-accent/10 text-accent border-accent/30',
    success: 'bg-green-500/10 text-green-600 border-green-500/30',
    warning: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
    error: 'bg-red-500/10 text-red-600 border-red-500/30',
    info: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    white: 'bg-white/20 text-white border-white/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const badgeClasses = `
    inline-flex items-center justify-center
    font-medium border tracking-wider
    ${variants[variant]}
    ${sizes[size]}
    ${roundedStyles[rounded]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (animate) {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={badgeClasses}
      >
        {children}
      </motion.span>
    );
  }

  return <span className={badgeClasses}>{children}</span>;
}
