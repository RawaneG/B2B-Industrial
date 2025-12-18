import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from '@/lib/i18n';

function MyApp({ Component, pageProps, router }) {
  // Wrap pages with AnimatePresence to enable exit animations on route changes.
  // Wrap with LanguageProvider for internationalization with French as default.
  return (
    <LanguageProvider>
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </LanguageProvider>
  );
}

export default MyApp;