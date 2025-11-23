import TravelProjectDetailClient from './TravelProjectDetailClient';

// Project data structure - replace with actual data
const projectData: Record<string, any> = {
  'spontaneous-travel-companion': {
    title: 'Spontaneous Travel Companion',
    tagline: 'AI-powered tool that helps travelers discover authentic experiences in real-time.',
    heroImage: '/portfolio/images/travelApp-card.jpg',
    overview: {
      description: 'A comprehensive travel companion application designed to support spontaneous exploration through intelligent, context-aware recommendations.',
      goals: [
        'Enable real-time discovery of authentic local experiences',
        'Provide cultural context and insights for travelers',
        'Support spontaneous decision-making with AI-powered suggestions',
        'Connect travelers with meaningful, off-the-beaten-path opportunities'
      ],
      outcomes: [
        'Increased user engagement by 45%',
        'Improved travel satisfaction scores',
        'Reduced planning time by 60%'
      ]
    },
    metadata: {
      role: 'Lead Designer & Product Strategist',
      skills: ['UX Design', 'UI Design', 'Product Strategy', 'User Research'],
      tools: ['Figma', 'Framer', 'Principle', 'Miro'],
      timeline: 'Q2 2024 - Present'
    },
    research: {
      title: 'Research & Insights',
      description: 'Conducted extensive user research to understand the pain points of spontaneous travelers and identify opportunities for AI-powered solutions.',
      insights: [
        '73% of travelers prefer spontaneous experiences over rigid itineraries',
        '68% struggle with last-minute planning and logistics',
        '89% want AI-powered personalized recommendations'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uxDesign: {
      title: 'UX Design & Wireframes',
      description: 'Developed user flows and wireframes focusing on intuitive navigation and quick access to contextual information.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uiDesign: {
      title: 'UI Design & Visuals',
      description: 'Created a modern, clean interface that balances information density with visual clarity, using a travel-inspired color palette.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    development: {
      title: 'Development & Tech Stack',
      description: 'Built with modern technologies focusing on performance, offline capabilities, and real-time AI integration.',
      techStack: [
        'React Native',
        'Firebase',
        'OpenAI API',
        'MongoDB',
        'Node.js'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    links: {
      prototype: '#',
      liveDemo: '#',
      caseStudy: '#'
    }
  },
  'cultural-context-engine': {
    title: 'Trust & Authenticity Layer for Travel AI',
    tagline: 'A systems-design approach to solving authenticity, transparency, and reliability in AI-powered travel experiences.',
    heroImage: '/portfolio/images/travelApp-card.jpg',
    overview: {
      description: 'An early-stage R&D project addressing the growing trust crisis in travel recommendations. As travelers increasingly distrust AI-generated itineraries, online reviews, and travel content, this project explores systems-level solutions for establishing authenticity, transparency, and reliability in AI-powered travel experiences.',
      goals: [
        'Solve the trust crisis in travel recommendations and AI-generated content',
        'Establish transparency and source provenance for travel AI systems',
        'Develop confidence scoring mechanisms for recommendations',
        'Create verification systems for real traveler data and experiences'
      ],
      outcomes: [
        'Early-stage research project — outcomes to be measured',
        'Identified key trust signals and verification mechanisms',
        'Developed initial framework for authenticity scoring'
      ]
    },
    metadata: {
      role: 'Product Designer & Research Strategist',
      skills: ['UX Research', 'Systems Design', 'Product Strategy', 'Market Research'],
      tools: ['Figma', 'Miro', 'Notion', 'Research Tools'],
      timeline: 'Q4 2024 - Present (Early R&D)'
    },
    research: {
      title: 'The Problem: Trust Crisis in Travel',
      description: 'Industry research reveals growing concerns about traveler trust in recommendations and reviews. While studies show consumers still rely on online reviews, manipulation and fraud concerns are rising. The Federal Trade Commission has taken enforcement action against fake review schemes, including cases affecting major travel platforms. Gen Z travelers demonstrate particular skepticism toward AI-generated content and automated recommendations. Major platforms like TripAdvisor, Booking.com, and Airbnb face ongoing credibility challenges as users increasingly question review authenticity and AI-generated travel content reliability.',
      insights: [
        'BrightLocal (2023) reports that while 79% of consumers trust reviews, concerns about manipulation are growing, with many users questioning review authenticity',
        'FTC enforcement actions (2023-2024) reveal widespread fake review schemes affecting travel and hospitality platforms, highlighting systemic trust issues',
        'Pew Research Center (2023) indicates Gen Z shows higher skepticism toward AI-generated content and automated recommendations compared to older generations',
        'Industry reports show significant portions of users question review authenticity on major platforms, creating a credibility crisis for review-based systems',
        'AI hallucinations in travel content create misinformation risks, with studies showing travelers want transparency in source attribution and verification',
        'Research indicates travelers increasingly demand transparency in recommendation sources, with many preferring verified, human-generated insights over AI-only content'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uxDesign: {
      title: 'Initial Concepts & Hypotheses',
      description: 'Early exploration of trust signals, source provenance, and confidence scoring mechanisms. Concepts include visual indicators for recommendation reliability, source attribution for AI-generated content, and verification systems that distinguish real traveler experiences from manipulated data.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uiDesign: {
      title: 'Concept Visualizations',
      description: 'Placeholder visualizations exploring how trust and authenticity could be communicated in travel AI interfaces. Concepts include: trust signal indicators, source provenance displays, confidence scoring visualizations, and verification badges for real traveler data.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    development: {
      title: 'R&D Approach & Next Steps',
      description: 'Early-stage research focusing on systems design, verification mechanisms, and user perception studies. Next steps include developing prototype trust indicators, testing confidence scoring models, and validating authenticity verification systems with real traveler data.',
      techStack: [
        'Research & Prototyping',
        'Systems Design',
        'User Testing',
        'Data Analysis',
        'Concept Validation'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    links: {
      prototype: '#',
      liveDemo: '#',
      caseStudy: '#'
    }
  },
  'travel-planning-assistant': {
    title: 'Travel Planning Assistant',
    tagline: 'Intelligent assistant that adapts to spontaneous travel preferences and constraints.',
    heroImage: '/portfolio/images/travelApp-card.jpg',
    overview: {
      description: 'An AI-powered planning assistant that helps travelers make informed decisions on-the-fly while maintaining flexibility for spontaneous exploration.',
      goals: [
        'Support flexible, adaptive travel planning',
        'Provide intelligent recommendations based on preferences',
        'Handle last-minute changes and constraints',
        'Balance planning with spontaneity'
      ],
      outcomes: [
        'Reduced planning time by 65%',
        'Increased trip satisfaction by 48%',
        'Improved adaptability to changes'
      ]
    },
    metadata: {
      role: 'UX Designer & Product Manager',
      skills: ['UX Design', 'Product Management', 'User Research', 'Prototyping'],
      tools: ['Figma', 'Framer', 'Miro', 'Notion'],
      timeline: 'Q1 2024 - Q3 2024'
    },
    research: {
      title: 'Research & Insights',
      description: 'Studied how travelers balance planning with spontaneity and identified pain points in adaptive planning workflows.',
      insights: [
        'Travelers want flexibility but also need structure',
        'Last-minute changes cause significant stress',
        'AI can help balance planning and spontaneity'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uxDesign: {
      title: 'UX Design & Wireframes',
      description: 'Designed conversational interfaces and adaptive planning flows that feel natural and supportive.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uiDesign: {
      title: 'UI Design & Visuals',
      description: 'Created a friendly, approachable interface that feels like a helpful travel companion.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    development: {
      title: 'Development & Tech Stack',
      description: 'Built with conversational AI and adaptive planning algorithms that learn from user preferences.',
      techStack: [
        'React',
        'OpenAI API',
        'Node.js',
        'PostgreSQL',
        'Redis'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    links: {
      prototype: '#',
      liveDemo: '#',
      caseStudy: '#'
    }
  },
  'local-experience-finder': {
    title: 'A Social Layer for Global Exploration',
    tagline: 'Platform that connects travelers through shared experiences, real-time insights, and community-driven recommendations to enhance global exploration.',
    heroImage: '/portfolio/images/travelApp-card.jpg',
    overview: {
      description: 'A social travel platform that visualizes global traveler presence through live heatmaps, enables personal travel portfolios showcasing journeys and aspirations, and fosters connections between explorers worldwide through profiles, wishlists, and real-time insights.',
      goals: [
        'Create a live global heatmap showing traveler presence and activity',
        'Enable personal travel portfolios documenting journeys and future destinations',
        'Facilitate discovery through viewing other travelers\' profiles and wishlists',
        'Build a social layer for sharing travel insights and connecting explorers'
      ],
      outcomes: [
        'Increased global traveler connections by 68%',
        'Improved travel inspiration through portfolio discovery by 52%',
        'Enhanced community engagement and knowledge sharing'
      ]
    },
    metadata: {
      role: 'Lead Designer & Product Strategist',
      skills: ['UX Design', 'UI Design', 'Product Strategy', 'Social Platform Design'],
      tools: ['Figma', 'Sketch', 'Principle', 'Hotjar'],
      timeline: 'Q2 2024 - Present'
    },
    research: {
      title: 'Research & Insights',
      description: 'Studied how travelers build identity through their journeys, how they discover destinations through others\' experiences, and the value of social connections in global exploration.',
      insights: [
        'Travelers want to see where others are exploring in real-time',
        'Personal travel portfolios help travelers express their global identity',
        'Viewing others\' wishlists and journeys inspires future exploration',
        'Social connections enhance travel discovery beyond traditional recommendations'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uxDesign: {
      title: 'UX Design & Wireframes',
      description: 'Designed intuitive flows for global heatmap navigation, portfolio creation and viewing, profile discovery, and social interaction features that prioritize identity, discovery, and global presence.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uiDesign: {
      title: 'UI Design & Visuals',
      description: 'Created a visually compelling interface that celebrates global exploration, showcases travel portfolios beautifully, and makes the world feel connected through real-time traveler presence.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    development: {
      title: 'Development & Tech Stack',
      description: 'Built with real-time mapping services, social graph infrastructure, portfolio management systems, and chat capabilities to enable global traveler connections.',
      techStack: [
        'React Native',
        'Google Maps API',
        'WebSocket',
        'Firebase',
        'Node.js'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    links: {
      prototype: '#',
      liveDemo: '#',
      caseStudy: '#'
    }
  }
};

// Generate static params for all project IDs
export function generateStaticParams() {
  return [
    { projectId: 'spontaneous-travel-companion' },
    { projectId: 'cultural-context-engine' },
    { projectId: 'travel-planning-assistant' },
    { projectId: 'local-experience-finder' }
  ];
}

export default function TravelProjectDetailPage({ params }: { params: { projectId: string } }) {
  const project = projectData[params?.projectId || ''];
  
  return <TravelProjectDetailClient project={project} projectId={params?.projectId || ''} />;
}

