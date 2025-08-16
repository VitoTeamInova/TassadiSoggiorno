import React from 'react';
import { Settings, LogOut, User } from 'lucide-react';
import { ConfigData } from '../types';

interface HeaderProps {
  config: ConfigData;
  userEmail: string;
  onSettingsClick: () => void;
  onSignOut: () => void;
}

export function Header({ config, userEmail, onSettingsClick, onSignOut }: HeaderProps) {
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
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span className="text-sm">{userEmail}</span>
          </div>
          <button
            onClick={onSettingsClick}
            className="flex items-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}