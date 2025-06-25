'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getNextProjects } from '../utils/projectUtils';

interface ViewMoreWorkSectionProps {
  currentProjectId: string;
  title?: string;
  bgColor?: string;
  textColor?: string;
}

export default function ViewMoreWorkSection({ 
  currentProjectId, 
  title = "View More Work",
  bgColor = "bg-white",
  textColor = "text-gray-400"
}: ViewMoreWorkSectionProps) {
  const nextProjects = getNextProjects(currentProjectId, 4);

  return (
    <section className={`py-20 ${bgColor}`}>
      <div className="container mx-auto px-6">
        <h2 className={`text-base font-normal mb-12 text-center ${textColor}`}>
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nextProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/projects/previous/${project.id}`} className="group">
                <div className="group relative w-full h-[300px] overflow-hidden rounded-xl">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-xs text-gray-300 mb-1">{project.year}</p>
                    <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-200 mb-3 line-clamp-2">{project.description}</p>
                    <div className="inline-flex items-center font-medium text-white hover:text-gray-300 transition-colors">
                      View Project
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 