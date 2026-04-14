'use client';

import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { getDict, defaultLocale } from './index';

const fallback = {
  locale: defaultLocale,
  setLocale: () => {},
  t: getDict(defaultLocale),
};

export function useTranslation() {
  const context = useContext(LanguageContext);
  return context || fallback;
}
