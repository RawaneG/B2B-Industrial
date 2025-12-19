import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Aurora } from '@/components/backgrounds';
import Section from '@/components/Section';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/i18n';

export default function ProductsPage() {
  const { t } = useLanguage();

  const categories = {
    epi: {
      label: t('categories.epi'),
      color: 'from-red-500 to-orange-500',
      items: [
        { name: t('products.safetyShoes.name'), slug: 'safety-shoes' },
        { name: t('products.hiVisJacket.name'), slug: 'hi-vis-jacket' },
        { name: t('products.gloves.name'), slug: 'protective-gloves' },
      ],
    },
    electrical: {
      label: t('categories.electrical'),
      color: 'from-blue-500 to-cyan-500',
      items: [
        { name: t('products.circuitBreaker.name'), slug: 'circuit-breaker' },
        { name: t('products.switchgear.name'), slug: 'switchgear' },
        { name: t('products.cabling.name'), slug: 'cabling-accessories' },
      ],
    },
  };

  return (
    <div className="relative min-h-screen bg-neutral">
      <Aurora />
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-gradient-to-b from-secondary to-secondary/95">
        <div className="container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium tracking-wider mb-6"
          >
            {t('nav.products').toUpperCase()}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {t('products.catalogueTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {t('products.catalogueDesc')}
          </motion.p>
        </div>
      </div>

      {/* Categories */}
      <Section id="products-catalogue">
        {Object.entries(categories).map(([key, category], categoryIndex) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            className="mb-16 last:mb-0"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-secondary">{category.label}</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                >
                  <Link href={`/products/${item.slug}`}>
                    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                      {/* Image placeholder */}
                      <div className={`h-48 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <svg className="w-20 h-20 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </motion.div>
                        {/* Category badge */}
                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-secondary text-xs font-semibold rounded-full">
                          {category.label}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex items-center text-primary font-medium">
                          <span>{t('products.learnMore')}</span>
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </Section>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-secondary to-secondary/95 py-20">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            {t('productDetails.customQuoteTitle').split(' ').slice(0, -2).join(' ')} <span className="text-primary">{t('productDetails.customQuoteTitle').split(' ').slice(-2).join(' ')}</span> ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            {t('productDetails.customQuoteDesc')}
          </motion.p>
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-primary text-white py-4 px-10 rounded-full font-semibold text-lg hover:bg-red-700 transition-all shadow-lg shadow-primary/30"
          >
            {t('hero.requestQuote')}
          </motion.a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
