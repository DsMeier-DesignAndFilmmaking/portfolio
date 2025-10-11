import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'My Pulse - Daniel Meier',
  description: 'A live snapshot of my creative and digital rhythms.',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
};

/**
 * My Pulse Layout
 * 
 * This layout overrides the root layout for /my-pulse route.
 * It excludes the global NavigationWrapper to prevent navbar flash.
 * The My Pulse page has its own custom navbar built-in.
 */
export default function MyPulseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      {/* No NavigationWrapper here - My Pulse page has custom navbar */}
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
    </div>
  );
}

