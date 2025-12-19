import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import '@/styles/globals.css';
import NavigationWrapper from '@/components/NavigationWrapper';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Daniel Meier - Digital Designer & Developer',
  description: 'Portfolio showcasing digital design, development, and creative work.',
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3B82F6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-white">
      <head>
        <link rel="icon" type="image/x-icon" href="/portfolio/favicon.ico?v=2" />
        <link rel="icon" type="image/svg+xml" href="/portfolio/favicon.svg?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/portfolio/apple-touch-icon.png?v=2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="" />
      </head>
      <body className={`${inter.variable} ${roboto.variable} ${inter.className} bg-white`}>
        <NavigationWrapper />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
