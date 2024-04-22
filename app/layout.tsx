import './globals.css';

import { Inter } from 'next/font/google';

import ReactQueryClientProvider from '@/components/reactQuery/reactQueryClientProvider';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Julge',
  description: 'The Julge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="ko">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryClientProvider>
  );
}
