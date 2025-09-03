import React, { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { Header } from './components/Header';
import { ConfigModal } from './components/ConfigModal';
import { NightlyStayForm } from './components/NightlyStayForm';
import { Summary } from './components/Summary';
import { MonthlyView } from './components/MonthlyView';
import { EditStayModal } from './components/EditStayModal';
import { Footer } from './components/Footer';
import { NightlyStay } from './types';
import { useStays } from './hooks/useStays';
import { useConfig } from './hooks/useConfig';
import { useAuth } from './hooks/useAuth';
import { useLanguage } from './hooks/useLanguage';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { config, loading: configLoading, updateConfig } = useConfig(user);
  const { stays, loading: staysLoading, addStay, updateStay, deleteStay } = useStays(user);
  const { language, t, changeLanguage } = useLanguage();
  const [showNewStay, setShowNewStay] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [editingStay, setEditingStay] = useState<NightlyStay | null>(null);

  const handleConfigUpdate = async (newConfig: typeof config) => {
    try {
      await updateConfig(newConfig);
      // Update language if it changed
      if (newConfig.language !== language) {
        changeLanguage(newConfig.language as 'it' | 'en');
      }
    } catch (error) {
      console.error('Failed to update config:', error);
    }
  };

  const handleStaySubmit = async (stay: Omit<NightlyStay, 'id' | 'totalTax' | 'month'>) => {
    const totalTax = (stay.numGuests - stay.numMinors) * stay.numNights * stay.dailyTax;
    // Month will be calculated in the hook based on actual entry date
    
    const newStay = {
      ...stay,
      totalTax,
    };

    try {
      await addStay(newStay);
    } catch (error) {
      console.error('Failed to add stay:', error);
    }
  };

  const handleStaySubmitComplete = () => {
    setShowNewStay(false);
  };
  const handleStayUpdate = async (updatedStay: NightlyStay) => {
    try {
      await updateStay(updatedStay);
      setEditingStay(null);
    } catch (error) {
      console.error('Failed to update stay:', error);
    }
  };

  const handleStayDelete = async (id: string) => {
    try {
      await deleteStay(id);
    } catch (error) {
      console.error('Failed to delete stay:', error);
    }
  };

  const handleAuthSuccess = () => {
    // Auth success is handled by the useAuth hook
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} t={t} />;
  }

  if (configLoading || staysLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Header
            config={config}
            userEmail={user.email || ''}
            language={language}
            t={t}
            onLanguageChange={changeLanguage}
            onSettingsClick={() => setShowConfig(true)}
            onSignOut={signOut}
          />
        
          {showNewStay ? (
            <NightlyStayForm 
              onSubmit={handleStaySubmit} 
              onCancel={() => setShowNewStay(false)}
              onComplete={handleStaySubmitComplete}
              config={config}
              t={t}
            />
          ) : selectedMonth ? (
            <MonthlyView
              month={selectedMonth}
              stays={stays}
              t={t}
              onBack={() => setSelectedMonth(null)}
              onEditStay={setEditingStay}
              onNewStay={() => setShowNewStay(true)}
              onDeleteStay={handleStayDelete}
            />
          ) : (
            <Summary 
              stays={stays} 
              t={t}
              onNewStay={() => setShowNewStay(true)} 
              onMonthSelect={setSelectedMonth}
            />
          )}
        
          <ConfigModal
            isOpen={showConfig}
            onClose={() => setShowConfig(false)}
            config={config}
            t={t}
            onConfigUpdate={handleConfigUpdate}
          />

          {editingStay && (
            <EditStayModal
              isOpen={true}
              onClose={() => setEditingStay(null)}
              stay={editingStay}
              config={config}
              t={t}
              onUpdate={handleStayUpdate}
            />
          )}
        </div>
      </div>
      <Footer t={t} />
    </div>
  );
}

export default App;