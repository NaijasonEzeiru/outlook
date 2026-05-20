"use client";

import {
  DehydratedState,
  HydrationBoundary,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useState } from "react";

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // cache for 5 mins
      // staleTime: Infinity, // user never becomes "stale"
      refetchOnMount: false, // don't refetch if cached
      refetchOnWindowFocus: false, // don't refetch on tab switch
      refetchOnReconnect: false, // don't refetch on network reconnect
    },
  },
});

export function Providers({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState?: DehydratedState | null;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>
      </GlobalProvider>
    </QueryClientProvider>
  );
}

const GlobalContext = createContext<{
  load: boolean;
  setLoad: (value: boolean) => void;
} | null>(null);

function GlobalProvider({ children }: { children: ReactNode }) {
  const [load, setLoad] = useState(false);

  return (
    <GlobalContext.Provider value={{ load, setLoad }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook for easy access
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
