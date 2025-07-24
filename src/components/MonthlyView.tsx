import React from 'react';
import { ArrowLeft, Edit2, PlusCircle } from 'lucide-react';
import { NightlyStay } from '../types';

interface MonthlyViewProps {
  month: number;
  stays: NightlyStay[];
  onBack: () => void;
  onEditStay: (stay: NightlyStay) => void;
  onNewStay: () => void;
}

export function MonthlyView({ month, stays, onBack, onEditStay, onNewStay }: MonthlyViewProps) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthlyStays = stays.filter(stay => stay.month === month);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Summary
          </button>
          <h2 className="text-2xl font-bold">{months[month - 1]} Stays</h2>
        </div>
        <button
          onClick={onNewStay}
          className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          New Stay
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nights</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {monthlyStays.map((stay) => (
              <tr key={stay.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {stay.firstName} {stay.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(stay.entryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stay.numNights}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stay.numGuests} ({stay.numMinors} minors)
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  €{stay.totalTax.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onEditStay(stay)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}