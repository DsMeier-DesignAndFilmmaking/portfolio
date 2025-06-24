'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function TimberTechDetails() {
  const router = useRouter();

  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Navigation */}
        <motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 right-0 z-50 mt-5"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-start">
              {/* Back Button */}
              <div className="py-4">
                <button
                  onClick={handleBackHome}
                  className="hover:opacity-80 transition-opacity flex items-center gap-2 text-gray-900"
                  aria-label="Back to projects"
                >
                  <FaArrowLeft className="w-5 h-5" />
                  <span className="text-[12pt]">Back to Projects</span>
                </button>
              </div>
            </div>
          </div>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12 mt-24"
        >
          {/* Project Overview */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">Project Overview</h2>
            <div className="space-y-8">
              <div className="relative w-full h-[50vh] md:h-[70vh]">
                <Image
                  src="./images/TimberTech-Figma_1.jpg"
                  alt="TimberTech Figma Design 1"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="relative w-full h-[50vh] md:h-[70vh]">
                <Image
                  src="./images/TimberTech-Figma_2.jpg"
                  alt="TimberTech Figma Design 2"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 