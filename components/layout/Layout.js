import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';
import WebGLParticles from '@/components/WebGLParticles';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Layout component
 * Provides consistent structure for all pages
 */
export default function Layout({
  children,
  title,
  description,
  showParticles = true,
  showFooter = true,
  className = '',
}) {
  const pageTitle = title 
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.name;
  
  const pageDescription = description || SITE_CONFIG.description;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={SITE_CONFIG.locale} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE_CONFIG.twitter} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`relative min-h-screen bg-neutral ${className}`}>
        {showParticles && <WebGLParticles />}
        <Navbar />
        
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {showFooter && <Footer />}
      </div>
    </>
  );
}
