// Adaptive Stewardship OS console.
//
// The previous dashboard (EnvironmentalExperienceDashboard, DigitalTwinMap,
// DigitalTwinToggle, ModulePanel, SystemGraph, plus `content/datasets.ts`) was
// removed when this route moved to the Adaptive Stewardship OS frame. It
// carried 18 metrics across four modules that demonstrated none of the three
// systems this case study is about — and its guest-biometrics panel (HRV,
// deep-sleep ratio) directly contradicted the same dashboard's "zero
// unconsented data exposure" claim. Recoverable in full from git history:
//   git show HEAD~1:app/projects/rock-creek-os/dashboard/components/DigitalTwinMap.tsx
//
// `viz-primitives.tsx` survived the rewrite — its four-tier status semantic
// (optimal/nominal/elevated/critical) carries a documented contrast rationale
// worth keeping, and the console reuses it throughout.

export { StewardshipConsole } from './StewardshipConsole';
export * from './viz-primitives';
