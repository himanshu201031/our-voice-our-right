import React, { useState, useEffect } from 'react';
import type { DistrictData } from '../types';
import { generateInsightsSummary } from '../services/geminiService';
import { useLocalization } from '../App';
import { SparklesIcon, VolumeIcon } from './icons';

interface Props {
  data: DistrictData;
}

const Insights: React.FC<Props> = ({ data }) => {
  const { t, language } = useLocalization();
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
    };
    if ('speechSynthesis' in window) {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    // Reset on data change
    setSummary('');
    setError('');
  }, [data]);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await generateInsightsSummary(data, language);
      setSummary(result);
    } catch (err) {
      setError('Failed to generate summary.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window && summary) {
        window.speechSynthesis.cancel(); // Cancel any previous speech
        const utterance = new SpeechSynthesisUtterance(summary.replace(/[*#]/g, ''));
        if (language === 'hi') {
            const hindiVoice = voices.find(voice => voice.lang.startsWith('hi'));
            if (hindiVoice) {
                utterance.voice = hindiVoice;
            }
        }
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{t('insightsTitle')}</h3>
      {!summary && (
        <button
          onClick={handleGenerateSummary}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              <span>{t('generating')}</span>
            </>
          ) : (
            <>
              <SparklesIcon />
              <span>{t('generateSummary')}</span>
            </>
          )}
        </button>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {summary && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg space-y-2">
            {summary.split('\n').map((line, index) => (
                <p key={index} className="text-gray-700">{line}</p>
            ))}
            <button
                onClick={handleSpeak}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-sm font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
                aria-label={t('readAloud')}
            >
                <VolumeIcon />
                {t('readAloud')}
            </button>
        </div>
      )}
    </div>
  );
};

export default Insights;