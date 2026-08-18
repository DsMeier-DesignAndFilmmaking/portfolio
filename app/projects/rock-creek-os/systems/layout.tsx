import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Systems Atlas — Case Study: The Ranch at Rock Creek | Dan Meier',
  description:
    'How the proposed Adaptive Stewardship OS would work: a five-layer architecture, the primary hydrological orchestration lifecycle, wildfire as an extensibility proof, logistics as the response layer, and the feedback loop that makes it adaptive rather than automated. Independent systems-design research.',
};

export default function SystemsAtlasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
