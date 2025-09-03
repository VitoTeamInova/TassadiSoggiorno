import React from 'react';
import { Settings, LogOut, User, Globe } from 'lucide-react';
import { ConfigData } from '../types';
import { Translations } from '../i18n/translations';
import { Language } from '../hooks/useLanguage';

interface HeaderProps {
  config: ConfigData;
  userEmail: string;
  language: Language;
  t: Translations;
  onLanguageChange: (language: Language) => void;
  onSettingsClick: () => void;
  onSignOut: () => void;
}

export function Header({ config, userEmail, language, t, onLanguageChange, onSettingsClick, onSignOut }: HeaderProps) {
  return (
    <header className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {config.logoUrl && (
            <img 
              src={config.logoUrl} 
              alt="Logo" 
              className="h-12 w-auto object-contain"
            />
          )}
          <h1 className="text-3xl font-bold text-gray-800">
            {config.appName}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
            <Globe className="w-4 h-4 text-gray-600" />
            <button
              onClick={() => onLanguageChange('it')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                language === 'it' 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              IT
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                language === 'en' 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              EN
            </button>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span className="text-sm">{userEmail}</span>
          </div>
          <button
            onClick={onSettingsClick}
            className="flex items-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
            {t.settings}
          </button>
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {t.signOut}
          </button>
        </div>
      </div>
    </header>
  );
}