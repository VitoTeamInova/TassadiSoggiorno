import React from 'react';
import { BedDouble, X } from 'lucide-react';
import { NightlyStay } from '../types';
import { ConfigData } from '../types';
import { Translations } from '../i18n/translations';

interface NightlyStayFormProps {
  onSubmit: (stay: Omit<NightlyStay, 'id' | 'totalTax' | 'month'>) => void;
  onCancel: () => void;
  config: ConfigData;
  t: Translations;
  onComplete?: () => void;
}

export function NightlyStayForm({ onSubmit, onCancel, config, t, onComplete }: NightlyStayFormProps) {
  const [entryDate, setEntryDate] = React.useState('');
  const [numNights, setNumNights] = React.useState(1);
  const [exitDate, setExitDate] = React.useState('');
  const [crossMonthInfo, setCrossMonthInfo] = React.useState('');

  React.useEffect(() => {
    if (entryDate && numNights > 0) {
      const entry = new Date(entryDate);
      const exit = new Date(entry);
      exit.setDate(entry.getDate() + numNights);
      
      setExitDate(exit.toISOString().split('T')[0]);
      
      // Check if stay crosses months
      const entryMonth = entry.getMonth();
      const exitMonth = exit.getMonth();
      
      if (entryMonth !== exitMonth || entry.getFullYear() !== exit.getFullYear()) {
        // Calculate days in each month
        const firstDayOfNextMonth = new Date(entry.getFullYear(), entry.getMonth() + 1, 1);
        const daysInFirstMonth = Math.ceil((firstDayOfNextMonth.getTime() - entry.getTime()) / (1000 * 60 * 60 * 24));
        const daysInSecondMonth = numNights - daysInFirstMonth;
        
        const monthNames = [
          t.months.january, t.months.february, t.months.march, t.months.april,
          t.months.may, t.months.june, t.months.july, t.months.august,
          t.months.september, t.months.october, t.months.november, t.months.december
        ];
        
        setCrossMonthInfo(`${t.crossMonthStay}: ${daysInFirstMonth} ${t.daysIn} ${monthNames[entryMonth]} ${t.and} ${daysInSecondMonth} ${t.daysIn} ${monthNames[exitMonth]}`);
      } else {
        setCrossMonthInfo('');
      }
    }
  }, [entryDate, numNights]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const entryDateValue = formData.get('entryDate') as string;
    const numNightsValue = parseInt(formData.get('numNights') as string);
    const numGuests = parseInt(formData.get('numGuests') as string);
    const numMinors = parseInt(formData.get('numMinors') as string);
    const dailyTax = parseFloat(formData.get('dailyTax') as string);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const preStayNotes = formData.get('preStayNotes') as string || '';
    const postStayNotes = formData.get('postStayNotes') as string || '';
    
    const entry = new Date(entryDateValue);
    const exit = new Date(entry);
    exit.setDate(entry.getDate() + numNightsValue);
    
    // Check if stay crosses months
    const entryMonth = entry.getMonth();
    const exitMonth = exit.getMonth();
    
    if (entryMonth !== exitMonth || entry.getFullYear() !== exit.getFullYear()) {
      // Create two stays for cross-month
      const lastDayOfEntryMonth = new Date(entry.getFullYear(), entry.getMonth() + 1, 0).getDate();
      const daysInFirstMonth = lastDayOfEntryMonth - entry.getDate() + 1;
      const daysInSecondMonth = numNightsValue - daysInFirstMonth;
      
      const firstDayOfNextMonth = new Date(entry.getFullYear(), entry.getMonth() + 1, 1);
      
      // First month stay
      const firstStay = {
        entryDate: entryDateValue,
        numGuests,
        numNights: daysInFirstMonth,
        firstName,
        lastName,
        numMinors,
        dailyTax,
        preStayNotes: preStayNotes + (preStayNotes ? '\n' : '') + `Multi-Month Stay - Original: ${entryDateValue} to ${exitDate} (Part 1 of 2)`,
        postStayNotes,
      };
      
      const secondEntryDate = firstDayOfNextMonth.toISOString().split('T')[0];
      // Second month stay
      const secondStay = {
        entryDate: secondEntryDate,
        numGuests,
        numNights: daysInSecondMonth,
        firstName,
        lastName,
        numMinors,
        dailyTax,
        preStayNotes: preStayNotes + (preStayNotes ? '\n' : '') + `Multi-Month Stay - Original: ${entryDateValue} to ${exitDate} (Part 2 of 2)`,
        postStayNotes,
      };
      
      // Submit both stays
      onSubmit(firstStay);
      setTimeout(() => {
        onSubmit(secondStay);
        onComplete?.();
      }, 100); // Small delay to ensure proper order
    } else {
      // Single month stay
      const stay = {
        entryDate: entryDateValue,
        numGuests,
        numNights: numNightsValue,
        firstName,
        lastName,
        numMinors,
        dailyTax,
        preStayNotes,
        postStayNotes,
      };
      
      onSubmit(stay);
      onComplete?.();
    }

    e.currentTarget.reset();
    setEntryDate('');
    setNumNights(1);
    setExitDate('');
    setCrossMonthInfo('');
  };

  // Get default date based on config
  const getDefaultDate = () => {
    const date = new Date(config.year, config.month - 1, 1);
    return date.toISOString().split('T')[0];
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
            <h2 className="text-xl font-semibold">{t.newNightlyStay}</h2>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
          {t.cancel}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t.entryDate}</label>
            <input
              type="date"
              name="entryDate"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              defaultValue={getDefaultDate()}
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t.numberOfNights}</label>
            <input
              type="number"
              name="numNights"
              min="1"
              value={numNights}
              onChange={(e) => setNumNights(parseInt(e.target.value) || 1)}
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t.exitDate}</label>
            <input
              type="date"
              value={exitDate}
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-gray-100 shadow-sm px-3 py-2"
              readOnly
            />
          </div>
        </div>
        {crossMonthInfo && (
          <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
            <p className="text-sm text-orange-600 font-medium">{crossMonthInfo}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t.firstName}</label>
            <input
              type="text"
              name="firstName"
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t.lastName}</label>
            <input
              type="text"
              name="lastName"
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t.numberOfGuests}</label>
            <input
              type="number"
              name="numGuests"
              min="1"
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t.numberOfMinors}</label>
            <input
              type="number"
              name="numMinors"
              min="0"
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t.dailyTax}</label>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-green-700">{t.preStayNotes}</label>
            <textarea
              name="preStayNotes"
              maxLength={1000}
              rows={4}
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-vertical"
              placeholder={t.enterNotesBeforeStay}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-700">{t.postStayNotes}</label>
            <textarea
              name="postStayNotes"
              maxLength={1000}
              rows={4}
              className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-vertical"
              placeholder={t.enterNotesAfterStay}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {t.addStay}
        </button>
      </form>
    </div>
  );
}