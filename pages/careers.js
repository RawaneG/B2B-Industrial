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
      titleKey: 'careers.jobs.salesManager.title',
      locationKey: 'careers.jobs.salesManager.location',
      descriptionKey: 'careers.jobs.salesManager.description',
      type: t('careers.jobTypes.cdi'),
      department: t('careers.departments.sales'),
      color: 'from-red-500 to-orange-500',
    },
    {
      titleKey: 'careers.jobs.electricalEngineer.title',
      locationKey: 'careers.jobs.electricalEngineer.location',
      descriptionKey: 'careers.jobs.electricalEngineer.description',
      type: t('careers.jobTypes.cdi'),
      department: t('careers.departments.technical'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      titleKey: 'careers.jobs.warehouseSupervisor.title',
      locationKey: 'careers.jobs.warehouseSupervisor.location',
      descriptionKey: 'careers.jobs.warehouseSupervisor.description',
      type: t('careers.jobTypes.cdi'),
      department: t('careers.departments.logistics'),
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('careers.benefits.salary.title'),
      description: t('careers.benefits.salary.description'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: t('careers.benefits.growth.title'),
      description: t('careers.benefits.growth.description'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: t('careers.benefits.team.title'),
      description: t('careers.benefits.team.description'),
    },
    {
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

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-gradient-to-b from-secondary to-secondary/95">
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

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-secondary text-center mb-12"
          >
            {t('careers.benefitsTitle').split(' ').slice(0, -1).join(' ')} <span className="text-primary">{t('careers.benefitsTitle').split(' ').slice(-1)}</span> ?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-secondary mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <Section
        id="jobs"
        title={t('careers.jobsTitle')}
        description={t('careers.jobsDesc')}
      >
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all flex flex-col md:flex-row md:items-center gap-6">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${job.color} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {job.type}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                      {job.department}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {t(job.titleKey)}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {t(job.descriptionKey)}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t(job.locationKey)}
                  </div>
                </div>

                {/* Action */}
                <motion.a
                  href="mailto:novitech@hotmail.fr"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg shadow-primary/30 whitespace-nowrap"
                >
                  {t('careers.applyNow')}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-secondary to-secondary/95 py-20">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            {t('careers.ctaTitle').split(' ').slice(0, -1).join(' ')} <span className="text-primary">{t('careers.ctaTitle').split(' ').slice(-1)}</span> ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            {t('careers.ctaDesc')}
          </motion.p>
          <motion.a
            href="mailto:novitech@hotmail.fr"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-secondary py-4 px-10 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            {t('careers.spontaneousBtn')}
          </motion.a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
