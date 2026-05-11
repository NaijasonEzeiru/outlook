"use client";

import { createContext, useContext, ReactNode } from "react";

export interface NavigationContextType {
  goToNext: () => void;
  goToPrev: () => void;
  goToStep: (step: number) => void;
  currentStep: number;
  totalSteps: number;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
  value: NavigationContextType;
}

export const NavigationProvider = ({
  children,
  value,
}: NavigationProviderProps) => {
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
