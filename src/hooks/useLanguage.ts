import { useState, useEffect } from 'react';
import { translations, Translations } from '../i18n/translations';

export type Language = 'it' | 'en';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('it'); // Default to Italian
  const [t, setT] = useState<Translations>(translations.it);

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
      setT(translations[savedLanguage]);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setT(translations[newLanguage]);
    localStorage.setItem('language', newLanguage);
  };

  return {
    language,
    t,
    changeLanguage,
  };
}