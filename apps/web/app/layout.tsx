import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';

import GoogleAnalytics from '@/shared/hooks/GoogleAnalyticsEffect';
import { PushSubscriptionEffect } from '@/shared/hooks/PushSubscriptionEffect';
import { GA_TRACKING_ID } from '@/shared/lib/ga4/gtag';

import { Providers } from './providers';

import '@repo/ui/styles';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: 'Time Auction',
  description: '중고 경매 앱',
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Time Auction',
  },
};

import * as Sentry from '@sentry/nextjs';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = (await cookies()).get('theme')?.value ?? 'light';
  const isDark = theme === 'dark';

  return (
    <html lang="ko" className={`${notoSansKR.variable} ${isDark ? 'dark' : ''} bg-[#F5F5F5]`}>
      <body className={`${notoSansKR.className} mx-auto max-w-[375px]`}>
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
            <Analytics />
            <SpeedInsights />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
              });
                  `}
            </Script>
            <GoogleAnalytics />
          </Providers>
        </Sentry.ErrorBoundary>
      </body>
    </html>
  );
}
