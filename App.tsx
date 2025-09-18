import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { TranslatorInput } from './components/TranslatorInput';
import { TranslationCard } from './components/TranslationCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WelcomeMessage } from './components/WelcomeMessage';
import { HistoryPanel } from './components/HistoryPanel';
import type { Translation, HistoryItem } from './types';
import { translateText } from './services/geminiService';
import { TARGET_LANGUAGES } from './constants';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false);

  // Load history from local storage on mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('translationHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from local storage", error);
       // If parsing fails, clear the corrupted data
      localStorage.removeItem('translationHistory');
    }
  }, []);

  // Persist history to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('translationHistory', JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history to local storage", error);
    }
  }, [history]);

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

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        koreanText: inputText,
        translations: sortedResults,
        timestamp: new Date().toISOString(),
      };
      // Add to the beginning of the array and keep the last 50 items
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 50));

    } catch (err) {
      console.error(err);
      setError('Failed to get translations. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const handleToggleHistory = () => {
    setIsHistoryVisible(prev => !prev);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setInputText(item.koreanText);
    setTranslations(item.translations);
    setError(null);
    setIsHistoryVisible(false); // Close panel on selection
  };


  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <Header onToggleHistory={handleToggleHistory} />
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
      <HistoryPanel
        isVisible={isHistoryVisible}
        history={history}
        onClose={handleToggleHistory}
        onSelect={handleSelectHistoryItem}
        onClear={handleClearHistory}
      />
    </div>
  );
};

export default App;