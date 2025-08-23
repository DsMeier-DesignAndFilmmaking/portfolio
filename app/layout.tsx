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
      { url: '/portfolio/favicon.png', type: 'image/png' },
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