import React from 'react';
import { ArrowLeft, Edit2, PlusCircle, Trash2 } from 'lucide-react';
import { NightlyStay } from '../types';

interface MonthlyViewProps {
  month: number;
  stays: NightlyStay[];
  onBack: () => void;
  onEditStay: (stay: NightlyStay) => void;
  onNewStay: () => void;
  onDeleteStay: (id: string) => void;
}

export function MonthlyView({ month, stays, onBack, onEditStay, onNewStay, onDeleteStay }: MonthlyViewProps) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
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
                  <div>
                    {stay.firstName} {stay.lastName}
                    {stay.preStayNotes.includes('Multi-Month Stay') && (
                      <div className="text-xs text-red-600 font-medium mt-1">
                        {stay.preStayNotes.split('\n').find(line => line.includes('Multi-Month Stay'))}
                      </div>
                    )}
                  </div>
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
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEditStay(stay)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit Stay"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(stay)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete Stay"
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
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the stay for{' '}
              <span className="font-medium">{deleteConfirm.firstName} {deleteConfirm.lastName}</span>{' '}
              for {deleteConfirm.numNights} days starting from{' '}
              <span className="font-medium">
                {new Date(deleteConfirm.entryDate).toLocaleDateString()}
              </span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}