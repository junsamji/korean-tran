
import type React from 'react';

export interface Translation {
  language: string;
  translation: string;
}

export interface TargetLanguage {
  name: string;
  flagComponent: React.ReactNode;
}
