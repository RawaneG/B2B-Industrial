import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import WebGLParticles from '@/components/WebGLParticles';
import Section from '@/components/Section';
import { useLanguage } from '@/lib/i18n';

export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useLanguage();

  const productData = {
    'safety-shoes': {
      nameKey: 'productDetails.safetyShoes.name',
      descKey: 'productDetails.safetyShoes.description',
      specsKey: 'productDetails.safetyShoes.specs',
      category: 'epi',
      color: 'from-red-500 to-orange-500',
    },
    'hi-vis-jacket': {
      nameKey: 'productDetails.hiVisJacket.name',
      descKey: 'productDetails.hiVisJacket.description',
      specsKey: 'productDetails.hiVisJacket.specs',
      category: 'epi',
      color: 'from-orange-500 to-yellow-500',
    },
    'protective-gloves': {
      nameKey: 'productDetails.protectiveGloves.name',
      descKey: 'productDetails.protectiveGloves.description',
      specsKey: 'productDetails.protectiveGloves.specs',
      category: 'epi',
      color: 'from-red-600 to-red-400',
    },
    'circuit-breaker': {
      nameKey: 'productDetails.circuitBreaker.name',
      descKey: 'productDetails.circuitBreaker.description',
      specsKey: 'productDetails.circuitBreaker.specs',
      category: 'electrical',
      color: 'from-blue-500 to-cyan-500',
    },
    'switchgear': {
      nameKey: 'productDetails.switchgear.name',
      descKey: 'productDetails.switchgear.description',
      specsKey: 'productDetails.switchgear.specs',
      category: 'electrical',
      color: 'from-cyan-500 to-teal-500',
    },
    'cabling-accessories': {
      nameKey: 'productDetails.cablingAccessories.name',
      descKey: 'productDetails.cablingAccessories.description',
      specsKey: 'productDetails.cablingAccessories.specs',
      category: 'electrical',
      color: 'from-blue-600 to-blue-400',
    },
  };

  const product = productData[slug];
  
  if (!product && slug) {
    return (
      <div className="relative min-h-screen bg-neutral">
        <WebGLParticles />
        <Navbar />
        <div className="pt-32 container-custom text-center">
          <h1 className="text-4xl font-bold text-secondary mb-4">{t('productDetails.notFound')}</h1>
          <Link href="/products" className="text-primary hover:underline">
            ← {t('common.back')}
          </Link>
        </div>
      </div>
    );
  }

  const specs = product ? t(product.specsKey) : [];

  return (
    <div className="relative min-h-screen bg-neutral">
      <WebGLParticles />
      <Navbar />
      
      {/* Hero Section */}
      <div className={`relative pt-32 pb-20 bg-gradient-to-br ${product?.color || 'from-primary to-accent'}`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/products" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('common.back')} aux produits
            </Link>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <svg className="w-40 h-40 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white"
            >
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                {product?.category === 'epi' ? t('categories.epi') : t('categories.electrical')}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                {product ? t(product.nameKey) : ''}
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                {product ? t(product.descKey) : ''}
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-secondary py-4 px-10 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                {t('hero.requestQuote')}
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <Section
        id="specifications"
        title={t('productDetails.specifications')}
        description="Détails techniques et caractéristiques du produit."
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <ul className="space-y-4">
              {Array.isArray(specs) && specs.map((spec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-lg">{spec}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-secondary mb-6"
          >
            Intéressé par ce <span className="text-primary">produit</span> ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto"
          >
            Contactez-nous pour obtenir un devis personnalisé ou pour plus d'informations.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              {t('home.contactBtn')}
            </motion.a>
            <motion.a
              href="/products"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white border-2 border-primary text-primary py-4 px-10 rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-all"
            >
              Voir tous les produits
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}