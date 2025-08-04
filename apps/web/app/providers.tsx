'use client';

import { ReactNode, useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      import('../sentry-init').then((mod) => mod.initializeSentry());
    }
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
