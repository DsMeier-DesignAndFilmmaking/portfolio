import type { Metadata } from 'next';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'My Pulse - Daniel Meier',
  description: 'Personal dashboard & creative insights - A live snapshot of my creative and digital rhythms.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

/**
 * My Pulse Layout
 * 
 * This layout overrides the root layout for /my-pulse route.
 * It excludes the global NavigationWrapper to prevent navbar flash.
 * The My Pulse page has its own custom navbar built-in.
 * Footer is rendered by root layout to avoid duplication.
 */
export default function MyPulseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* No NavigationWrapper here - My Pulse page has custom navbar */}
      {process.env.NODE_ENV === 'development' && (
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
      )}
      {process.env.NODE_ENV !== 'development' && (
        <main>{children}</main>
      )}
      {/* Footer is rendered by root layout, no need to duplicate here */}
    </div>
  );
}

