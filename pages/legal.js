import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { GridPattern } from '@/components/backgrounds';
import Section from '@/components/Section';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/i18n';

export default function LegalPage() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-neutral">
      <GridPattern />
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20" style={{ background: 'hsl(var(--brand-dark))' }}>
        <div className="container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium tracking-wider mb-6"
          >
            {t('legal.badge')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {t('legal.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {t('legal.description')}
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <Section id="legal-content">
        <div className="max-w-4xl mx-auto">
          {/* Legal Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-secondary">
                {t('legal.legalNoticeTitle')}
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t('legal.legalNoticeContent')}
            </p>
          </motion.div>

          {/* Privacy Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-secondary">
                {t('legal.privacyPolicyTitle')}
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              {t('legal.privacyPolicyContent')}
            </p>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-600">
                {t('legal.contactInfo')}
              </p>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-secondary mb-6">
              {t('legal.additionalInfoTitle').split(' ')[0]} <span className="text-primary">{t('legal.additionalInfoTitle').split(' ')[1]}</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-secondary mb-3">{t('legal.editorTitle')}</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><strong>{t('legal.editorCompany')}:</strong> NOVITECH.sn</li>
                  <li><strong>{t('legal.editorAddress')}:</strong> Rufisque Est Arafat, Sénégal</li>
                  <li><strong>NINEA:</strong> 006286216 SN DKR 2017 A 6640</li>
                  <li><strong>N° Compte:</strong> 03723410007</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-secondary mb-3">{t('legal.hostingTitle')}</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><strong>{t('legal.hostingProvider')}:</strong> Vercel Inc.</li>
                  <li><strong>{t('legal.hostingAddress')}:</strong> San Francisco, CA, USA</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                {t('legal.lastUpdate')} : Décembre 2024
              </p>
            </div>
          </motion.div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
