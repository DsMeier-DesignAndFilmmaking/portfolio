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
};

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className={inter.className}>
      <NavigationWrapper />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
    </body>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png?v=2" />
        <link rel="shortcut icon" href="/favicon.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png?v=2" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}