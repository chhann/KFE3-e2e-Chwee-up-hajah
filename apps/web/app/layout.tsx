import * as Sentry from '@sentry/nextjs';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { Toaster } from 'react-hot-toast';

import AnalyticsWrapper from '@/shared/components/AnalyticsWrapper';
import { PushSubscriptionEffect } from '@/shared/hooks/PushSubscriptionEffect';

import { Providers } from './providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Time Auction',
  description: '중고 경매 앱',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Time Auction',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = (await cookies()).get('theme')?.value ?? 'light';
  const isDark = theme === 'dark';

  return (
    <html lang="ko" className={`${isDark ? 'dark' : ''} bg-[#F5F5F5]`}>
      <body className={`mx-auto max-w-[375px]`}>
        <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
          <Providers>
            <PushSubscriptionEffect />
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 2300,
                style: {
                  background: '#484848',
                  color: '#f5f5f5',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  fontSize: 12,
                },
              }}
            />
            <AnalyticsWrapper />
          </Providers>
        </Sentry.ErrorBoundary>
      </body>
    </html>
  );
}
