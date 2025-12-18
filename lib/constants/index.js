/**
 * Application Constants
 * Centralized configuration for the entire application
 */

// Site metadata
export const SITE_CONFIG = {
  name: 'B2B Solutions',
  description: 'Équipements de protection individuelle et solutions électriques industrielles',
  url: 'https://b2b-solutions.sn',
  locale: 'fr_SN',
  twitter: '@b2bsolutions',
};

// Contact information
export const CONTACT_INFO = {
  email: 'contact@b2b-solutions.com',
  phone: '+221 78 000 00 00',
  address: {
    street: '123 Avenue de la République',
    city: 'Dakar',
    country: 'Sénégal',
    postalCode: '12000',
  },
  social: {
    linkedin: 'https://linkedin.com/company/b2b-solutions',
    twitter: 'https://twitter.com/b2bsolutions',
    facebook: 'https://facebook.com/b2bsolutions',
  },
};

// Navigation links
export const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'products', href: '/products' },
  { key: 'projects', href: '/projects' },
  { key: 'blog', href: '/blog' },
  { key: 'careers', href: '/careers' },
  { key: 'contact', href: '/contact' },
];

// Product categories
export const PRODUCT_CATEGORIES = {
  EPI: {
    id: 'epi',
    translationKey: 'categories.epi',
    gradient: 'from-red-500 to-orange-500',
    icon: 'shield',
  },
  ELECTRICAL: {
    id: 'electrical',
    translationKey: 'categories.electrical',
    gradient: 'from-blue-500 to-cyan-500',
    icon: 'bolt',
  },
};

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

// Transition presets
export const TRANSITIONS = {
  fast: { duration: 0.2 },
  normal: { duration: 0.4 },
  slow: { duration: 0.6 },
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  smooth: { type: 'tween', ease: 'easeInOut', duration: 0.4 },
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Color palette
export const COLORS = {
  primary: {
    DEFAULT: '#d92c3a',
    dark: '#b82430',
    light: '#e85a65',
  },
  secondary: {
    DEFAULT: '#1f2937',
    light: '#374151',
  },
  accent: {
    DEFAULT: '#f7a80d',
    light: '#fbbf24',
  },
  neutral: {
    DEFAULT: '#f5f5f5',
    dark: '#e2e8f0',
  },
};
