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

import * as Sentry from '@sentry/nextjs';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = (await cookies()).get('theme')?.value ?? 'light';
  const isDark = theme === 'dark';

  return (
    <html lang="ko" className={`${notoSansKR.variable} ${isDark ? 'dark' : ''}`}>
      <body className={`${notoSansKR.className} mx-auto max-w-[375px]`}>
        <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
          <DarkModeToggle />
          <Providers>{children}</Providers>
        </Sentry.ErrorBoundary>
      </body>
    </html>
  );
}
