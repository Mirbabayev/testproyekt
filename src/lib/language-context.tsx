import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import i18n from 'i18next';

// Dil seçimləri
export const languages = {
  AZ: 'Azərbaycan',
  EN: 'English',
  RU: 'Русский',
  TR: 'Türkçe'
};

export type LanguageCode = keyof typeof languages;

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  languageOptions: LanguageCode[];
  languageNames: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default dil AZ, amma localStorage-dən oxunur əgər mövcuddursa
  const [language, setLanguageState] = useState<LanguageCode>('AZ');

  // Component yükləndikdə local storage-dən dil seçimini oxu
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && Object.keys(languages).includes(savedLanguage)) {
      setLanguageState(savedLanguage as LanguageCode);
      i18n.changeLanguage(savedLanguage.toLowerCase());
    }
  }, []);

  // Dil dəyişdirmə funksiyası
  const setLanguage = (newLanguage: LanguageCode) => {
    setLanguageState(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
    i18n.changeLanguage(newLanguage.toLowerCase());
  };

  // Context value
  const value = {
    language,
    setLanguage,
    languageOptions: Object.keys(languages) as LanguageCode[],
    languageNames: languages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 