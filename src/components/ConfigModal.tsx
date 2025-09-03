import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Settings, X } from 'lucide-react';
import { ConfigData } from '../types';
import { Translations } from '../i18n/translations';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ConfigData;
  t: Translations;
  onConfigUpdate: (config: ConfigData) => void;
}

export function ConfigModal({ isOpen, onClose, config, t, onConfigUpdate }: ConfigModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onConfigUpdate({
      appName: formData.get('appName') as string,
      logoUrl: formData.get('logoUrl') as string || '',
      language: formData.get('language') as string,
      year: parseInt(formData.get('year') as string),
      month: parseInt(formData.get('month') as string),
      defaultDailyTax: parseFloat(formData.get('defaultDailyTax') as string),
    });
    onClose();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <Dialog.Title className="text-xl font-semibold">{t.configuration}</Dialog.Title>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t.appName}</label>
                    <input
                      type="text"
                      name="appName"
                      defaultValue={config.appName}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t.logoUrl}</label>
                    <input
                      type="url"
                      name="logoUrl"
                      defaultValue={config.logoUrl}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t.language}</label>
                    <select
                      name="language"
                      defaultValue={config.language}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="it">Italiano</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t.year}</label>
                      <input
                        type="number"
                        name="year"
                        defaultValue={config.year}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t.month}</label>
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
                      <label className="block text-sm font-medium text-gray-700">{t.dailyTax}</label>
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
                    {t.updateConfiguration}
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}