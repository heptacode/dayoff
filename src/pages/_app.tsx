import ErrorBoundary from '@/components/interfaces/ErrorBoundary';
import ErrorOverlay from '@/components/interfaces/ErrorOverlay';
import Loading from '@/components/interfaces/Loading';
import { EventProvider } from '@/contexts/EventContext';
import { MapProvider } from '@/contexts/MapContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Suspense } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen">
      <ErrorBoundary fallback={<ErrorOverlay />}>
        <Suspense fallback={<Loading />}>
          <MapProvider>
            <EventProvider>
              <Component {...pageProps} />
            </EventProvider>
          </MapProvider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
