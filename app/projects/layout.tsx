import RouteFadeIn from '@/components/RouteFadeIn';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteFadeIn>
      <div className="project-copy">{children}</div>
    </RouteFadeIn>
  );
}
