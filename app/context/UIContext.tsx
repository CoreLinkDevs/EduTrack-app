import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UIContextType {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
  showToast: (message: string) => void;
  toast: string | null;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000); // auto-clear
  };

  return (
    <UIContext.Provider value={{ isLoading, setLoading: setIsLoading, showToast, toast }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
};
