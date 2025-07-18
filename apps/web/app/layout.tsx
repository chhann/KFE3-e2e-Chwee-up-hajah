import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { DarkModeToggle } from './(test)/toggle';

import { Providers } from './providers';

import '@repo/ui/styles';
import { cookies } from 'next/headers';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: 'Chwee-up-hajah',
  description: '중고 경매 앱',
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Chwee-up-hajah',
  },
};

import { NotificationPermissionButton } from '@/features/test/NotificationPermissionButton';
import { PushSubscriptionEffect } from '@/shared/hooks/PushSubscriptionEffect';
import * as Sentry from '@sentry/nextjs';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = (await cookies()).get('theme')?.value ?? 'light';
  const isDark = theme === 'dark';

  return (
    <html lang="ko" className={`${notoSansKR.variable} ${isDark ? 'dark' : ''}`}>
      <body
        className={`${notoSansKR.className} bg-background-light text-text-default flex min-h-screen flex-col dark:bg-neutral-900 dark:text-neutral-100`}
      >
        <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <DarkModeToggle />
            <NotificationPermissionButton />
            <Providers>
              <PushSubscriptionEffect />
              <main className="flex-grow">{children}</main>
            </Providers>
          </div>
        </Sentry.ErrorBoundary>
      </body>
    </html>
  );
}
