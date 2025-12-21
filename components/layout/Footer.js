import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { CONTACT_INFO, NAV_LINKS } from '@/lib/constants';

/**
 * Footer component
 * Reusable footer for all pages
 */
export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: t('footer.navigation'),
      links: NAV_LINKS.slice(0, 4).map(link => ({
        label: t(`nav.${link.key}`),
        href: link.href,
      })),
    },
    {
      title: t('footer.resources'),
      links: [
        { label: t('nav.blog'), href: '/blog' },
        { label: t('nav.projects'), href: '/projects' },
        { label: t('nav.careers'), href: '/careers' },
        { label: t('nav.legal'), href: '/legal' },
      ],
    },
  ];

  return (
    <footer style={{ background: 'hsl(var(--brand-dark))', color: 'hsl(var(--text-on-dark))' }}>
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold" style={{ color: 'hsl(var(--text-on-dark))' }}>
                NOVITECH<span style={{ color: 'hsl(var(--primary))' }}>.sn</span>
              </span>
            </Link>
            <p className="mb-6 leading-relaxed" style={{ color: 'hsl(var(--muted-on-dark))' }}>
              {t('home.contactInfo').split('|')[0].replace('Email :', '').trim() || 'Équipements industriels et solutions de sécurité pour les professionnels.'}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {Object.entries(CONTACT_INFO.social).map(([key, url]) => (
                <motion.a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
                >
                  <span className="sr-only">{key}</span>
                  <SocialIcon name={key} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--text-on-dark))' }}>{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:transition-colors"
                      style={{ color: 'hsl(var(--muted-on-dark))' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--text-on-dark))' }}>{t('nav.contact')}</h3>
            <ul className="space-y-3" style={{ color: 'hsl(var(--muted-on-dark))' }}>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--accent))' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--accent))' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--accent))' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {CONTACT_INFO.address.city}, {CONTACT_INFO.address.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-on-dark))' }}>
            © {currentYear} NOVITECH.sn. {t('footer.allRightsReserved')}
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/legal" className="hover:transition-colors" style={{ color: 'hsl(var(--muted-on-dark))' }}>
              {t('nav.legal')}
            </Link>
            <Link href="/legal#privacy" className="hover:transition-colors" style={{ color: 'hsl(var(--muted-on-dark))' }}>
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }) {
  // Couleurs officielles des réseaux sociaux (2025)
  const socialColors = {
    linkedin: '#0A66C2',
    twitter: '#000000',
    facebook: '#1877F2',
  };

  const icons = {
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: socialColors.linkedin }}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: socialColors.twitter }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: socialColors.facebook }}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  };
  return icons[name] || null;
}
