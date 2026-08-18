// Evidence tier vocabulary for the Systems Atlas — same three-tier discipline
// `/explorer` uses (documented / inferred / proposed), defined locally here
// rather than imported cross-route. Systems and Explorer are siblings, not a
// dependency of one on the other, and each route owns its own content module.

export type EvidenceTier = 'documented' | 'inferred' | 'proposed';

export const evidenceTierLabels: Record<EvidenceTier, { label: string; note: string }> = {
  documented: { label: 'Documented', note: 'Established by a cited source' },
  inferred: { label: 'Inferred', note: 'Reasoned from cited evidence, not directly sourced' },
  proposed: { label: 'Proposed', note: 'This speculative design exploration' },
};
