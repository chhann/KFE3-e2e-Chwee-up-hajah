import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import { Providers } from './providers';

import '@repo/ui/styles';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cookies } from 'next/headers';
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

import GoogleAnalytics from '@/shared/hooks/GoogleAnalyticsEffect';
import { PushSubscriptionEffect } from '@/shared/hooks/PushSubscriptionEffect';
import { GA_TRACKING_ID } from '@/shared/lib/ga4/gtag';
import * as Sentry from '@sentry/nextjs';
import Script from 'next/script';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = (await cookies()).get('theme')?.value ?? 'light';
  const isDark = theme === 'dark';

  return (
    <html lang="ko" className={`${notoSansKR.variable} ${isDark ? 'dark' : ''}`}>
      <body className={`${notoSansKR.className} mx-auto max-w-[375px]`}>
        <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
          {/* <NotificationPermissionButton /> */}
          <Providers>
            <PushSubscriptionEffect />
            {children}
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
