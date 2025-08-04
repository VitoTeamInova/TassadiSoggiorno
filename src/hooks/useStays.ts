import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { NightlyStay } from '../types';

export function useStays() {
  const [stays, setStays] = useState<NightlyStay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStays = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('stays')
        .select('*')
        .order('entry_date', { ascending: false });

      if (error) throw error;

      const formattedStays: NightlyStay[] = data.map(stay => ({
        id: stay.id,
        entryDate: stay.entry_date,
        firstName: stay.first_name,
        lastName: stay.last_name,
        numGuests: stay.num_guests,
        numMinors: stay.num_minors,
        numNights: stay.num_nights,
        dailyTax: stay.daily_tax,
        totalTax: stay.total_tax,
        month: stay.month,
      }));

      setStays(formattedStays);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addStay = async (stay: Omit<NightlyStay, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('stays')
        .insert({
          entry_date: stay.entryDate,
          first_name: stay.firstName,
          last_name: stay.lastName,
          num_guests: stay.numGuests,
          num_minors: stay.numMinors,
          num_nights: stay.numNights,
          daily_tax: stay.dailyTax,
          total_tax: stay.totalTax,
          month: stay.month,
        })
        .select()
        .single();

      if (error) throw error;

      const newStay: NightlyStay = {
        id: data.id,
        entryDate: data.entry_date,
        firstName: data.first_name,
        lastName: data.last_name,
        numGuests: data.num_guests,
        numMinors: data.num_minors,
        numNights: data.num_nights,
        dailyTax: data.daily_tax,
        totalTax: data.total_tax,
        month: data.month,
      };

      setStays(prev => [newStay, ...prev]);
      return newStay;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add stay');
      throw err;
    }
  };

  const updateStay = async (updatedStay: NightlyStay) => {
    try {
      const { data, error } = await supabase
        .from('stays')
        .update({
          entry_date: updatedStay.entryDate,
          first_name: updatedStay.firstName,
          last_name: updatedStay.lastName,
          num_guests: updatedStay.numGuests,
          num_minors: updatedStay.numMinors,
          num_nights: updatedStay.numNights,
          daily_tax: updatedStay.dailyTax,
          total_tax: updatedStay.totalTax,
          month: updatedStay.month,
        })
        .eq('id', updatedStay.id)
        .select()
        .single();

      if (error) throw error;

      setStays(prev => prev.map(stay => 
        stay.id === updatedStay.id ? updatedStay : stay
      ));
      
      return updatedStay;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update stay');
      throw err;
    }
  };

  const deleteStay = async (id: string) => {
    try {
      const { error } = await supabase
        .from('stays')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setStays(prev => prev.filter(stay => stay.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete stay');
      throw err;
    }
  };

  useEffect(() => {
    fetchStays();
  }, []);

  return {
    stays,
    loading,
    error,
    addStay,
    updateStay,
    deleteStay,
    refetch: fetchStays,
  };
}