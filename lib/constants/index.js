/**
 * Application Constants
 * Centralized configuration for the entire application
 */

// Site metadata
export const SITE_CONFIG = {
  name: 'NOVITECH.sn',
  description: 'UNE NOUVELLE VISION DE LA TECHNOLOGIE',
  url: 'https://novitech.sn',
  locale: 'fr_SN',
  twitter: '@novitechsn',
};

// Contact information
export const CONTACT_INFO = {
  email: 'novitech@hotmail.fr',
  phone: '+221 78 421 20 20',
  address: {
    street: 'Rufisque Est Arafat',
    city: 'Rufisque',
    country: 'Sénégal',
    postalCode: '',
  },
  ninea: '006286216 SN DKR 2017 A 6640',
  accountNumber: '03723410007',
  social: {
    linkedin: 'https://linkedin.com/company/novitechsn',
    twitter: 'https://twitter.com/novitechsn',
    facebook: 'https://facebook.com/novitechsn',
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
    DEFAULT: '#d92c3a', // primary CTA
    DEFAULT_HSL: '355 69% 51%', // approximate H S L for #d92c3a
    DEFAULT_HSL_CSS: 'hsl(var(--primary))', // CSS-friendly token
    dark: '#b82430',
    light: '#e85a65',
  },
  secondary: {
    DEFAULT: '#060010',
    light: '#1f2937',
  },
  accent: {
    DEFAULT: '#f7a80d',
    DEFAULT_HSL: '40 94% 51%',
    DEFAULT_HSL_CSS: 'hsl(var(--accent))',
    light: '#fbbf24',
  },
  neutral: {
    DEFAULT: '#f5f5f5',
    dark: '#e2e8f0',
  },
};
