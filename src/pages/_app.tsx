import { ErrorBoundary } from '@/components/interfaces/ErrorBoundary';
import { ErrorOverlay } from '@/components/interfaces/ErrorOverlay';
import { Loading } from '@/components/interfaces/Loading';
import { EventProvider } from '@/contexts/EventContext';
import { GlobalProvider } from '@/contexts/GlobalContext';
import { MapProvider } from '@/contexts/MapContext';
import { theme } from '@/plugins/chakra-ui/theme';
import { ChakraProvider } from '@chakra-ui/react';
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
    <div className="h-screen">
      <ErrorBoundary fallback={<ErrorOverlay />}>
        <Suspense fallback={<Loading />}>
          <ChakraProvider theme={theme}>
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
          </ChakraProvider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
