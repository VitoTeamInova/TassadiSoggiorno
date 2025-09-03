import React from 'react';
import { Translations } from '../i18n/translations';

interface FooterProps {
  t: Translations;
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 text-gray-600 text-sm">
          <span className="font-medium">{t.teamInovaSolution}</span>
          <span className="hidden md:inline">-</span>
          <a 
            href="https://www.teaminova.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            www.teaminova.com
          </a>
          <span className="hidden md:inline">-</span>
          <a 
            href="mailto:info@teaminova.com"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            info@teaminova.com
          </a>
        </div>
      </div>
    </footer>
  );
}