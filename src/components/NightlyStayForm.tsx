import React from 'react';
import { BedDouble } from 'lucide-react';
import { NightlyStay } from '../types';
import { useConfig } from '../hooks/useConfig';

interface NightlyStayFormProps {
  onSubmit: (stay: Omit<NightlyStay, 'id' | 'totalTax' | 'month'>) => void;
}

export function NightlyStayForm({ onSubmit }: NightlyStayFormProps) {
  const { config } = useConfig();

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
    };

    onSubmit(stay);
    e.currentTarget.reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <BedDouble className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">New Nightly Stay</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Entry Date</label>
            <input
              type="date"
              name="entryDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Minors</label>
            <input
              type="number"
              name="numMinors"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Nights</label>
            <input
              type="number"
              name="numNights"
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
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