import React, { useState } from 'react';
import { ConfigModal } from './components/ConfigModal';
import { NightlyStayForm } from './components/NightlyStayForm';
import { Summary } from './components/Summary';
import { MonthlyView } from './components/MonthlyView';
import { EditStayModal } from './components/EditStayModal';
import { ConfigData, NightlyStay } from './types';

function App() {
  const [config, setConfig] = useState<ConfigData>({
    appName: 'TeamInova B&B Local Stay Tax Calculator',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    defaultDailyTax: 2.0,
  });

  const [stays, setStays] = useState<NightlyStay[]>([]);
  const [showNewStay, setShowNewStay] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [editingStay, setEditingStay] = useState<NightlyStay | null>(null);

  const handleConfigUpdate = (newConfig: ConfigData) => {
    setConfig(newConfig);
  };

  const handleStaySubmit = (stay: Omit<NightlyStay, 'id' | 'totalTax' | 'month'>) => {
    const totalTax = (stay.numGuests - stay.numMinors) * stay.numNights * stay.dailyTax;
    const month = new Date(stay.entryDate).getMonth() + 1;
    
    const newStay: NightlyStay = {
      ...stay,
      id: crypto.randomUUID(),
      totalTax,
      month,
    };

    setStays([...stays, newStay]);
    setShowNewStay(false);
  };

  const handleStayUpdate = (updatedStay: NightlyStay) => {
    setStays(stays.map(stay => stay.id === updatedStay.id ? updatedStay : stay));
    setEditingStay(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            TeamInova B&B Local Stay Tax Calculator
          </h1>
        </header>
        
        {showNewStay ? (
          <NightlyStayForm config={config} onSubmit={handleStaySubmit} />
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