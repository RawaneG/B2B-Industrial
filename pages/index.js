import { useState } from 'react';
import { motion } from 'framer-motion';
import WebGLParticles from '@/components/WebGLParticles';
import Navbar from '@/components/Navbar';
import PremiumHero from '@/components/PremiumHero';
import Section from '@/components/Section';
import FeatureCard from '@/components/FeatureCard';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/lib/i18n';

function CategoriesTabs() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('EPI');
  
  const tabs = [
    { id: 'EPI', label: t('categories.epi') },
    { id: 'Electrical', label: t('categories.electrical') },
  ];

  return (
    <div className="mt-8">
      <div className="flex justify-center gap-4 mb-10">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`py-3 px-8 rounded-full font-semibold transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'bg-white text-secondary border-2 border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>
      
      {activeTab === 'EPI' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ProductCard
            name={t('products.safetyShoes.name')}
            category={t('categories.epi')}
            description={t('products.safetyShoes.description')}
            slug="safety-shoes"
            delay={0}
          />
          <ProductCard
            name={t('products.hiVisJacket.name')}
            category={t('categories.epi')}
            description={t('products.hiVisJacket.description')}
            slug="hi-vis-jacket"
            delay={0.1}
          />
          <ProductCard
            name={t('products.gloves.name')}
            category={t('categories.epi')}
            description={t('products.gloves.description')}
            slug="gloves"
            delay={0.2}
          />
        </motion.div>
      )}
      
      {activeTab === 'Electrical' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ProductCard
            name={t('products.circuitBreaker.name')}
            category={t('categories.electrical')}
            description={t('products.circuitBreaker.description')}
            slug="circuit-breaker"
            delay={0}
          />
          <ProductCard
            name={t('products.switchgear.name')}
            category={t('categories.electrical')}
            description={t('products.switchgear.description')}
            slug="switchgear"
            delay={0.1}
          />
          <ProductCard
            name={t('products.cabling.name')}
            category={t('categories.electrical')}
            description={t('products.cabling.description')}
            slug="cabling"
            delay={0.2}
          />
        </motion.div>
      )}
    </div>
  );
}

function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              B2B <span className="text-primary">Solutions</span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              {t('about.content').substring(0, 150)}...
            </p>
            <div className="flex space-x-4">
              {['linkedin', 'twitter', 'facebook'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">{t('nav.products')}</h4>
            <ul className="space-y-2">
              <li><a href="/products" className="text-gray-400 hover:text-white transition-colors">{t('categories.epi')}</a></li>
              <li><a href="/products" className="text-gray-400 hover:text-white transition-colors">{t('categories.electrical')}</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">{t('nav.services')}</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">{t('nav.contact')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@b2b-solutions.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +221 78 000 00 00
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Dakar, Sénégal
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 B2B Solutions. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/legal" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.legal')}</a>
            <a href="/careers" className="text-gray-400 hover:text-white text-sm transition-colors">{t('nav.careers')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="relative">
      <WebGLParticles />
      <Navbar />
      <PremiumHero />
      <main className="mt-0">
        <Section
          id="categories"
          title={t('home.categoriesTitle')}
          description={t('home.categoriesDesc')}
        >
          <CategoriesTabs />
        </Section>
        
        <div className="bg-gradient-to-br from-gray-50 to-white">
          <Section
            id="features"
            title={t('home.whyChooseTitle')}
            description={t('home.whyChooseDesc')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon="certificate"
                title={t('features.certifiedSafety.title')}
                description={t('features.certifiedSafety.description')}
                delay={0}
              />
              <FeatureCard
                icon="gear"
                title={t('features.industrialExpertise.title')}
                description={t('features.industrialExpertise.description')}
                delay={0.1}
              />
              <FeatureCard
                icon="lightning"
                title={t('features.fastDelivery.title')}
                description={t('features.fastDelivery.description')}
                delay={0.2}
              />
              <FeatureCard
                icon="support"
                title={t('features.technicalSupport.title')}
                description={t('features.technicalSupport.description')}
                delay={0.3}
              />
            </div>
          </Section>
        </div>
        
        <Section
          id="contact"
          title={t('home.contactTitle')}
          description={t('home.contactDesc')}
        >
          <div className="flex flex-col items-center">
            <motion.a 
              href="/contact" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white py-4 px-10 rounded-full mb-6 hover:bg-red-700 transition-all shadow-lg shadow-primary/30 font-semibold text-lg"
            >
              {t('home.contactBtn')}
            </motion.a>
            <p className="text-gray-600 text-center">{t('home.contactInfo')}</p>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}