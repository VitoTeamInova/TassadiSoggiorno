import React, { useState } from 'react';
import { ConfigModal } from './components/ConfigModal';
import { NightlyStayForm } from './components/NightlyStayForm';
import { Summary } from './components/Summary';
import { MonthlyView } from './components/MonthlyView';
import { EditStayModal } from './components/EditStayModal';
import { NightlyStay } from './types';
import { useStays } from './hooks/useStays';
import { useConfig } from './hooks/useConfig';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const { config, loading: configLoading, updateConfig } = useConfig();
  const { stays, loading: staysLoading, addStay, updateStay } = useStays();
  const [showNewStay, setShowNewStay] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [editingStay, setEditingStay] = useState<NightlyStay | null>(null);

  const handleConfigUpdate = async (newConfig: typeof config) => {
    try {
      await updateConfig(newConfig);
    } catch (error) {
      console.error('Failed to update config:', error);
    }
  };

  const handleStaySubmit = async (stay: Omit<NightlyStay, 'id' | 'totalTax' | 'month'>) => {
    const totalTax = (stay.numGuests - stay.numMinors) * stay.numNights * stay.dailyTax;
    const month = new Date(stay.entryDate).getMonth() + 1;
    
    const newStay = {
      ...stay,
      totalTax,
      month,
    };

    try {
      await addStay(newStay);
      setShowNewStay(false);
    } catch (error) {
      console.error('Failed to add stay:', error);
    }
  };

  const handleStayUpdate = async (updatedStay: NightlyStay) => {
    try {
      await updateStay(updatedStay);
      setEditingStay(null);
    } catch (error) {
      console.error('Failed to update stay:', error);
    }
  };

  if (configLoading || staysLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            {config.appName}
          </h1>
        </header>
        
        {showNewStay ? (
          <NightlyStayForm onSubmit={handleStaySubmit} />
        ) : selectedMonth ? (
          <MonthlyView
            month={selectedMonth}
            stays={stays}
            onBack={() => setSelectedMonth(null)}
            onEditStay={setEditingStay}
            onNewStay={() => setShowNewStay(true)}
          />
        ) : (
          <Summary 
            stays={stays} 
            onNewStay={() => setShowNewStay(true)} 
            onConfigOpen={() => setShowConfig(true)}
            onMonthSelect={setSelectedMonth}
          />
        )}
        
        <ConfigModal
          isOpen={showConfig}
          onClose={() => setShowConfig(false)}
          config={config}
          onConfigUpdate={handleConfigUpdate}
        />

        {editingStay && (
          <EditStayModal
            isOpen={true}
            onClose={() => setEditingStay(null)}
            stay={editingStay}
            config={config}
            onUpdate={handleStayUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default App;