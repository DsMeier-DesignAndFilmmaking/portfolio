// ✅ PURE SERVER COMPONENT LAYOUT - No hooks, no client components, no animations
import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import './globals.css';
import '@/styles/globals.css';
// ✅ REMOVED - NavigationWrapper (client component with hooks)
// import NavigationWrapper from '@/components/NavigationWrapper';
// ✅ REMOVED - Footer (client component - can be re-added as static version later)
// import Footer from '@/components/Footer';
// ✅ REMOVED - PageTransition (client component with animations)
// import PageTransition from '@/components/PageTransition';
// ✅ REMOVED - RouteChangeCleanup (client component with hooks and document access)
// import RouteChangeCleanup from '@/components/RouteChangeCleanup';

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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'Daniel Meier - Digital Designer & Developer',
  description: 'Portfolio showcasing digital design, development, and creative work.',
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico` },
      { url: `${basePath}/favicon.svg`, type: 'image/svg+xml' },
      { url: `${basePath}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
      { url: `${basePath}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: `${basePath}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="" />
      </head>
      <body className={`${inter.variable} ${roboto.variable} ${inter.className} bg-white`} suppressHydrationWarning>
        {/* ✅ PURE SERVER COMPONENT LAYOUT - No client components, no hooks, no animations */}
        {/* Isolation div to protect from browser extension DOM injection */}
        <div id="__next" suppressHydrationWarning>
          {/* ✅ REMOVED - RouteChangeCleanup (client component with hooks and document access) */}
          {/* <RouteChangeCleanup /> */}
          
          {/* ✅ REMOVED - NavigationWrapper (client component with hooks) */}
          {/* <NavigationWrapper /> */}
          
          {/* ✅ REMOVED - PageTransition (client component with animations) */}
          {/* {process.env.NODE_ENV === 'development' && (
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
          )} */}
          
          {/* ✅ Pure static main - no animations, no transitions */}
          <main>{children}</main>
          
          {/* ✅ REMOVED - Footer (client component - can be re-added as static version later) */}
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
