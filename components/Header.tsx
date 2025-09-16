import React from 'react';

const GlobeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.129a9 9 0 11-2.415 12.016M12 21a9 9 0 00-9-9h18a9 9 0 00-9 9z" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl text-center">
      <div className="flex items-center justify-center gap-3">
        <GlobeIcon />
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
          Korean Multi-Translator
        </h1>
      </div>
      <p className="mt-2 text-slate-400">
        Instantly translate from Korean to 6 different languages.
      </p>
    </header>
  );
};