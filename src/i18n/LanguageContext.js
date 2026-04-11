'use client';

import { createContext, useState, useEffect, useMemo } from 'react';
import { getDict, defaultLocale } from './index';

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(defaultLocale);

  useEffect(() => {
    const saved = localStorage.getItem('locale');
    if (saved && (saved === 'es' || saved === 'en')) {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = useMemo(() => getDict(locale), [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
