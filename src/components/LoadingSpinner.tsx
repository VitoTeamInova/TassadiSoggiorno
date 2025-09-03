import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export function LoadingSpinner() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-600">{t.loading}</p>
      </div>
    </div>
  );
}