import type { AppProps } from 'next/app';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const theme = createTheme({
  type: 'dark'
});

const queryClient = new QueryClient({});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider theme={theme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
