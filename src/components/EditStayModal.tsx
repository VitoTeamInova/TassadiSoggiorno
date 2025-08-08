import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Edit2, X } from 'lucide-react';
import { NightlyStay } from '../types';

interface EditStayModalProps {
  isOpen: boolean;
  onClose: () => void;
  stay: NightlyStay;
  config: any;
  onUpdate: (updatedStay: NightlyStay) => void;
}

export function EditStayModal({ isOpen, onClose, stay, config, onUpdate }: EditStayModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const numGuests = parseInt(formData.get('numGuests') as string);
    const numMinors = parseInt(formData.get('numMinors') as string);
    const numNights = parseInt(formData.get('numNights') as string);
    const dailyTax = parseFloat(formData.get('dailyTax') as string);
    
    const updatedStay: NightlyStay = {
      ...stay,
      entryDate: formData.get('entryDate') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      numGuests,
      numMinors,
      numNights,
      dailyTax,
      month: new Date(formData.get('entryDate') as string).getMonth() + 1,
      totalTax: (numGuests - numMinors) * numNights * dailyTax,
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Edit2 className="w-5 h-5 text-blue-600" />
                    <Dialog.Title className="text-xl font-semibold">Edit Stay</Dialog.Title>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Entry Date</label>
                      <input
                        type="date"
                        name="entryDate"
                        defaultValue={stay.entryDate}
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
                        defaultValue={stay.dailyTax}
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
                        defaultValue={stay.firstName}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        defaultValue={stay.lastName}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Guests</label>
                      <input
                        type="number"
                        name="numGuests"
                        min="1"
                        defaultValue={stay.numGuests}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Minors</label>
                      <input
                        type="number"
                        name="numMinors"
                        min="0"
                        defaultValue={stay.numMinors}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nights</label>
                      <input
                        type="number"
                        name="numNights"
                        min="1"
                        defaultValue={stay.numNights}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                        rows={3}
                        defaultValue={stay.preStayNotes}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-vertical"
                        placeholder="Enter any notes before the stay..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-700">Post-Stay Notes</label>
                      <textarea
                        name="postStayNotes"
                        maxLength={1000}
                        rows={3}
                        defaultValue={stay.postStayNotes}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-vertical"
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