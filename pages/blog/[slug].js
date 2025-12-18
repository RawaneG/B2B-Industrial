import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import WebGLParticles from '@/components/WebGLParticles';
import Section from '@/components/Section';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/i18n';

export default function BlogArticlePage() {
  const router = useRouter();
  const { slug } = router.query;
  const { t } = useLanguage();

  const articleData = {
    'choosing-right-ppe': {
      titleKey: 'blog.posts.choosingPpe.title',
      contentKey: 'blog.posts.choosingPpe.content',
      category: 'EPI',
      date: '15 Déc 2024',
      readTime: '5 min',
      color: 'from-red-500 to-orange-500',
    },
    'electrical-safety-best-practices': {
      titleKey: 'blog.posts.electricalSafety.title',
      contentKey: 'blog.posts.electricalSafety.content',
      category: 'Électrique',
      date: '10 Déc 2024',
      readTime: '7 min',
      color: 'from-blue-500 to-cyan-500',
    },
    'optimising-supply-chains': {
      titleKey: 'blog.posts.supplyChains.title',
      contentKey: 'blog.posts.supplyChains.content',
      category: 'Logistique',
      date: '5 Déc 2024',
      readTime: '6 min',
      color: 'from-green-500 to-emerald-500',
    },
  };

  const article = articleData[slug];

  if (!article && slug) {
    return (
      <div className="relative min-h-screen bg-neutral">
        <WebGLParticles />
        <Navbar />
        <div className="pt-32 container-custom text-center">
          <h1 className="text-4xl font-bold text-secondary mb-4">Article non trouvé</h1>
          <Link href="/blog" className="text-primary hover:underline">
            ← Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-neutral">
      <WebGLParticles />
      <Navbar />
      
      {/* Hero Section */}
      <div className={`relative pt-32 pb-20 bg-gradient-to-br ${article?.color || 'from-primary to-accent'}`}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour au blog
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
              {article?.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {article ? t(article.titleKey) : ''}
            </h1>
            <div className="flex items-center gap-4 text-white/80">
              <span>{article?.date}</span>
              <span>•</span>
              <span>{article?.readTime} de lecture</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <Section id="article-content">
        <div className="max-w-3xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {article ? t(article.contentKey) : ''}
              </p>
              
              <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Points clés à retenir</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Évaluez systématiquement les risques avant de sélectionner l'équipement.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Choisissez des produits certifiés conformes aux normes internationales.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Assurez-vous d'un ajustement correct et d'un entretien régulier.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Formez vos équipes à l'utilisation correcte des équipements.</span>
                </li>
              </ul>
              
              <h2 className="text-2xl font-bold text-secondary mt-8 mb-4">Conclusion</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                La sécurité au travail ne doit jamais être compromise. En investissant dans des équipements de qualité
                et en suivant les meilleures pratiques, vous protégez non seulement vos employés mais aussi votre entreprise.
                N'hésitez pas à nous contacter pour des conseils personnalisés.
              </p>
            </div>
          </motion.article>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 mt-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
                B2B
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary mb-1">Équipe B2B Solutions</h3>
                <p className="text-gray-600">
                  Experts en équipements de protection et solutions industrielles depuis plus de 10 ans.
                </p>
              </div>
            </div>
          </motion.div>
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
            Envie d'en <span className="text-primary">savoir plus</span> ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            Découvrez nos autres articles et restez informé des dernières actualités du secteur.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/blog"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-primary text-white py-4 px-10 rounded-full font-semibold text-lg hover:bg-red-700 transition-all shadow-lg shadow-primary/30"
            >
              Voir tous les articles
            </motion.a>
            <motion.a
              href="/contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white/10 backdrop-blur-md border-2 border-white/30 text-white py-4 px-10 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
            >
              {t('home.contactBtn')}
            </motion.a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}