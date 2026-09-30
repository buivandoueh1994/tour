'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types';
import { TRANSLATIONS } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof TRANSLATIONS.vi) => string;
  isVietnamese: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('vi');

  // Load language preference from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hg_lang') as Language | null;
      if (stored === 'en' || stored === 'vi') {
        setLanguageState(stored);
      }
    } catch (e) {
      console.error('Failed to read language from localStorage:', e);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('hg_lang', lang);
    } catch (e) {
      console.error('Failed to save language to localStorage:', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  const t = (key: keyof typeof TRANSLATIONS.vi): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.vi;
    return (dict as Record<string, string>)[key] || (TRANSLATIONS.vi as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isVietnamese: language === 'vi',
        isEnglish: language === 'en',
      }}
    >
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
