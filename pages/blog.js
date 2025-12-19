import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { GridPattern } from '@/components/backgrounds';
import Section from '@/components/Section';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/i18n';

export default function BlogPage() {
  const { t } = useLanguage();

  const posts = [
    {
      slug: 'choosing-right-ppe',
      titleKey: 'blog.posts.choosingPpe.title',
      excerptKey: 'blog.posts.choosingPpe.excerpt',
      category: t('blog.categories.ppeCategory'),
      date: '15 Déc 2024',
      readTime: '5',
      color: 'from-red-500 to-orange-500',
    },
    {
      slug: 'electrical-safety-best-practices',
      titleKey: 'blog.posts.electricalSafety.title',
      excerptKey: 'blog.posts.electricalSafety.excerpt',
      category: t('blog.categories.electricalCategory'),
      date: '10 Déc 2024',
      readTime: '7',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      slug: 'optimising-supply-chains',
      titleKey: 'blog.posts.supplyChains.title',
      excerptKey: 'blog.posts.supplyChains.excerpt',
      category: t('blog.categories.logisticsCategory'),
      date: '5 Déc 2024',
      readTime: '6',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="relative min-h-screen bg-neutral">
      <GridPattern />
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
            {t('nav.blog').toUpperCase()}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {t('blog.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {t('blog.description')}
          </motion.p>
        </div>
      </div>

      {/* Blog Posts */}
      <Section id="blog-posts">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden h-full flex flex-col">
                  {/* Image placeholder */}
                  <div className={`h-48 bg-gradient-to-br ${post.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-20 h-20 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    {/* Category badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-secondary text-sm font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime} min {t('blog.readTime')}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                      {t(post.titleKey)}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 flex-1">
                      {t(post.excerptKey)}
                    </p>
                    
                    <div className="flex items-center text-primary font-semibold group-hover:text-accent transition-colors">
                      <span>{t('blog.readMore')}</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-br from-secondary to-secondary/95 py-20">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            {t('blog.newsletterTitle').split(' ')[0]} <span className="text-primary">{t('blog.newsletterTitle').split(' ')[1]}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            {t('blog.newsletterDesc')}
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder={t('blog.emailPlaceholder')}
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white py-4 px-8 rounded-full font-semibold hover:bg-red-700 transition-all"
            >
              {t('blog.subscribeBtn')}
            </motion.button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
