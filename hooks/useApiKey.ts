import { useState, useEffect } from 'react';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  useEffect(() => {
    // Load API key from localStorage on mount
    const savedApiKey = localStorage.getItem('nexus_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsConfigured(true);
    }
  }, []);

  const saveApiKey = (key: string) => {
    if (key.trim()) {
      localStorage.setItem('nexus_api_key', key.trim());
      setApiKey(key.trim());
      setIsConfigured(true);
    } else {
      localStorage.removeItem('nexus_api_key');
      setApiKey('');
      setIsConfigured(false);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('nexus_api_key');
    setApiKey('');
    setIsConfigured(false);
  };

  return {
    apiKey,
    isConfigured,
    saveApiKey,
    clearApiKey
  };
};
