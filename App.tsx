import React, { useState, useEffect, createContext, useContext } from 'react';
import type { Language, DistrictData } from './types';
import { MOCK_DISTRICT_DATA, translations } from './constants';
import Header from './components/Header';
import DistrictSelector from './components/DistrictSelector';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

// Language Context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);
export const useLocalization = () => useContext(LanguageContext)!;

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [districtData, setDistrictData] = useState<DistrictData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const savedDistrictId = localStorage.getItem('selectedDistrictId');
    if (savedDistrictId) {
      handleDistrictSelect(savedDistrictId);
    }
  }, []);

  const handleDistrictSelect = (districtId: string | null) => {
    setIsLoading(true);
    setSelectedDistrictId(districtId);
    if (districtId) {
      // Simulate API call
      setTimeout(() => {
        const data = MOCK_DISTRICT_DATA[districtId];
        setDistrictData(data);
        localStorage.setItem('selectedDistrictId', districtId);
        setIsLoading(false);
      }, 500);
    } else {
      setDistrictData(null);
      localStorage.removeItem('selectedDistrictId');
      setIsLoading(false);
    }
  };

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  };
  
  const languageContextValue = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <div className={`min-h-screen font-sans ${language === 'hi' ? 'font-devanagari' : ''}`}>
        <Header />
        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          <DistrictSelector onDistrictSelect={handleDistrictSelect} selectedDistrictId={selectedDistrictId} />
          <ErrorBoundary>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-blue"></div>
              </div>
            ) : districtData ? (
              <Dashboard data={districtData} />
            ) : (
              <div className="text-center text-gray-500 mt-16 p-8 bg-white/50 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold text-brand-blue">{t('selectDistrictPrompt')}</h2>
              </div>
            )}
          </ErrorBoundary>
        </main>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;