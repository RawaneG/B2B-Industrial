import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Aurora } from '@/components/backgrounds';
import Section from '@/components/Section';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/i18n';

export default function ProjectDetailPage() {
 const router = useRouter();
 const { slug } = router.query;
 const { t } = useLanguage();

 const projectData = {
  'industrial-plant-safety': {
   titleKey: 'projects.project1.title',
   descriptionKey: 'projects.project1.description',
   fullDescriptionKey: 'projectDetails.project1.fullDescription',
   challengeKey: 'projectDetails.project1.challenge',
   solutionKey: 'projectDetails.project1.solution',
   resultsKey: 'projectDetails.project1.results',
   category: 'projects.categories.industry',
   year: '2024',
   duration: 'projectDetails.project1.duration',
   client: 'projectDetails.project1.client',
   color: 'from-red-500 to-orange-500',
   icon: (
    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
   ),
  },
  'construction-site-electrical': {
   titleKey: 'projects.project2.title',
   descriptionKey: 'projects.project2.description',
   fullDescriptionKey: 'projectDetails.project2.fullDescription',
   challengeKey: 'projectDetails.project2.challenge',
   solutionKey: 'projectDetails.project2.solution',
   resultsKey: 'projectDetails.project2.results',
   category: 'projects.categories.construction',
   year: '2024',
   duration: 'projectDetails.project2.duration',
   client: 'projectDetails.project2.client',
   color: 'from-blue-500 to-cyan-500',
   icon: (
    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
   ),
  },
  'oil-gas-maintenance': {
   titleKey: 'projects.project3.title',
   descriptionKey: 'projects.project3.description',
   fullDescriptionKey: 'projectDetails.project3.fullDescription',
   challengeKey: 'projectDetails.project3.challenge',
   solutionKey: 'projectDetails.project3.solution',
   resultsKey: 'projectDetails.project3.results',
   category: 'projects.categories.oilGas',
   year: '2023',
   duration: 'projectDetails.project3.duration',
   client: 'projectDetails.project3.client',
   color: 'from-green-500 to-emerald-500',
   icon: (
    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
   ),
  },
 };

 const project = projectData[slug];

 if (!project && slug) {
  return (
   <div className="relative min-h-screen bg-neutral">
    <Aurora />
    <Navbar />
    <div className="pt-32 container-custom text-center">
     <h1 className="text-4xl font-bold text-secondary mb-4">{t('projectDetails.notFound')}</h1>
     <Link href="/projects" className="text-primary hover:underline">
      ← {t('projectDetails.backToProjects')}
     </Link>
    </div>
    <Footer />
   </div>
  );
 }

 const results = project ? t(project.resultsKey) : [];

 return (
  <div className="relative min-h-screen bg-neutral">
   <Aurora />
   <Navbar />

   {/* Hero Section */}
   <div className={`relative pt-32 pb-20 bg-gradient-to-br ${project?.color || 'from-primary to-accent'}`}>
    <div className="container-custom">
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
     >
      <Link href="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
       <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
       </svg>
       {t('projectDetails.backToProjects')}
      </Link>
     </motion.div>

     <div className="grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
       initial={{ opacity: 0, x: -30 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.6, delay: 0.1 }}
       className="relative"
      >
       <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
        <div className="text-white/50">
         {project?.icon}
        </div>
       </div>
      </motion.div>

      <motion.div
       initial={{ opacity: 0, x: 30 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.6, delay: 0.2 }}
       className="text-white"
      >
       <div className="flex flex-wrap gap-3 mb-4">
        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
         {project ? t(project.category) : ''}
        </span>
        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
         {project?.year}
        </span>
       </div>
       <h1 className="text-4xl sm:text-5xl font-bold mb-6">
        {project ? t(project.titleKey) : ''}
       </h1>
       <p className="text-xl text-white/90 leading-relaxed mb-8">
        {project ? t(project.descriptionKey) : ''}
       </p>

       {/* Project Info */}
       <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
         <p className="text-white/60 text-sm mb-1">{t('projectDetails.client')}</p>
         <p className="text-white font-semibold">{project ? t(project.client) : ''}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
         <p className="text-white/60 text-sm mb-1">{t('projectDetails.duration')}</p>
         <p className="text-white font-semibold">{project ? t(project.duration) : ''}</p>
        </div>
       </div>
      </motion.div>
     </div>
    </div>
   </div>

   {/* Full Description */}
   <Section id="overview">
    <div className="max-w-4xl mx-auto">
     <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
     >
      <h2 className="text-3xl font-bold text-secondary mb-6">{t('projectDetails.overview')}</h2>
      <p className="text-gray-700 text-lg leading-relaxed">
       {project ? t(project.fullDescriptionKey) : ''}
      </p>
     </motion.div>
    </div>
   </Section>

   {/* Challenge & Solution */}
   <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
    <div className="container-custom">
     <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Challenge */}
      <motion.div
       initial={{ opacity: 0, x: -30 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true }}
       className="bg-white rounded-3xl p-8 shadow-lg"
      >
       <div className={`w-16 h-16 bg-gradient-to-br ${project?.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
       </div>
       <h3 className="text-2xl font-bold text-secondary mb-4">{t('projectDetails.challenge')}</h3>
       <p className="text-gray-700 text-lg leading-relaxed">
        {project ? t(project.challengeKey) : ''}
       </p>
      </motion.div>

      {/* Solution */}
      <motion.div
       initial={{ opacity: 0, x: 30 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true }}
       className="bg-white rounded-3xl p-8 shadow-lg"
      >
       <div className={`w-16 h-16 bg-gradient-to-br ${project?.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
       </div>
       <h3 className="text-2xl font-bold text-secondary mb-4">{t('projectDetails.solution')}</h3>
       <p className="text-gray-700 text-lg leading-relaxed">
        {project ? t(project.solutionKey) : ''}
       </p>
      </motion.div>
     </div>
    </div>
   </div>

   {/* Results Section */}
   <Section
    id="results"
    title={t('projectDetails.resultsTitle')}
    description={t('projectDetails.resultsDesc')}
   >
    <div className="max-w-4xl mx-auto">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.isArray(results) && results.map((result, index) => (
       <motion.div
        key={`result-${index}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex items-start gap-4"
       >
        <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${project?.color} rounded-xl flex items-center justify-center text-white`}>
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
         </svg>
        </div>
        <p className="text-gray-700 font-medium">{result}</p>
       </motion.div>
      ))}
     </div>
    </div>
   </Section>

   {/* CTA Section */}
   <Section id="cta">
    <motion.div
     initial={{ opacity: 0, y: 30 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true }}
     className={`bg-gradient-to-br ${project?.color} rounded-3xl p-8 md:p-12 text-center text-white`}
    >
     <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('projectDetails.ctaTitle')}</h2>
     <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">{t('projectDetails.ctaDesc')}</p>
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
       href="/projects"
       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
       className="inline-block bg-transparent border-2 border-white text-white py-4 px-10 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
      >
       {t('projectDetails.viewAllProjects')}
      </motion.a>
     </div>
    </motion.div>
   </Section>

   <Footer />
  </div>
 );
}
