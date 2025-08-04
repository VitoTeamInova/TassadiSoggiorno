import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ConfigData } from '../types';

export function useConfig() {
  const [config, setConfig] = useState<ConfigData>({
    appName: 'TeamInova B&B Local Stay Tax Calculator',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    defaultDailyTax: 2.0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('app_config')
        .select('*')
        .limit(1)
        .single();

      if (error) {
        // If no config exists, create default one
        if (error.code === 'PGRST116') {
          await createDefaultConfig();
          return;
        }
        throw error;
      }

      setConfig({
        appName: data.app_name,
        year: data.year,
        month: data.month,
        defaultDailyTax: data.default_daily_tax,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultConfig = async () => {
    try {
      const defaultConfig = {
        app_name: 'TeamInova B&B Local Stay Tax Calculator',
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        default_daily_tax: 2.0,
      };

      const { data, error } = await supabase
        .from('app_config')
        .insert(defaultConfig)
        .select()
        .single();

      if (error) throw error;

      setConfig({
        appName: data.app_name,
        year: data.year,
        month: data.month,
        defaultDailyTax: data.default_daily_tax,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create default config');
    }
  };

  const updateConfig = async (newConfig: ConfigData) => {
    try {
      const { data, error } = await supabase
        .from('app_config')
        .update({
          app_name: newConfig.appName,
          year: newConfig.year,
          month: newConfig.month,
          default_daily_tax: newConfig.defaultDailyTax,
        })
        .eq('id', (await supabase.from('app_config').select('id').single()).data?.id)
        .select()
        .single();

      if (error) throw error;

      setConfig(newConfig);
      return newConfig;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update config');
      throw err;
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return {
    config,
    loading,
    error,
    updateConfig,
    refetch: fetchConfig,
  };
}