import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Edit2, X } from 'lucide-react';
import { NightlyStay, ConfigData } from '../types';

interface EditStayModalProps {
  isOpen: boolean;
  onClose: () => void;
  stay: NightlyStay;
  config: ConfigData;
  onUpdate: (updatedStay: NightlyStay) => void;
}

export function EditStayModal({ isOpen, onClose, stay, config, onUpdate }: EditStayModalProps) {
  const [entryDate, setEntryDate] = React.useState(stay.entryDate);
  const [numNights, setNumNights] = React.useState(stay.numNights);
  const [exitDate, setExitDate] = React.useState('');

  React.useEffect(() => {
    if (entryDate && numNights > 0) {
      const entry = new Date(entryDate);
      const exit = new Date(entry);
      exit.setDate(entry.getDate() + numNights);
      setExitDate(exit.toISOString().split('T')[0]);
    }
  }, [entryDate, numNights]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const numGuests = parseInt(formData.get('numGuests') as string);
    const numMinors = parseInt(formData.get('numMinors') as string);
    const numNightsValue = parseInt(formData.get('numNights') as string);
    const dailyTax = parseFloat(formData.get('dailyTax') as string);
    
    const updatedStay: NightlyStay = {
      ...stay,
      entryDate: formData.get('entryDate') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      numGuests,
      numMinors,
      numNights: numNightsValue,
      dailyTax,
      month: new Date(formData.get('entryDate') as string).getMonth() + 1,
      totalTax: (numGuests - numMinors) * numNightsValue * dailyTax,
      preStayNotes: formData.get('preStayNotes') as string || '',
      postStayNotes: formData.get('postStayNotes') as string || '',
    };

    onUpdate(updatedStay);
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
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-gray-100 p-6 shadow-xl transition-all">
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
                      <Edit2 className="w-5 h-5 text-blue-600" />
                      <Dialog.Title className="text-xl font-semibold">Edit Stay</Dialog.Title>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Entry Date</label>
                      <input
                        type="date"
                        name="entryDate"
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
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
                        value={numNights}
                        onChange={(e) => setNumNights(parseInt(e.target.value) || 1)}
                        className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Exit Date</label>
                      <input
                        type="date"
                        value={exitDate}
                        className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-gray-100 shadow-sm px-3 py-2"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        defaultValue={stay.firstName}
                        className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        defaultValue={stay.lastName}
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
                        defaultValue={stay.numGuests}
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
                        defaultValue={stay.numMinors}
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
                        defaultValue={stay.dailyTax}
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
                        defaultValue={stay.preStayNotes}
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
                        defaultValue={stay.postStayNotes}
                        className="mt-1 block w-full rounded-md border-2 border-gray-400 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 resize-vertical"
                        placeholder="Enter any notes after the stay..."
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Update Stay
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