import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorOverlay from '@/components/ErrorOverlay';
import Loading from '@/components/Loading';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Suspense } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen">
      <ErrorBoundary fallback={<ErrorOverlay />}>
        <Suspense fallback={<Loading />}>
          <Component {...pageProps} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
