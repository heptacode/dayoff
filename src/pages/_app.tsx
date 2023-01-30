import { ErrorBoundary } from '@/components/interfaces/ErrorBoundary';
import { ErrorOverlay } from '@/components/interfaces/ErrorOverlay';
import { GlobalProvider } from '@/contexts/GlobalContext';
import { theme } from '@/plugins/chakra-ui/theme';
import '@/styles/globals.css';
import { ChakraProvider, Progress } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import type { AppProps } from 'next/app';
import { PlanProvider } from '@/contexts/PlanContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorOverlay />}>
        <Suspense fallback={<Progress size="xs" isIndeterminate />}>
          <QueryClientProvider client={queryClient}>
            <GlobalProvider>
              <PlanProvider>
                <Component {...pageProps} />
              </PlanProvider>
            </GlobalProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
