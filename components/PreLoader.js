'use client';
import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { translations } from '@/lib/i18n';

/**
 * PreLoader component using the same curve transition animation
 * Shows on initial page load and refresh
 */

// Storage key for language preference (must match LanguageContext)
const STORAGE_KEY = 'b2b_locale';

// Get initial loading text from localStorage
const getInitialLoadingText = () => {
  if (typeof window !== 'undefined') {
    const storedLocale = localStorage.getItem(STORAGE_KEY) || 'fr';
    return translations[storedLocale]?.preloader?.title || 'Chargement';
  }
  return 'Chargement';
};

// Animation helper
const anim = (variants) => ({
  variants,
  initial: 'initial',
  animate: 'animate',
});

// Text animation variants
const text = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    top: -100,
    transition: { duration: 0.5, delay: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

// Curve path animation
const curve = (initialPath, targetPath) => ({
  initial: {
    d: initialPath,
  },
  animate: {
    d: targetPath,
    transition: { duration: 0.5, delay: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
});

// SVG translate animation
const translate = {
  initial: {
    top: '-300px',
  },
  animate: {
    top: '-100vh',
    transition: { duration: 0.5, delay: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function PreLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [loadingText] = useState(() => getInitialLoadingText());
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null,
  });

  // Ensure client-side only rendering to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();

    window.addEventListener('resize', resize, { passive: true });
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    // Hide preloader after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'unset';
    }, 1200); // Duration: 500ms delay + 500ms animation + 200ms buffer

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Don't render anything on server or after loading is complete
  if (!isMounted || !isLoading) return null;

  return (
    <>
      {/* Background fallback while dimensions load */}
      <div
        style={{ opacity: dimensions.width == null ? 1 : 0 }}
        className="preloader-background"
      />

      {/* Loading text - centered */}
      <motion.p
        className="preloader-text"
        {...anim(text)}
        style={{ willChange: 'opacity, top' }}
      >
        {loadingText}
      </motion.p>

      {/* SVG curve */}
      {dimensions.width != null && <SvgCurve {...dimensions} />}
    </>
  );
}

// Memoize SvgCurve to prevent unnecessary re-renders
const SvgCurve = memo(({ height, width }) => {
  const initialPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;

  const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 0
  `;

  return (
    <motion.svg
      className="preloader-svg"
      {...anim(translate)}
      style={{ willChange: 'top' }}
    >
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
});
