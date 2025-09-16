
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TranslatorInput } from './components/TranslatorInput';
import { TranslationCard } from './components/TranslationCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WelcomeMessage } from './components/WelcomeMessage';
import type { Translation } from './types';
import { translateText } from './services/geminiService';
import { TARGET_LANGUAGES } from './constants';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some Korean text to translate.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTranslations([]);

    try {
      const result = await translateText(inputText);
      // Ensure the order of translations matches TARGET_LANGUAGES
      const sortedResults = TARGET_LANGUAGES.map(langInfo => {
        const found = result.find(t => t.language.toLowerCase() === langInfo.name.toLowerCase());
        return found || { language: langInfo.name, translation: 'Translation not available' };
      });
      setTranslations(sortedResults);
    } catch (err) {
      console.error(err);
      setError('Failed to get translations. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <Header />
      <main className="w-full max-w-4xl mx-auto flex flex-col gap-8 mt-8">
        <TranslatorInput
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onTranslate={handleTranslate}
          isLoading={isLoading}
        />

        {error && <ErrorMessage message={error} />}
        
        {isLoading && <LoadingSpinner />}

        {!isLoading && !error && translations.length === 0 && <WelcomeMessage />}

        {!isLoading && translations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {translations.map((translation) => {
              const langInfo = TARGET_LANGUAGES.find(l => l.name.toLowerCase() === translation.language.toLowerCase());
              return (
                <TranslationCard
                  key={translation.language}
                  translation={translation}
                  flagComponent={langInfo?.flagComponent}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
