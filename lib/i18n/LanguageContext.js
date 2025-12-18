import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

// Storage key for persisting language preference
const STORAGE_KEY = 'b2b_locale';

export function LanguageProvider({ children }) {
  // Initialize with stored preference or default to French
  const [locale, setLocale] = useState('fr');

  // Hydrate from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && translations[stored]) {
        setLocale(stored);
      }
    }
  }, []);

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
      // Persist preference
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, newLocale);
      }
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    locale,
    t,
    switchLanguage,
    availableLocales: Object.keys(translations),
    isRTL: false, // Add RTL support if needed in the future
  }), [locale, t, switchLanguage]);

  return (
    <LanguageContext.Provider value={contextValue}>
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
