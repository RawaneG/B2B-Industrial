import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from '@/lib/i18n';
import { PageTransition } from '@/components/transitions';

function MyApp({ Component, pageProps, router }) {
  // Wrap pages with AnimatePresence to enable exit animations on route changes.
  // Wrap with LanguageProvider for internationalization with French as default.
  // PageTransition adds a smooth curved overlay effect inspired by dennissnellenberg.com
  return (
    <LanguageProvider>
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={router.route}>
          <Component {...pageProps} />
        </PageTransition>
      </AnimatePresence>
    </LanguageProvider>
  );
}

export default MyApp;