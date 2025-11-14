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
    title: 'Cultural Context Engine',
    tagline: 'Machine learning system that provides cultural insights and local recommendations.',
    heroImage: '/portfolio/images/travelApp-card.jpg',
    overview: {
      description: 'An intelligent system that analyzes cultural patterns and provides contextual recommendations to help travelers understand and engage with local cultures authentically.',
      goals: [
        'Provide real-time cultural context and insights',
        'Enable deeper cultural understanding for travelers',
        'Support authentic local engagement',
        'Bridge cultural gaps through AI-powered recommendations'
      ],
      outcomes: [
        'Improved cultural engagement scores by 52%',
        'Reduced cultural misunderstandings',
        'Increased local business discovery by 38%'
      ]
    },
    metadata: {
      role: 'Product Designer & AI Strategist',
      skills: ['UX Design', 'AI/ML Integration', 'User Research', 'Data Visualization'],
      tools: ['Figma', 'Python', 'TensorFlow', 'Tableau'],
      timeline: 'Q3 2024 - Present'
    },
    research: {
      title: 'Research & Insights',
      description: 'Conducted ethnographic research and cultural analysis to understand how travelers interact with local cultures and identify opportunities for AI assistance.',
      insights: [
        'Travelers struggle with cultural context in real-time situations',
        'Language barriers limit authentic cultural experiences',
        'Local recommendations often lack cultural depth'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uxDesign: {
      title: 'UX Design & Wireframes',
      description: 'Designed intuitive interfaces for displaying cultural insights and recommendations in contextually relevant moments.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uiDesign: {
      title: 'UI Design & Visuals',
      description: 'Created a visually rich interface that celebrates cultural diversity while maintaining clarity and usability.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    development: {
      title: 'Development & Tech Stack',
      description: 'Built with advanced ML models for cultural pattern recognition and real-time recommendation systems.',
      techStack: [
        'Python',
        'TensorFlow',
        'React Native',
        'Firebase',
        'MongoDB'
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
    title: 'Local Experience Finder',
    tagline: 'Context-aware discovery platform connecting travelers with authentic local experiences.',
    heroImage: '/portfolio/images/travelApp-card.jpg',
    overview: {
      description: 'A discovery platform that uses location, time, and context to surface authentic local experiences that match traveler interests and availability.',
      goals: [
        'Connect travelers with authentic local experiences',
        'Provide context-aware recommendations',
        'Support real-time discovery and booking',
        'Promote local businesses and experiences'
      ],
      outcomes: [
        'Increased local business bookings by 42%',
        'Improved experience discovery by 55%',
        'Higher traveler satisfaction with local experiences'
      ]
    },
    metadata: {
      role: 'Lead Designer & Product Strategist',
      skills: ['UX Design', 'UI Design', 'Product Strategy', 'Market Research'],
      tools: ['Figma', 'Sketch', 'Principle', 'Hotjar'],
      timeline: 'Q2 2024 - Present'
    },
    research: {
      title: 'Research & Insights',
      description: 'Researched how travelers discover local experiences and identified gaps in existing discovery platforms.',
      insights: [
        'Travelers want authentic experiences, not tourist traps',
        'Discovery happens in real-time, not during planning',
        'Context (location, time, weather) matters for recommendations'
      ],
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uxDesign: {
      title: 'UX Design & Wireframes',
      description: 'Designed discovery flows that prioritize context and immediacy while maintaining quality and authenticity.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    uiDesign: {
      title: 'UI Design & Visuals',
      description: 'Created a vibrant, engaging interface that showcases local experiences and encourages exploration.',
      images: [
        '/portfolio/images/travelApp-card.jpg',
        '/portfolio/images/travelApp-card.jpg'
      ]
    },
    development: {
      title: 'Development & Tech Stack',
      description: 'Built with real-time location services, context-aware algorithms, and seamless booking integration.',
      techStack: [
        'React Native',
        'Google Maps API',
        'Stripe',
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
  
  return <TravelProjectDetailClient project={project} />;
}

