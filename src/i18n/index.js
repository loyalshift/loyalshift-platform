import es from './es';
import en from './en';

export const dictionaries = { es, en };
export const defaultLocale = 'es';
export const getDict = (locale) => dictionaries[locale] || dictionaries[defaultLocale];
