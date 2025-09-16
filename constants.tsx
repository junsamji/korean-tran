import React from 'react';
import type { TargetLanguage } from './types';

const USFlag: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" className="w-6 h-6 rounded"><path fill="#b22234" d="M0 0h7410v3900H0z"/><path stroke="#fff" strokeWidth="300" d="M0 450h7410M0 1050h7410M0 1650h7410M0 2250h7410M0 2850h7410M0 3450h7410"/><path fill="#3c3b6e" d="M0 0h2964v2100H0z"/><g fill="#fff"><g id="d"><g id="c"><g id="b"><path id="a" d="M247 90l70 215-182-133h224L95 305z"/><use href="#a" x="494"/><use href="#a" x="988"/><use href="#a" x="1482"/><use href="#a" x="1976"/><use href="#a" x="2470"/></g><use href="#b" y="210"/></g><use href="#c" y="420"/></g><use href="#d" y="840"/></g></svg>
);
const JapanFlag: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-6 h-6 rounded"><path fill="#fff" d="M0 0h900v600H0z"/><circle fill="#bc002d" cx="450" cy="300" r="180"/></svg>
);
const ChinaFlag: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-6 h-6 rounded"><path fill="#de2910" d="M0 0h900v600H0z"/><path fill="#ffde00" d="M150 150l45.2-139.2L240.4 150l-148.1-90.8h185.3zm150 0l22.6-69.6 22.6 69.6-74-45.4h90.7zm0 100l22.6-69.6 22.6 69.6-74-45.4h90.7zm-50 150l22.6-69.6 22.6 69.6-74-45.4h90.7zM150 300l22.6-69.6 22.6 69.6-74-45.4h90.7z"/></svg>
);
const VietnamFlag: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-6 h-6 rounded"><path fill="#da251d" d="M0 0h900v600H0z"/><path fill="#ff0" d="M450 300l-106 77.3 40.5-125L278.4 175h131L450 50l40.5 125h131L515.5 252.3l40.5 125z"/></svg>
);
const GermanyFlag: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-6 h-6 rounded"><path d="M0 0h5v3H0z"/><path fill="#D00" d="M0 1h5v2H0z"/><path fill="#FFCE00" d="M0 2h5v1H0z"/></svg>
);
const ThailandFlag: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-6 h-6 rounded">
        <path fill="#a51931" d="M0 0h900v600H0z"/>
        <path fill="#f4f5f8" d="M0 100h900v400H0z"/>
        <path fill="#2d2a4a" d="M0 200h900v200H0z"/>
    </svg>
);

export const TARGET_LANGUAGES: TargetLanguage[] = [
  { name: 'English', flagComponent: <USFlag /> },
  { name: 'Japanese', flagComponent: <JapanFlag /> },
  { name: 'Chinese', flagComponent: <ChinaFlag /> },
  { name: 'Vietnamese', flagComponent: <VietnamFlag /> },
  { name: 'German', flagComponent: <GermanyFlag /> },
  { name: 'Thai', flagComponent: <ThailandFlag /> },
];