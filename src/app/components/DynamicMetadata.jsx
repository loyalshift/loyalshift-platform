'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from '../../i18n/useTranslation';

const pathToKey = {
  '/': 'home',
  '/about': 'about',
  '/solutions': 'solutions',
  '/contact': 'contact',
  '/case-studies': 'caseStudies',
};

export default function DynamicMetadata() {
  const { t } = useTranslation();
  const pathname = usePathname();

  useEffect(() => {
    const key = pathToKey[pathname];
    if (key && t.metadata[key]) {
      const meta = t.metadata[key];
      document.title = meta.title;
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) descTag.setAttribute('content', meta.description);
    }
  }, [t, pathname]);

  return null;
}
