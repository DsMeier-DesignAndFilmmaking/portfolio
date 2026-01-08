'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link: string;
  currentProject?: boolean;
  ongoingClient?: boolean;
  'data-project'?: string;
}

export default function ProjectCard({ title, description, imageUrl, tags, link, currentProject, ongoingClient, 'data-project': dataProject }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden transition-shadow duration-300"
      data-project={dataProject}
    >

      <div className="relative h-[480px] w-full overflow-hidden">
        <div className="relative w-[70%] h-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          {currentProject && (
            <div className="absolute top-[20px] left-0 z-10">
              <div className="bg-[#cfb991] text-black text-xs font-medium px-7 py-1 transform -rotate-45 -translate-x-8 translate-y-2">
                Current Project
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          {ongoingClient && (
            <div className="absolute top-4 right-[5%] z-10">
              <span className="inline-block bg-black text-[#cfb991] text-xs font-medium px-2 py-1 rounded border border-white">
                Ongoing Client
              </span>
            </div>
          )}
          <div className="w-[90%] pt-6 px-6 pb-8 md:pb-6 text-gray-900 bg-white h-[220px] md:h-[220px] min-h-[240px] flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="mb-4 text-gray-600">{description}</p>
            </div>
            
            <Link
              href={link}
              className="inline-flex items-center font-medium text-gray-900 hover:text-gray-600 transition-colors hover:underline"
            >
              {title === "Purdue University" 
                ? "View Work" 
                : title === "Travel & AI" 
                ? "View Case Studies" 
                : title === "The Archive"
                ? "View Projects"
                : "View Projects"}
              <motion.svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 