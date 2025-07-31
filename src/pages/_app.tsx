import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'var(--accent-soft-sage)',
              secondary: 'var(--text-inverse)',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: 'var(--warning-soft-coral)',
              secondary: 'var(--text-inverse)',
            },
          },
        }}
      />
    </Layout>
  );
} 