export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  year: string;
}

export const allProjects: Project[] = [
  {
    id: 'timbertech',
    title: "TimberTech",
    description: "A full redesign for TimberTech.com and their existing design system.",
    imageUrl: "/portfolio/images/timbertech-card.jpg",
    year: "Web Design"
  },
  {
    id: 'healthcare',
    title: "Healthcare",
    description: "A digital platform designed to connect healthcare professionals and patients across developing nations.",
    imageUrl: "/portfolio/images/healthcare-card.jpg",
    year: "IA & UI"
  },
  {
    id: 'mcdonalds-kiosk',
    title: "McDonalds Kiosk",
    description: "A digital platform designed to connect healthcare professionals and resources across developing nations.",
    imageUrl: "/portfolio/images/mcDonalds-card.jpg",
    year: "Product Design"
  },
  {
    id: 'intel',
    title: "Intel",
    description: "A sustainability tracking application helping businesses monitor and reduce their environmental impact.",
    imageUrl: "/portfolio/images/heroGraphic.jpg",
    year: "Market Research"
  },
  {
    id: 'nodalytics',
    title: "Nodalytics",
    description: "A digital platform designed to connect healthcare professionals and resources across developing nations.",
    imageUrl: "/portfolio/images/Nodalytics_heroGraphic-3.jpg",
    year: "Product Design"
  },
  {
    id: 'newdea',
    title: "Newdea",
    description: "A digital platform designed to connect healthcare professionals and resources across developing nations.",
    imageUrl: "/portfolio/images/newdea_hero_containerGraphic-5.jpg",
    year: "Product Design"
  },
  {
    id: 'doublegood',
    title: "DoubleGood",
    description: "Worked on UX and UI enhancements for a Chicago-based inner-city fundraising platform.",
    imageUrl: "/portfolio/images/doubleGoodImage.webp",
    year: "Web Design (Mobile)"
  },
  {
    id: 'advisestream',
    title: "AdviseStream",
    description: "A digital platform designed to connect healthcare professionals and resources across developing nations.",
    imageUrl: "/portfolio/images/Advistestream_mockup-createReport.jpg",
    year: "Product Design"
  },
  {
    id: 'sphere-software',
    title: "Sphere Software",
    description: "A digital platform designed to connect healthcare professionals and resources across developing nations.",
    imageUrl: "/portfolio/images/chairliftAllScreens.png",
    year: "Product & Web Design"
  },
  {
    id: 'havas-agency',
    title: "Havas Agency",
    description: "A digital platform designed to connect healthcare professionals and resources across developing nations.",
    imageUrl: "/portfolio/images/havas-card.jpg",
    year: "UX & Web Design"
  },
  {
    id: 'rich-products',
    title: "Rich Products",
    description: "A digital platform designed to connect healthcare professionals and resources across developing nations.",
    imageUrl: "/portfolio/images/websiteCards_template.png",
    year: "IA & Web Design"
  }
];

export function getNextProjects(currentProjectId: string, count: number = 4): Project[] {
  const currentIndex = allProjects.findIndex(project => project.id === currentProjectId);
  if (currentIndex === -1) {
    // If current project not found, return first 4 projects
    return allProjects.slice(0, count);
  }
  
  // Get the next projects, wrapping around to the beginning if needed
  const nextProjects: Project[] = [];
  for (let i = 1; i <= count; i++) {
    const nextIndex = (currentIndex + i) % allProjects.length;
    nextProjects.push(allProjects[nextIndex]);
  }
  
  return nextProjects;
} 