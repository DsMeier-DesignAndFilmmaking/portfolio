// Scratch preview for SystemsModule — NOT linked anywhere, NOT wired into the
// 12 case-study pages. Exists only so the module can be reviewed in isolation
// against the dark case-study visual language before instantiation.
// Visit: /projects ... no — visit /sandbox/systems-module
import SystemsModule from '@/components/SystemsModule';

export const metadata = {
  title: 'SystemsModule preview',
  robots: { index: false, follow: false },
};

export default function SystemsModulePreviewPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Stand-in for the surrounding case-study chrome so the module is
          reviewed in its real context (a dark page section). */}
      <div className="border-b border-white/10 py-10">
        <div className="container mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
            Preview / not a real page
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">SystemsModule</h1>
          <p className="mt-2 max-w-2xl text-gray-400">
            Placeholder content. All numbers below are illustrative
            (<code>isPlaceholder</code>) and render identically to real metrics.
          </p>
        </div>
      </div>

      <SystemsModule
        heading="Systems Approach"
        introText="The redesign was scoped as a system, not a set of screens. Every page pulled from one content model, so a change to a component definition propagated everywhere it was used. That let a small team keep 1,500+ URLs consistent while migrating them in stages rather than in one risky cutover."
        decisionPoints={[
          'Migrate in stages behind a routing layer, not in a single cutover.',
          'Treat the component library as the source of truth for layout and copy patterns.',
          'Resolve redirects at the edge so old inbound links never 404 during the move.',
          'Hold visual scope flat for v1 — structure first, restyle second.',
        ]}
        metrics={[
          { value: '1,500+', label: 'URLs migrated', isPlaceholder: true },
          { value: '44k', label: 'Avg. monthly visitors', isPlaceholder: true },
          { value: '6', label: 'Release stages', isPlaceholder: true },
          { value: '0', label: 'Cutover-day outages', isPlaceholder: true },
        ]}
        feedbackLoop="Each migration stage shipped behind analytics on bounce and 404 rate; regressions in either fed straight back into the redirect map and the component definitions before the next batch went out."
        systemMap={[
          { label: 'Audit existing URLs & content' },
          {
            label: 'Map each URL to a component template',
            branch: [
              'Direct match → reuse template as-is',
              'Partial match → extend template',
              'No match → new template, added to library',
            ],
          },
          { label: 'Stage migration behind routing layer' },
          {
            label: 'Validate live traffic',
            branch: ['404 / bounce within threshold → proceed', 'Regression → revise redirect map'],
          },
          { label: 'Promote stage to production' },
        ]}
      />
    </main>
  );
}
