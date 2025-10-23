
import React from 'react';
import { useLocalization } from '../App';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLocalization();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-brand-blue">{t('title')}</h1>
          <p className="text-sm md:text-base text-gray-600">{t('subtitle')}</p>
        </div>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 text-sm font-semibold border-2 border-brand-blue rounded-full text-brand-blue hover:bg-brand-blue hover:text-white transition-colors duration-300"
        >
          {language === 'en' ? 'हिन्दी' : 'English'}
        </button>
      </div>
    </header>
  );
};

export default Header;
