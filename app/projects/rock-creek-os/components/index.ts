// Shared, route-agnostic diagram primitives for the Rock Creek OS case study.
//
// The five Infrastructure Sovereignty framework components previously
// exported here (EnvironmentalExperienceEcosystem, RusticReliabilityGap,
// DecisionArchitectureMap, SovereigntyLayerStack, InfrastructureDependencyModel,
// StewardshipFeedbackLoop) were removed when `/systems` moved to the Adaptive
// Stewardship OS frame — each one described a system the new narrative
// doesn't carry forward. All are fully recoverable from git history:
//   git show HEAD~1:app/projects/rock-creek-os/components/SovereigntyLayerStack.tsx
// (and similarly for the other five, plus `content/frameworks.ts`, which held
// their data). `/systems` now owns its own local content and components,
// the same way `/explorer` already does — see `systems/content/systems-data.ts`
// and `systems/components/`.

export * from './diagram-primitives';
