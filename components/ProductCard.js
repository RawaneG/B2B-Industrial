import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

/**
 * Premium Product Card with hover effects and image animations
 * Features gradient overlays, zoom effects, and smooth transitions
 */
export default function ProductCard({ name, category, description, image, slug, delay = 0 }) {
  const { t } = useLanguage();
  
  // Generate placeholder image with product-specific gradient
  const gradients = {
    'EPI': 'from-red-500 via-orange-500 to-yellow-500',
    'Electrical': 'from-blue-500 via-cyan-500 to-teal-500',
    'Safety': 'from-green-500 via-emerald-500 to-lime-500',
  };

  const gradient = gradients[category] || 'from-primary via-accent to-primary';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Link href={`/products/${slug}`}>
        <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer h-full flex flex-col">
          {/* Image container with zoom effect */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            {/* Image placeholder with gradient */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`w-full h-full bg-gradient-to-br ${gradient} opacity-90`}
            >
              {/* Product icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center text-white/30">
                <svg className="w-32 h-32" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </motion.div>

            {/* Animated overlay pattern - lighter and more subtle */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent pointer-events-none"
            />

            {/* Category badge */}
            <div className="absolute top-4 left-4 z-10">
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: delay + 0.2 }}
                className="px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm"
              >
                {category}
              </motion.span>
            </div>

            {/* Quick view icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:opacity-100 group-hover:scale-100"
            >
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </motion.div>
          </div>

          {/* Content section */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Product name */}
            <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
              {name}
            </h3>

            {/* Description */}
            <p className="text-gray-600 mb-4 flex-1 leading-relaxed line-clamp-2">
              {description}
            </p>

            {/* Action button */}
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center text-primary font-semibold group-hover:text-accent transition-colors"
            >
              <span>{t('products.viewDetails')}</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>
          </div>

          {/* Animated bottom border */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            className="h-1 bg-gradient-to-r from-primary to-accent origin-left"
          />
        </div>
      </Link>
    </motion.div>
  );
}
