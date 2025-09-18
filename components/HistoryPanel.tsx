import React from 'react';
import type { HistoryItem } from '../types';

interface HistoryPanelProps {
  isVisible: boolean;
  history: HistoryItem[];
  onClose: () => void;
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ isVisible, history, onClose, onSelect, onClear }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-title"
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
            <h2 id="history-title" className="text-xl font-bold text-slate-200">Translation History</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
              aria-label="Close history panel"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </header>

          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {history.length === 0 ? (
              <div className="text-center text-slate-400 mt-8">
                <p>Your translation history is empty.</p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors"
                  onClick={() => onSelect(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
                  aria-label={`Select translation for: ${item.koreanText}`}
                >
                  <p className="font-semibold text-slate-300 truncate">{item.koreanText}</p>
                  <p className="text-sm text-slate-500">{new Date(item.timestamp).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>

          {history.length > 0 && (
             <footer className="p-4 border-t border-slate-700 flex-shrink-0">
                <button
                    onClick={onClear}
                    className="w-full px-6 py-2 bg-red-800/80 text-white font-semibold rounded-md hover:bg-red-700 disabled:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
                >
                    Clear History
                </button>
             </footer>
          )}
        </div>
      </aside>
    </>
  );
};
