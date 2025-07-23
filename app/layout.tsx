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
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
      </head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}