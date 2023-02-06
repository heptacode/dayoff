import { ErrorBoundary } from '@/components/interfaces/ErrorBoundary';
import { ErrorOverlay } from '@/components/interfaces/ErrorOverlay';
import { theme } from '@/plugins/chakra-ui/theme';
import '@/styles/globals.css';
import { ChakraProvider, Progress } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
    <ChakraProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorOverlay />}>
        <Suspense fallback={<Progress size="xs" isIndeterminate />}>
          <QueryClientProvider client={queryClient}>
            <DndProvider backend={HTML5Backend}>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </DndProvider>
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
