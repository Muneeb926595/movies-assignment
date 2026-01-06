// src/react-query/queryClient.tsx

import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';
import { useTanStackQueryDevTools } from '@rozenite/tanstack-query-plugin';
import errorHandler from '../services/error-handler';
import { AppState } from 'react-native';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes - data stays fresh longer
      gcTime: 1000 * 60 * 30, // 30 minutes - cache persists in memory longer (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false, // Don't refetch on app focus to save API calls
      refetchOnReconnect: false, // Don't refetch on reconnect to save API calls
    },
    mutations: {
      retry: 0,
    },
  },
});

// Subscribe to query and mutation cache changes to surface errors globally.
// This avoids TypeScript issues with providing onError inside defaultOptions for queries.
queryClient.getQueryCache().subscribe(({ query }) => {
  const err = (query as any)?.state?.error;
  if (err) {
    errorHandler.showApiErrorAlert(err as any).catch(() => {});
  }
});

queryClient.getMutationCache().subscribe(({ mutation }) => {
  const err = (mutation as any)?.state?.error;
  if (err) {
    errorHandler.showApiErrorAlert(err as any).catch(() => {});
  }
});

export const ReactQueryProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Enable TanStack Query DevTools in Rozenite
  useTanStackQueryDevTools(queryClient);

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      focusManager.setFocused(state === 'active');
    });
    return () => {
      // for RN >= 0.65, remove() is not part of subscription: see docs
      subscription.remove();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
