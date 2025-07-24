import React from 'react';
import { Settings } from 'lucide-react';
import { ConfigData } from '../types';

interface ConfigFormProps {
  config: ConfigData;
  onConfigUpdate: (config: ConfigData) => void;
}

export function ConfigForm({ config, onConfigUpdate }: ConfigFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onConfigUpdate({
      appName: formData.get('appName') as string,
      year: parseInt(formData.get('year') as string),
      month: parseInt(formData.get('month') as string),
      defaultDailyTax: parseFloat(formData.get('defaultDailyTax') as string),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Configuration</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">App Name</label>
          <input
            type="text"
            name="appName"
            defaultValue={config.appName}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              defaultValue={config.year}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Month</label>
            <input
              type="number"
              name="month"
              min="1"
              max="12"
              defaultValue={config.month}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Daily Tax (€)</label>
            <input
              type="number"
              name="defaultDailyTax"
              step="0.01"
              defaultValue={config.defaultDailyTax}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Update Configuration
        </button>
      </form>
    </div>
  );
}