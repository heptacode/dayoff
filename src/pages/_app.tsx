import { ChakraProvider, Progress } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/interfaces/ErrorBoundary';
import { ErrorOverlay } from '@/components/interfaces/ErrorOverlay';
import { theme } from '@/plugins/chakra-ui/theme';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <ChakraProvider theme={theme}>
        <ErrorBoundary fallback={<ErrorOverlay />}>
          <Suspense fallback={<Progress size="xs" isIndeterminate />}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            </QueryClientProvider>
          </Suspense>
        </ErrorBoundary>
      </ChakraProvider>
    </>
  );
}
