import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { GridPattern } from '@/components/backgrounds';
import Section from '@/components/Section';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/i18n';

export default function ServicesPage() {
 const { t } = useLanguage();

 const services = [
  {
   slug: 'ppe-supply',
   icon: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
   ),
   title: t('services.ppeSupply.title'),
   description: t('services.ppeSupply.description'),
   color: 'from-red-500 to-orange-500',
  },
  {
   slug: 'electrical-supply',
   icon: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
   ),
   title: t('services.electricalSupply.title'),
   description: t('services.electricalSupply.description'),
   color: 'from-blue-500 to-cyan-500',
  },
  {
   slug: 'safety-solutions',
   icon: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
   ),
   title: t('services.safetySolutions.title'),
   description: t('services.safetySolutions.description'),
   color: 'from-green-500 to-emerald-500',
  },
  {
   slug: 'consulting',
   icon: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
   ),
   title: t('services.consulting.title'),
   description: t('services.consulting.description'),
   color: 'from-purple-500 to-pink-500',
  },
 ];

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
      {t('nav.services').toUpperCase()}
     </motion.span>
     <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
     >
      {t('services.title')}
     </motion.h1>
     <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-xl text-gray-300 max-w-2xl mx-auto"
     >
      {t('services.description')}
     </motion.p>
    </div>
   </div>

   {/* Services Grid */}
   <Section id="services-grid">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
     {services.map((service, index) => (
      <Link key={service.slug} href={`/services/${service.slug}`} passHref legacyBehavior>
       <motion.a
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all overflow-hidden cursor-pointer block"
       >
        {/* Gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

        {/* Icon */}
        <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
         {service.icon}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
         {service.title}
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
         {service.description}
        </p>

        {/* Learn More */}
        <span className="inline-flex items-center text-primary font-semibold group-hover:text-accent transition-colors">
         <span>{t('services.learnMore')}</span>
         <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
         </svg>
        </span>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
       </motion.a>
      </Link>
     ))}
    </div>
   </Section>

    {/* CTA Section */}
    <div className="py-20" style={{ background: 'hsl(var(--brand-dark))' }}>
    <div className="container-custom text-center">
     <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl font-bold text-white mb-6"
     >
      {t('services.ctaTitle').split(' ').slice(0, -1).join(' ')} <span className="text-primary">{t('services.ctaTitle').split(' ').slice(-1)}</span> ?
     </motion.h2>
     <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
     >
      {t('services.ctaDesc')}
     </motion.p>
     <motion.a
      href="/contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block bg-primary text-white py-4 px-10 rounded-full font-semibold text-lg hover:bg-red-700 transition-all shadow-lg shadow-primary/30"
     >
      {t('home.contactBtn')}
     </motion.a>
    </div>
   </div>
   <Footer />
  </div>
 );
}
