
import React from 'react';

export const WelcomeMessage: React.FC = () => {
  return (
    <div className="text-center py-10 px-6 bg-slate-800 rounded-lg">
      <h2 className="text-2xl font-semibold text-slate-200 mb-2">Welcome to the Multi-Translator!</h2>
      <p className="text-slate-400">
        Enter some Korean text above and click "Translate" to see the magic happen.
      </p>
    </div>
  );
};
