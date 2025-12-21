import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Aurora } from '@/components/backgrounds';
import Section from '@/components/Section';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/i18n';

export default function ProjectsPage() {
 const { t } = useLanguage();

 const projects = [
  {
   slug: 'industrial-plant-safety',
   titleKey: 'projects.project1.title',
   descriptionKey: 'projects.project1.description',
   image: 'industrial',
   category: t('projects.categories.industry'),
   year: '2024',
   color: 'from-red-500 to-orange-500',
  },
  {
   slug: 'construction-site-electrical',
   titleKey: 'projects.project2.title',
   descriptionKey: 'projects.project2.description',
   image: 'construction',
   category: t('projects.categories.construction'),
   year: '2024',
   color: 'from-blue-500 to-cyan-500',
  },
  {
   slug: 'oil-gas-maintenance',
   titleKey: 'projects.project3.title',
   descriptionKey: 'projects.project3.description',
   image: 'oil-gas',
   category: t('projects.categories.oilGas'),
   year: '2023',
   color: 'from-green-500 to-emerald-500',
  },
 ];

 const stats = [
  { value: '50+', label: t('projects.stats.projectsCompleted') },
  { value: '30+', label: t('projects.stats.industrialClients') },
  { value: '100%', label: t('projects.stats.clientSatisfaction') },
  { value: '15+', label: t('projects.stats.sectorsCovered') },
 ];

 return (
  <div className="relative min-h-screen bg-neutral">
   <Aurora />
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
      {t('nav.projects').toUpperCase()}
     </motion.span>
     <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
     >
      {t('projects.title')}
     </motion.h1>
     <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-xl text-gray-300 max-w-2xl mx-auto"
     >
      {t('projects.description')}
     </motion.p>
    </div>
   </div>

   {/* Stats Section */}
   <div className="bg-white py-12 border-b border-gray-100">
    <div className="container-custom">
     <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
       <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="text-center"
       >
        <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
        <div className="text-gray-600">{stat.label}</div>
       </motion.div>
      ))}
     </div>
    </div>
   </div>

   {/* Projects Grid */}
   <Section id="projects-grid">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
     {projects.map((project, index) => (
      <Link key={project.slug} href={`/projects/${project.slug}`} passHref legacyBehavior>
       <motion.a
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group block cursor-pointer"
       >
        <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
         {/* Image placeholder */}
         <div className={`h-64 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
           <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
           </svg>
          </div>
          {/* Year badge */}
          <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-secondary text-sm font-semibold rounded-full">
           {project.year}
          </span>
          {/* Category badge */}
          <span className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
           {project.category}
          </span>
         </div>

         {/* Content */}
         <div className="p-8">
          <h3 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
           {t(project.titleKey)}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
           {t(project.descriptionKey)}
          </p>
          <span className="flex items-center text-primary font-semibold group-hover:text-accent transition-colors">
           <span>{t('projects.learnMore')}</span>
           <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
           </svg>
          </span>
         </div>
        </div>
       </motion.a>
      </Link>
     ))}
    </div>
   </Section>

   {/* CTA Section */}
   <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-20">
    <div className="container-custom text-center">
     <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl font-bold text-secondary mb-6"
     >
      {t('projects.ctaTitle').split(' ').slice(0, -1).join(' ')} <span className="text-primary">{t('projects.ctaTitle').split(' ').slice(-1)}</span> ?
     </motion.h2>
     <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto"
     >
      {t('projects.ctaDesc')}
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
