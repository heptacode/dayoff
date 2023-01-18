import { ErrorBoundary } from '@/components/interfaces/ErrorBoundary';
import { ErrorOverlay } from '@/components/interfaces/ErrorOverlay';
import { EventProvider } from '@/contexts/EventContext';
import { GlobalProvider } from '@/contexts/GlobalContext';
import { MapProvider } from '@/contexts/MapContext';
import { theme } from '@/plugins/chakra-ui/theme';
import { ChakraProvider, Progress } from '@chakra-ui/react';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { Suspense } from 'react';

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
              <MapProvider>
                <EventProvider>
                  <Component {...pageProps} />
                </EventProvider>
              </MapProvider>
            </GlobalProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
