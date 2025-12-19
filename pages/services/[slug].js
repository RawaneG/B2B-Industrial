import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { GridPattern } from '@/components/backgrounds';
import Section from '@/components/Section';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/i18n';

export default function ServiceDetailPage() {
 const router = useRouter();
 const { slug } = router.query;
 const { t } = useLanguage();

 const serviceData = {
  'ppe-supply': {
   titleKey: 'services.ppeSupply.title',
   descriptionKey: 'services.ppeSupply.description',
   fullDescriptionKey: 'serviceDetails.ppeSupply.fullDescription',
   benefitsKey: 'serviceDetails.ppeSupply.benefits',
   processKey: 'serviceDetails.ppeSupply.process',
   color: 'from-red-500 to-orange-500',
   icon: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
   ),
  },
  'electrical-supply': {
   titleKey: 'services.electricalSupply.title',
   descriptionKey: 'services.electricalSupply.description',
   fullDescriptionKey: 'serviceDetails.electricalSupply.fullDescription',
   benefitsKey: 'serviceDetails.electricalSupply.benefits',
   processKey: 'serviceDetails.electricalSupply.process',
   color: 'from-blue-500 to-cyan-500',
   icon: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
   ),
  },
  'safety-solutions': {
   titleKey: 'services.safetySolutions.title',
   descriptionKey: 'services.safetySolutions.description',
   fullDescriptionKey: 'serviceDetails.safetySolutions.fullDescription',
   benefitsKey: 'serviceDetails.safetySolutions.benefits',
   processKey: 'serviceDetails.safetySolutions.process',
   color: 'from-green-500 to-emerald-500',
   icon: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
   ),
  },
  'consulting': {
   titleKey: 'services.consulting.title',
   descriptionKey: 'services.consulting.description',
   fullDescriptionKey: 'serviceDetails.consulting.fullDescription',
   benefitsKey: 'serviceDetails.consulting.benefits',
   processKey: 'serviceDetails.consulting.process',
   color: 'from-purple-500 to-pink-500',
   icon: (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
   ),
  },
 };

 const service = serviceData[slug];

 if (!service && slug) {
  return (
   <div className="relative min-h-screen bg-neutral">
    <GridPattern />
    <Navbar />
    <div className="pt-32 container-custom text-center">
     <h1 className="text-4xl font-bold text-secondary mb-4">{t('serviceDetails.notFound')}</h1>
     <Link href="/services" className="text-primary hover:underline">
      ← {t('serviceDetails.backToServices')}
     </Link>
    </div>
    <Footer />
   </div>
  );
 }

 const benefits = service ? t(service.benefitsKey) : [];
 const process = service ? t(service.processKey) : [];

 return (
  <div className="relative min-h-screen bg-neutral">
   <GridPattern />
   <Navbar />

   {/* Hero Section */}
   <div className={`relative pt-32 pb-20 bg-gradient-to-br ${service?.color || 'from-primary to-accent'}`}>
    <div className="container-custom">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
     >
      <Link href="/services" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
       </svg>
       {t('serviceDetails.backToServices')}
      </Link>
     </motion.div>

     <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
       initial={{ opacity: 0, x: -30 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.6, delay: 0.1 }}
       className="relative"
      >
       <div className="aspect-square max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
        <div className="text-white/70">
         {service?.icon}
        </div>
       </div>
      </motion.div>

      <motion.div
       initial={{ opacity: 0, x: 30 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.6, delay: 0.2 }}
       className="text-white"
      >
       <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
        {t('nav.services')}
       </span>
       <h1 className="text-4xl sm:text-5xl font-bold mb-6">
        {service ? t(service.titleKey) : ''}
       </h1>
       <p className="text-xl text-white/90 leading-relaxed mb-8">
        {service ? t(service.descriptionKey) : ''}
       </p>
       <motion.a
        href="/contact"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block bg-white text-secondary py-4 px-10 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
       >
        {t('hero.requestQuote')}
       </motion.a>
      </motion.div>
     </div>
    </div>
   </div>

   {/* Full Description Section */}
   <Section id="description">
    <div className="max-w-4xl mx-auto">
     <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
     >
      <h2 className="text-3xl font-bold text-secondary mb-6">{t('serviceDetails.aboutService')}</h2>
      <p className="text-gray-700 text-lg leading-relaxed">
       {service ? t(service.fullDescriptionKey) : ''}
      </p>
     </motion.div>
    </div>
   </Section>

   {/* Benefits Section */}
   <Section
    id="benefits"
    title={t('serviceDetails.benefitsTitle')}
    description={t('serviceDetails.benefitsDesc')}
   >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {Array.isArray(benefits) && benefits.map((benefit, index) => (
      <motion.div
       key={`benefit-${index}`}
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ duration: 0.5, delay: index * 0.1 }}
       className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
      >
       <div className={`w-12 h-12 bg-gradient-to-br ${service?.color} rounded-xl flex items-center justify-center text-white mb-4`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
       </div>
       <p className="text-gray-700 font-medium">{benefit}</p>
      </motion.div>
     ))}
    </div>
   </Section>

   {/* Process Section */}
   <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
    <div className="container-custom">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
     >
      <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">{t('serviceDetails.processTitle')}</h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('serviceDetails.processDesc')}</p>
     </motion.div>

     <div className="max-w-4xl mx-auto">
      {Array.isArray(process) && process.map((step, index) => (
       <motion.div
        key={`step-${index}`}
        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex items-start gap-6 mb-8"
       >
        <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${service?.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
         {index + 1}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg flex-grow">
         <p className="text-gray-700 text-lg">{step}</p>
        </div>
       </motion.div>
      ))}
     </div>
    </div>
   </div>

   {/* CTA Section */}
   <Section id="cta">
    <motion.div
     initial={{ opacity: 0, y: 30 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className={`bg-gradient-to-br ${service?.color} rounded-3xl p-8 md:p-12 text-center text-white`}
    >
     <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('serviceDetails.ctaTitle')}</h2>
     <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">{t('serviceDetails.ctaDesc')}</p>
     <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <motion.a
       href="/contact"
       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
       className="inline-block bg-white text-secondary py-4 px-10 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
      >
       {t('home.contactBtn')}
      </motion.a>
      <motion.a
       href="/services"
       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
       className="inline-block bg-transparent border-2 border-white text-white py-4 px-10 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
      >
       {t('serviceDetails.viewAllServices')}
      </motion.a>
     </div>
    </motion.div>
   </Section>

   <Footer />
  </div>
 );
}
