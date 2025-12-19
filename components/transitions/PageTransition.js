'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

/**
 * Page transition inspired by olivierlarose/nextjs-framer-page-transition
 * Curved overlay with route name display
 */

// Route display names
const routes = {
  '/': 'Accueil',
  '/about': 'À Propos',
  '/contact': 'Contact',
  '/products': 'Produits',
  '/services': 'Services',
  '/blog': 'Blog',
  '/careers': 'Carrières',
  '/legal': 'Mentions Légales',
  '/projects': 'Projets',
};

const getRouteName = (route) => {
  if (routes[route]) return routes[route];
  const basePath = '/' + route.split('/')[1];
  if (routes[basePath]) return routes[basePath];
  return 'Page';
};

// Animation helper
const anim = (variants) => ({
  variants,
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
});

// Text animation variants
const text = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
    top: -100,
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: { top: '47.5%' },
  },
  exit: {
    opacity: 1,
    top: '40%',
    transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] },
  },
};

// Curve path animation
const curve = (initialPath, targetPath) => ({
  initial: {
    d: initialPath,
  },
  enter: {
    d: targetPath,
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    d: initialPath,
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
});

// SVG translate animation
const translate = {
  initial: {
    top: '-300px',
  },
  enter: {
    top: '-100vh',
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: {
      top: '100vh',
    },
  },
  exit: {
    top: '-300px',
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function Curve({ children }) {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null,
  });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="page-curve">
      {/* Background fallback while dimensions load */}
      <div
        style={{ opacity: dimensions.width == null ? 1 : 0 }}
        className="curve-background"
      />
      
      {/* Route name text - centered */}
      <motion.p className="curve-route" {...anim(text)}>
        {getRouteName(router.route)}
      </motion.p>
      
      {/* SVG curve */}
      {dimensions.width != null && <SvgCurve {...dimensions} />}
      
      {/* Page content */}
      {children}
    </div>
  );
}

const SvgCurve = ({ height, width }) => {
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
    <motion.svg className="curve-svg" {...anim(translate)}>
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};

// Also export as PageTransition for compatibility
export { Curve as PageTransition };
