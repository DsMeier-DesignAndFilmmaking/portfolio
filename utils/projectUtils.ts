import { clientWorkProjects } from '@/data/projects';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  year: string;
}

export const allProjects: Project[] = clientWorkProjects.map((p) => ({
  id: p.id,
  title: p.title,
  description: p.summary,
  imageUrl: p.imageUrl ?? '',
  year: p.legacyLabel ?? p.type,
}));

export function getNextProjects(currentProjectId: string, count: number = 4): Project[] {
  const currentIndex = allProjects.findIndex((project) => project.id === currentProjectId);
  if (currentIndex === -1) {
    return allProjects.slice(0, count);
  }

  const nextProjects: Project[] = [];
  for (let i = 1; i <= count; i++) {
    const nextIndex = (currentIndex + i) % allProjects.length;
    nextProjects.push(allProjects[nextIndex]);
  }

  return nextProjects;
}
