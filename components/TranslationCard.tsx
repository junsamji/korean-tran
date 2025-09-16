
import React, { useState } from 'react';
import type { Translation } from '../types';

interface TranslationCardProps {
  translation: Translation;
  flagComponent?: React.ReactNode;
}

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);


export const TranslationCard: React.FC<TranslationCardProps> = ({ translation, flagComponent }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(translation.translation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800 p-5 rounded-lg shadow-md flex flex-col justify-between relative h-full min-h-[180px]">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {flagComponent}
            <h3 className="text-xl font-bold text-slate-200">{translation.language}</h3>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
            aria-label={`Copy ${translation.language} translation`}
          >
            {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-slate-300 whitespace-pre-wrap">{translation.translation}</p>
      </div>
    </div>
  );
};
