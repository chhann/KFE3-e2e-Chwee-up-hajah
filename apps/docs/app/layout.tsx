import './globals.css';
import '@repo/ui/styles';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Turborepo',
  description: 'Generated by create turbo',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
