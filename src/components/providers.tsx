"use client";

import {
  DehydratedState,
  HydrationBoundary,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

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
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
