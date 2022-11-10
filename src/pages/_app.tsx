import { ErrorBoundary } from '@/components/interfaces/ErrorBoundary';
import { ErrorOverlay } from '@/components/interfaces/ErrorOverlay';
import { Loading } from '@/components/interfaces/Loading';
import { EventProvider } from '@/contexts/EventContext';
import { MapProvider } from '@/contexts/MapContext';
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
          <QueryClientProvider client={queryClient}>
            <MapProvider>
              <EventProvider>
                <Component {...pageProps} />
              </EventProvider>
            </MapProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
