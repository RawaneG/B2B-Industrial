import { createContext, useContext, useState, useCallback } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Default to French
  const [locale, setLocale] = useState('fr');

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return value || key;
  }, [locale]);

  const switchLanguage = useCallback((newLocale) => {
    if (translations[newLocale]) {
      setLocale(newLocale);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, t, switchLanguage, availableLocales: Object.keys(translations) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
