import { useState } from 'react';
import { useLanguage, LanguageCode } from '../lib/language-context';
import { ChevronDown, Globe } from 'lucide-react';

export const LanguageSelector = () => {
  const { language, setLanguage, languageOptions, languageNames } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLanguage: LanguageCode) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-black hover:opacity-50 transition-opacity duration-300"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
          {languageOptions.map((option) => (
            <button
              key={option}
              className={`block w-full text-left px-4 py-2 text-sm ${
                language === option ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handleLanguageChange(option)}
            >
              {languageNames[option]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 