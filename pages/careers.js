import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Waves } from '@/components/backgrounds';
import Section from '@/components/Section';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/i18n';

export default function CareersPage() {
  const { t } = useLanguage();

  const jobs = [
    {
      id: 'sales-manager',
      titleKey: 'careers.jobs.salesManager.title',
      locationKey: 'careers.jobs.salesManager.location',
      descriptionKey: 'careers.jobs.salesManager.description',
      typeKey: 'careers.jobTypes.cdi',
      departmentKey: 'careers.departments.sales',
    },
    {
      id: 'electrical-engineer',
      titleKey: 'careers.jobs.electricalEngineer.title',
      locationKey: 'careers.jobs.electricalEngineer.location',
      descriptionKey: 'careers.jobs.electricalEngineer.description',
      typeKey: 'careers.jobTypes.cdi',
      departmentKey: 'careers.departments.technical',
    },
    {
      id: 'warehouse-supervisor',
      titleKey: 'careers.jobs.warehouseSupervisor.title',
      locationKey: 'careers.jobs.warehouseSupervisor.location',
      descriptionKey: 'careers.jobs.warehouseSupervisor.description',
      typeKey: 'careers.jobTypes.cdi',
      departmentKey: 'careers.departments.logistics',
    },
  ];

  const benefits = [
    {
      id: 'salary',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('careers.benefits.salary.title'),
      description: t('careers.benefits.salary.description'),
    },
    {
      id: 'growth',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: t('careers.benefits.growth.title'),
      description: t('careers.benefits.growth.description'),
    },
    {
      id: 'team',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: t('careers.benefits.team.title'),
      description: t('careers.benefits.team.description'),
    },
    {
      id: 'training',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: t('careers.benefits.training.title'),
      description: t('careers.benefits.training.description'),
    },
  ];

  return (
    <div className="relative min-h-screen bg-neutral">
      <Waves />
      <Navbar />

      {/* Hero */}
      <div style={{ background: 'hsl(var(--brand-dark))' }} className="relative pt-32 pb-20">
        <div className="container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium tracking-wider mb-6"
          >
            {t('careers.badge')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {t('careers.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {t('careers.description')}
          </motion.p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white py-16">
        <div className="container-custom">
          <motion.h2 className="text-2xl font-bold text-secondary text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {t('careers.benefitsTitle')}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <div key={b.id} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                  {b.icon}
                </div>
                <h3 className="font-bold text-secondary mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Jobs listing */}
      <Section id="jobs" title={t('careers.openPositions')} description="">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div key={job.id} className="group p-6 border rounded-2xl bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-1">{t(job.titleKey)}</h3>
                    <p className="text-gray-600 text-sm">{t(job.locationKey)}</p>
                  </div>
                  <div className="text-xs px-3 py-1 bg-gray-100 text-gray-600 font-semibold rounded-full">
                    {t(job.typeKey)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{t(job.descriptionKey)}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">{t(job.departmentKey)}</div>
                  <motion.a href="mailto:novitech@hotmail.fr" whileHover={{ scale: 1.03 }} className="bg-primary text-white py-2 px-4 rounded-lg font-semibold">
                    {t('careers.applyNow')}
                  </motion.a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <div style={{ background: 'hsl(var(--brand-dark))' }} className="py-20">
        <div className="container-custom text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {t('careers.ctaTitle')}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {t('careers.ctaDesc')}
          </motion.p>
          <motion.a href="mailto:novitech@hotmail.fr" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} whileHover={{ scale: 1.05 }} className="inline-block bg-white text-secondary py-4 px-10 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg">
            {t('careers.spontaneousBtn')}
          </motion.a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
