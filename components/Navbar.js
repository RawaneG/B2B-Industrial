import Link from 'next/link';
import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

/**
 * A responsive navigation bar for the NOVITECH.sn application with language switcher.
 * OPTIMIZED: Memoized navigation links and components
 */
export default memo(function Navbar() {
  const { t, locale, switchLanguage, availableLocales } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoize navLinks to prevent recreation on every render
  const navLinks = useMemo(
    () => [
      { href: '/about', label: t('nav.about') },
      { href: '/services', label: t('nav.services') },
      { href: '/products', label: t('nav.products') },
      { href: '/projects', label: t('nav.projects') },
      { href: '/blog', label: t('nav.blog') },
      { href: '/contact', label: t('nav.contact') },
    ],
    [t]
  );

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-xl z-50 shadow-lg shadow-black/20" style={{ background: 'var(--nav-bg)', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="text-[hsl(var(--text-on-dark))] font-bold text-xl tracking-tight hover:text-[hsl(var(--accent))] transition-colors">
              NOVITECH<span style={{ color: 'hsl(var(--primary))' }}>.sn</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-[hsl(var(--text-on-dark))]/90 hover:text-[hsl(var(--text-on-dark))] font-medium text-sm transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-3/4 rounded-full" style={{ background: 'hsl(var(--accent))' }} />
            </Link>
          ))}

          {/* Language Switcher */}
            <div className="ml-4 flex items-center space-x-1 bg-white/10 rounded-full p-1">
            {availableLocales.map((lang) => (
              <button
                key={lang}
                onClick={() => switchLanguage(lang)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${locale === lang
                    ? 'shadow-md'
                    : ''
                  }`}
                  style={locale === lang ? { background: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' } : { color: 'rgba(255,255,255,0.7)' }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          style={{ color: 'hsl(var(--text-on-dark))' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-xl border-t"
            style={{ background: 'var(--nav-bg)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 hover:bg-white/10 rounded-xl transition-colors font-medium"
                  style={{ color: 'rgba(255,255,255,0.95)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2 px-4 pt-4 border-t border-white/10 mt-4">
                <span className="text-[rgba(255,255,255,0.6)] text-sm">{t('nav.language')}:</span>
                {availableLocales.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      switchLanguage(lang);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all`}
                    style={locale === lang ? { background: 'hsl(var(--accent))', color: 'white' } : { color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.06)' }}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});