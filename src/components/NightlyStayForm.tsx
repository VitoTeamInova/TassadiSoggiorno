import React from 'react';
import { BedDouble, X } from 'lucide-react';
import { NightlyStay } from '../types';
import { ConfigData } from '../types';

interface NightlyStayFormProps {
  onSubmit: (stay: Omit<NightlyStay, 'id' | 'totalTax' | 'month'>) => void;
  onCancel: () => void;
  config: ConfigData;
}

export function NightlyStayForm({ onSubmit, onCancel, config }: NightlyStayFormProps) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const stay = {
      entryDate: formData.get('entryDate') as string,
      numGuests: parseInt(formData.get('numGuests') as string),
      numNights: parseInt(formData.get('numNights') as string),
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      numMinors: parseInt(formData.get('numMinors') as string),
      dailyTax: parseFloat(formData.get('dailyTax') as string),
      preStayNotes: formData.get('preStayNotes') as string || '',
      postStayNotes: formData.get('postStayNotes') as string || '',
    };

    onSubmit(stay);
    e.currentTarget.reset();
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {config.logoUrl && (
            <img 
              src={config.logoUrl} 
              alt="Logo" 
              className="h-8 w-auto object-contain"
            />
          )}
          <div className="flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">New Nightly Stay</h2>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Entry Date</label>
            <input
              type="date"
              name="entryDate"
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Daily Tax (€)</label>
            <input
              type="number"
              name="dailyTax"
              step="0.01"
              defaultValue={config.defaultDailyTax}
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
            <input
              type="number"
              name="numGuests"
              min="1"
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Minors</label>
            <input
              type="number"
              name="numMinors"
              min="0"
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Nights</label>
            <input
              type="number"
              name="numNights"
              min="1"
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-green-700">Pre-Stay Notes</label>
            <textarea
              name="preStayNotes"
              maxLength={1000}
              rows={4}
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-vertical"
              placeholder="Enter any notes before the stay..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-700">Post-Stay Notes</label>
            <textarea
              name="postStayNotes"
              maxLength={1000}
              rows={4}
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-vertical"
              placeholder="Enter any notes after the stay..."
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Stay
        </button>
      </form>
    </div>
  );
}