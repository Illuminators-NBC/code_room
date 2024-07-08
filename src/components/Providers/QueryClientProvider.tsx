'use client';

import { QueryClient, QueryClientProvider as QueryProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

function QueryClientProvider({ children }: PropsWithChildren) {
  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
}

export default QueryClientProvider;
