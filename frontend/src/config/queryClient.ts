import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // query options
      staleTime: Infinity,
      refetchOnWindowFocus: true,
    },
    mutations: {
      // mutation options
    },
  },
});
