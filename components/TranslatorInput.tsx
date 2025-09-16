
import React from 'react';

interface TranslatorInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTranslate: () => void;
  isLoading: boolean;
}

export const TranslatorInput: React.FC<TranslatorInputProps> = ({ value, onChange, onTranslate, isLoading }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full flex flex-col gap-4">
      <label htmlFor="korean-text" className="text-lg font-semibold text-slate-300">
        Enter Korean Text
      </label>
      <textarea
        id="korean-text"
        value={value}
        onChange={onChange}
        placeholder="여기에 번역할 한국어 텍스트를 입력하세요..."
        className="w-full h-36 p-4 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onTranslate}
        disabled={isLoading || !value.trim()}
        className="w-full sm:w-auto self-end px-8 py-3 bg-cyan-600 text-white font-bold rounded-md hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </button>
    </div>
  );
};
