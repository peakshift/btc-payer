import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

type QueryProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

function QueryProvider({children}: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
