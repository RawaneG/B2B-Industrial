import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

/**
 * Premium Hero with progressive reveal animations
 * Inspired by high-end portfolio sites with layered content emergence
 */
export default function PremiumHero() {
  const { scrollY } = useScroll();
  const { t } = useLanguage();

  // Parallax effects based on scroll
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* Animated gradient overlay */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 animate-pulse" style={{ animationDuration: '8s' }} />
      </motion.div>

      {/* Background image with parallax - industrial theme */}
      <motion.div
        style={{ scale, y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(217,44,58,0.1)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="%23000000"/%3E%3Crect width="100" height="100" fill="url(%23grid)"/%3E%3C/svg%3E')`,
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* Content layer with staggered animations */}
      <motion.div
        style={{ y: y2, opacity }}
        className="relative z-20 px-4 text-center"
      >
        {/* Micro-label with slide-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block mb-6"
        >
          <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium tracking-wider backdrop-blur-sm">
            {t('hero.badge')}
          </span>
        </motion.div>

        {/* Main heading with scale + fade */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight"
        >
          <span className="block">{t('hero.title1')}</span>
          <span className="block mt-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {t('hero.title2')}
          </span>
        </motion.h1>

        {/* Subtitle with delayed fade */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl mx-auto text-xl sm:text-2xl mb-12 text-gray-300 leading-relaxed"
        >
          {t('hero.subtitle')}{' '}
          <span className="text-accent font-semibold">{t('hero.excellence')}</span> et{' '}
          <span className="text-primary font-semibold">{t('hero.reliability')}</span>.
        </motion.p>

        {/* CTA buttons with hover effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link href="/products">
            <motion.span
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(217,44,58,0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-primary hover:bg-red-600 text-white font-semibold py-4 px-10 rounded-full transition-all cursor-pointer group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('hero.exploreProducts')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </motion.span>
          </Link>

          <Link href="/contact">
            <motion.span
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold py-4 px-10 rounded-full transition-all cursor-pointer"
            >
              {t('hero.requestQuote')}
            </motion.span>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center text-white/60"
          >
            <span className="text-xs uppercase tracking-wider mb-2">{t('hero.scroll')}</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative elements - animated lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent z-30"
      />
    </section>
  );
}
