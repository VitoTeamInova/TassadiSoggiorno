import React from 'react';
import { PlusCircle, TrendingUp } from 'lucide-react';
import { MonthlyTotal, TrimesterTotal, NightlyStay } from '../types';

interface SummaryProps {
  stays: NightlyStay[];
  onNewStay: () => void;
  onMonthSelect: (month: number) => void;
}

export function Summary({ stays, onNewStay, onMonthSelect }: SummaryProps) {
  const monthlyTotals: MonthlyTotal[] = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    totalTax: 0,
    totalNights: 0,
    totalGuests: 0,
  }));

  stays.forEach((stay) => {
    const monthIndex = new Date(stay.entryDate).getMonth();
    monthlyTotals[monthIndex].totalTax += stay.totalTax;
    monthlyTotals[monthIndex].totalNights += stay.numNights;
    monthlyTotals[monthIndex].totalGuests += stay.numGuests;
  });

  const trimesterTotals: TrimesterTotal[] = Array.from({ length: 4 }, (_, i) => ({
    trimester: i + 1,
    totalTax: 0,
    totalNights: 0,
    totalGuests: 0,
  }));

  monthlyTotals.forEach((month, index) => {
    const trimesterIndex = Math.floor(index / 3);
    trimesterTotals[trimesterIndex].totalTax += month.totalTax;
    trimesterTotals[trimesterIndex].totalNights += month.totalNights;
    trimesterTotals[trimesterIndex].totalGuests += month.totalGuests;
  });

  const yearlyTotal = trimesterTotals.reduce(
    (acc, curr) => ({
      totalTax: acc.totalTax + curr.totalTax,
      totalNights: acc.totalNights + curr.totalNights,
      totalGuests: acc.totalGuests + curr.totalGuests,
    }),
    { totalTax: 0, totalNights: 0, totalGuests: 0 }
  );

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Summary Report
        </h1>
        <div>
          <button
            onClick={onNewStay}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            New Stay
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Totals</h3>
          <div className="space-y-2">
            {monthlyTotals.map((month, index) => (
              <button
                key={index}
                onClick={() => onMonthSelect(month.month)}
                className="w-full flex justify-between items-center text-sm hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <span className="font-medium">{months[index]}</span>
                <div className="space-x-4">
                  <span>€{month.totalTax.toFixed(2)}</span>
                  <span>{month.totalNights} nights</span>
                  <span>{month.totalGuests} guests</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Trimester Totals</h3>
          <div className="space-y-2">
            {trimesterTotals.map((trimester, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="font-medium">Q{trimester.trimester}</span>
                <div className="space-x-4">
                  <span>€{trimester.totalTax.toFixed(2)}</span>
                  <span>{trimester.totalNights} nights</span>
                  <span>{trimester.totalGuests} guests</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Yearly Total</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Total Tax</span>
              <span>€{yearlyTotal.totalTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Total Nights</span>
              <span>{yearlyTotal.totalNights}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Total Guests</span>
              <span>{yearlyTotal.totalGuests}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}