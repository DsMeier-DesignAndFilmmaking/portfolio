import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Systems Atlas — Case Study: The Ranch at Rock Creek | Dan Meier',
  description:
    'The intellectual core of Case Study: The Ranch at Rock Creek — five systems-thinking frameworks mapping how environmental, operational, infrastructure, and experience systems interact on a remote, high-consequence hospitality landscape.',
};

export default function SystemsAtlasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
