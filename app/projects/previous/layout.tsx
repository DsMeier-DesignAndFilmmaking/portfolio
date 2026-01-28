'use client';

import MobilePreviousProjectsBackToTop from '../../../components/MobilePreviousProjectsBackToTop';

export default function PreviousProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <MobilePreviousProjectsBackToTop />
    </>
  );
}
