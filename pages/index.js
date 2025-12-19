import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { PremiumHero } from '@/components/hero';
import { DarkVeil } from '@/components/backgrounds';
import Section from '@/components/Section';
import FeatureCard from '@/components/FeatureCard';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/layout/Footer';
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

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="relative">
      <DarkVeil particleCount={100} speed={0.8} />
      <Navbar />
      <PremiumHero variant="centered" showStats={true} showBadge={true} />
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