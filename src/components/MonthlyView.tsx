import React from 'react';
import { ArrowLeft, Edit2, PlusCircle, Trash2 } from 'lucide-react';
import { NightlyStay } from '../types';
import { Translations } from '../i18n/translations';

interface MonthlyViewProps {
  month: number;
  stays: NightlyStay[];
  t: Translations;
  onBack: () => void;
  onEditStay: (stay: NightlyStay) => void;
  onNewStay: () => void;
  onDeleteStay: (id: string) => void;
}

export function MonthlyView({ month, stays, t, onBack, onEditStay, onNewStay, onDeleteStay }: MonthlyViewProps) {
  const months = [
    t.months.january, t.months.february, t.months.march, t.months.april,
    t.months.may, t.months.june, t.months.july, t.months.august,
    t.months.september, t.months.october, t.months.november, t.months.december
  ];

  const monthlyStays = stays.filter(stay => stay.month === month);
  const [deleteConfirm, setDeleteConfirm] = React.useState<NightlyStay | null>(null);

  const handleDeleteClick = (stay: NightlyStay) => {
    setDeleteConfirm(stay);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      onDeleteStay(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t.backToSummary}
          </button>
          <h2 className="text-2xl font-bold">{months[month - 1]} {t.stays}</h2>
        </div>
        <button
          onClick={onNewStay}
          className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          {t.newStay}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.guest}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.entryDate}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.nights}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.guests}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.tax}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {monthlyStays.map((stay) => (
              <tr key={stay.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    {stay.firstName} {stay.lastName}
                    {stay.preStayNotes && stay.preStayNotes.includes('Multi-Month Stay') && (
                      <div className="text-xs text-red-600 font-medium mt-1">
                        {stay.preStayNotes.split('\n').find(line => line.includes('Multi-Month Stay'))?.replace('Multi-Month Stay - ', '')}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    {(() => {
                      try {
                        const date = new Date(stay.entryDate + 'T00:00:00');
                        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
                      } catch {
                        return 'Invalid Date';
                      }
                    })()}
                    {stay.preStayNotes && stay.preStayNotes.includes('Multi-Month Stay') && stay.preStayNotes.includes('Part 1 of 2') && (
                      <div className="text-xs text-gray-500 mt-1">
                        Exit: (Continues next month)
                      </div>
                    )}
                    {stay.preStayNotes && stay.preStayNotes.includes('Multi-Month Stay') && stay.preStayNotes.includes('Part 2 of 2') && (
                      <div className="text-xs text-gray-500 mt-1">
                        {t.exit}: {(() => {
                          try {
                            const entryDate = new Date(stay.entryDate + 'T00:00:00');
                            const exitDate = new Date(entryDate);
                            exitDate.setDate(entryDate.getDate() + stay.numNights);
                            return isNaN(exitDate.getTime()) ? '' : exitDate.toLocaleDateString();
                          } catch {
                            return '';
                          }
                        })()}
                      </div>
                    )}
                    {(!stay.preStayNotes || !stay.preStayNotes.includes('Multi-Month Stay')) && (
                      <div className="text-xs text-gray-500 mt-1">
                        {t.exit}: {(() => {
                          try {
                            const entryDate = new Date(stay.entryDate + 'T00:00:00');
                            const exitDate = new Date(entryDate);
                            exitDate.setDate(entryDate.getDate() + stay.numNights);
                            return isNaN(exitDate.getTime()) ? '' : exitDate.toLocaleDateString();
                          } catch {
                            return '';
                          }
                        })()}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stay.numNights}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stay.numGuests} ({stay.numMinors} {t.minors})
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  €{stay.totalTax.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onEditStay(stay)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                     title={t.editStay}
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(stay)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title={t.deleteStay}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.confirmDelete}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.deleteConfirmation}{' '}
              <span className="font-medium">{deleteConfirm.firstName} {deleteConfirm.lastName}</span>{' '}
              {t.daysIn} {deleteConfirm.numNights} {t.nights}{' '}
              <span className="font-medium">
                {new Date(deleteConfirm.entryDate).toLocaleDateString()}
              </span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}