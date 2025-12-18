import { motion } from 'framer-motion';

/**
 * Reusable Card component with variants
 * @param {Object} props - Card props
 */
export default function Card({
  children,
  variant = 'default',
  hover = true,
  padding = 'md',
  rounded = 'xl',
  className = '',
  animate = true,
  delay = 0,
  ...props
}) {
  const variants = {
    default: 'bg-white shadow-lg',
    gradient: 'bg-gradient-to-br from-white to-gray-50 shadow-lg',
    outlined: 'bg-white border-2 border-gray-200',
    glass: 'bg-white/80 backdrop-blur-md shadow-lg',
    dark: 'bg-secondary text-white shadow-xl',
    primary: 'bg-gradient-to-br from-primary to-red-600 text-white shadow-xl shadow-primary/30',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  const hoverClasses = hover
    ? 'hover:shadow-2xl hover:-translate-y-1'
    : '';

  const cardClasses = `
    ${variants[variant]}
    ${paddings[padding]}
    ${roundedStyles[rounded]}
    ${hoverClasses}
    transition-all duration-300
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className={cardClasses}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}
