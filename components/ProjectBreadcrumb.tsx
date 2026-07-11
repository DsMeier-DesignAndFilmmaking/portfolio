import Link from 'next/link';
import { PROJECTS } from '@/data/projects';

const TRACK_HUB: Record<string, { label: string; href: string }> = {
  'independent-research-practice': {
    label: 'Systems Design Practice',
    href: '/projects/research-practice',
  },
  'client-work': {
    label: 'Client Work',
    href: '/projects/previous',
  },
};

export default function ProjectBreadcrumb({
  projectId,
  onDark = false,
}: {
  projectId: string;
  onDark?: boolean;
}) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return null;
  const hub = TRACK_HUB[project.track];
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.4em] ${
        onDark ? 'text-gray-400' : 'text-neutral-500'
      }`}
    >
      <Link
        href={hub.href}
        className={`transition-colors duration-150 focus:outline-none focus-visible:underline ${
          onDark ? 'hover:text-white' : 'hover:text-neutral-800'
        }`}
      >
        {hub.label}
      </Link>
      <span className="mx-2 select-none" aria-hidden="true">/</span>
      <span>{project.type}</span>
    </p>
  );
}
