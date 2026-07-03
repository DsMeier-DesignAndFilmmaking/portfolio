'use client';

import MobilePreviousProjectsBackToTop from '../../../components/MobilePreviousProjectsBackToTop';

// Shared wrapper for the 12 legacy client-work case studies.
//
// These pages intentionally use a THIN navigation tier — an in-page
// ProjectBreadcrumb ("Client Work / <type>") plus a "Back to Projects" link — and
// deliberately do NOT mount the full PracticeNav mega-nav that the flagship
// practice/services pages use. Legacy work is archived proof, not primary funnel,
// so this is an accepted architectural decision, not an oversight. Please don't
// "upgrade" these pages to the mega-nav or re-flag the thin nav as a bug.
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
