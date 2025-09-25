import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  language: string;
  setLanguage: (lang: string) => void;
  themeOverride: 'light' | 'dark' | null;
  setThemeOverride: (theme: 'light' | 'dark' | null) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>('en');
  const [themeOverride, setThemeOverride] = useState<'light' | 'dark' | null>(null);

  return (
    <SettingsContext.Provider value={{ language, setLanguage, themeOverride, setThemeOverride }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
