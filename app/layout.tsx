import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import NavigationWrapper from '@/components/NavigationWrapper';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daniel Meier - Digital Designer & Developer',
  description: 'Portfolio showcasing digital design, development, and creative work.',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6',
  icons: {
    icon: [
      { url: '/portfolio/favicon.ico' },
      { url: '/portfolio/favicon.svg', type: 'image/svg+xml' },
      { url: '/portfolio/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/portfolio/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/portfolio/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/portfolio/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/portfolio/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/portfolio/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <NavigationWrapper />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}