import { motion } from 'framer-motion';

/**
 * Section is a reusable wrapper that reveals its children with a subtle
 * animation when it enters the viewport.  It accepts an optional title and
 * description for easy section headings.
 */
export default function Section({ title, description, children, id, className = '', dark = false }) {
  return (
    <section 
      id={id} 
      className={`section-padding container-custom ${dark ? 'bg-secondary text-white' : ''} ${className}`}
    >
      {title && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${dark ? 'text-white' : 'text-secondary'}`}>
            <span className="text-primary">{title.split(' ')[0]}</span>{' '}
            {title.split(' ').slice(1).join(' ')}
          </h2>
          {description && (
            <p className={`text-lg max-w-2xl mx-auto ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              {description}
            </p>
          )}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-6"
          />
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
}