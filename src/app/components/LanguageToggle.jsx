'use client';

import { motion } from 'framer-motion';
import { FiGlobe } from 'react-icons/fi';
import { useTranslation } from '../../i18n/useTranslation';

export default function LanguageToggle({ className = '' }) {
  const { locale, setLocale } = useTranslation();
  const otherLocale = locale === 'es' ? 'en' : 'es';
  const label = otherLocale.toUpperCase();

  return (
    <motion.button
      onClick={() => setLocale(otherLocale)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-600 hover:border-blue-400/60 text-sm font-medium transition-colors duration-200 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Espa\u00f1ol'}`}
    >
      <FiGlobe className="w-3.5 h-3.5" />
      {label}
    </motion.button>
  );
}
