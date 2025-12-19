import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Waves } from '@/components/backgrounds';
import Section from '@/components/Section';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/i18n';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'novitech@hotmail.fr',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: t('contact.phoneLabel'),
      value: '+221 78 421 20 20',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: t('contact.addressLabel'),
      value: 'Rufisque Est Arafat, Sénégal',
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
            {t('nav.contact').toUpperCase()}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {t('contact.description')}
          </motion.p>
        </div>
      </div>

      {/* Contact Section */}
      <Section id="contact-form">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-secondary mb-6">
                {t('contact.formTitle').split(' ').slice(0, -1).join(' ')} <span className="text-primary">{t('contact.formTitle').split(' ').slice(-1)}</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-secondary font-medium mb-2" htmlFor="name">
                    {t('contact.name')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-secondary font-medium mb-2" htmlFor="email">
                    {t('contact.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-secondary font-medium mb-2" htmlFor="phone">
                    {t('contact.phone')}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t('contact.phonePlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-secondary font-medium mb-2" htmlFor="message">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-red-700 transition-all shadow-lg shadow-primary/30"
                >
                  {t('contact.sendBtn')}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-4">
                {t('contact.infoTitle').split(' ').slice(0, -1).join(' ')} <span className="text-primary">{t('contact.infoTitle').split(' ').slice(-1)}</span>
              </h2>
              <p className="text-gray-600 mb-8">
                {t('contact.infoDesc')}
              </p>
            </div>

            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-1">{info.label}</h3>
                  <p className="text-gray-600">{info.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 h-64 flex items-center justify-center"
            >
              <div className="text-center">
                <svg className="w-16 h-16 text-primary/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-gray-500">{t('contact.mapPlaceholder')}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
