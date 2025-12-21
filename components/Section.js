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
      className={`section-padding container-custom ${className}`}
      style={{
        background: dark ? 'hsl(var(--brand-dark))' : 'hsl(var(--surface))',
        color: dark ? 'hsl(var(--text-on-dark))' : 'hsl(var(--text))',
      }}
    >
      {title && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4`}>
            <span style={{ color: 'hsl(var(--accent))' }}>{title.split(' ')[0]}</span>{' '}
            <span>{title.split(' ').slice(1).join(' ')}</span>
          </h2>
          {description && (
            <p className={`text-lg max-w-2xl mx-auto ${dark ? '' : ''}`} style={{ color: dark ? 'hsl(var(--muted-on-dark))' : 'hsl(var(--muted))' }}>
              {description}
            </p>
          )}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1 rounded-full mx-auto mt-6"
            style={{ background: `linear-gradient(90deg, hsl(var(--brand-dark)), hsl(var(--accent)))` }}
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