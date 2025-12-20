'use client';
import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useLanguage } from '@/lib/i18n';

/**
 * Page transition inspired by olivierlarose/nextjs-framer-page-transition
 * Curved overlay with route name display
 * OPTIMIZED: Reduced animation duration, memoized components, will-change CSS, i18n support
 */

// Route translation keys
const routeKeys = {
  '/': 'routes.home',
  '/about': 'routes.about',
  '/contact': 'routes.contact',
  '/products': 'routes.products',
  '/services': 'routes.services',
  '/blog': 'routes.blog',
  '/careers': 'routes.careers',
  '/legal': 'routes.legal',
  '/projects': 'routes.projects',
};

const getRouteKey = (route) => {
  if (routeKeys[route]) return routeKeys[route];
  const basePath = '/' + route.split('/')[1];
  if (routeKeys[basePath]) return routeKeys[basePath];
  return 'routes.page';
};

// Animation helper
const anim = (variants) => ({
  variants,
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
});

// Text animation variants - OPTIMIZED: Reduced duration
const text = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
    top: -100,
    transition: { duration: 0.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: { top: '47.5%' },
  },
  exit: {
    opacity: 1,
    top: '40%',
    transition: { duration: 0.35, delay: 0.25, ease: [0.33, 1, 0.68, 1] },
  },
};

// Curve path animation - OPTIMIZED: Reduced duration
const curve = (initialPath, targetPath) => ({
  initial: {
    d: initialPath,
  },
  enter: {
    d: targetPath,
    transition: { duration: 0.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    d: initialPath,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
});

// SVG translate animation - OPTIMIZED: Reduced duration
const translate = {
  initial: {
    top: '-300px',
  },
  enter: {
    top: '-100vh',
    transition: { duration: 0.5, delay: 0.2, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: {
      top: '100vh',
    },
  },
  exit: {
    top: '-300px',
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function Curve({ children }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null,
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();

    // Debounce resize events for performance
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };

    window.addEventListener('resize', debouncedResize, { passive: true });
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Show transition on initial page load
  useEffect(() => {
    // Trigger initial animation
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Get translated route name
  const routeKey = getRouteKey(router.route);
  const routeName = t(routeKey);

  return (
    <div className="page-curve">
      {/* Background fallback while dimensions load */}
      <div
        style={{ opacity: dimensions.width == null ? 1 : 0 }}
        className="curve-background"
      />

      {/* Route name text - centered */}
      <motion.p
        className="curve-route"
        {...anim(text)}
        style={{ willChange: 'opacity, top' }}
      >
        {routeName}
      </motion.p>

      {/* SVG curve */}
      {dimensions.width != null && <SvgCurve {...dimensions} />}

      {/* Page content */}
      {children}
    </div>
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
      className="curve-svg"
      {...anim(translate)}
      style={{ willChange: 'top' }}
    >
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
});

// Also export as PageTransition for compatibility
export { Curve as PageTransition };
