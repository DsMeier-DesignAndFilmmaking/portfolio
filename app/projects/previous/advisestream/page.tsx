'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaCode,
  FaLink,
  FaLayerGroup,
  FaChartLine,
  FaUsers,
  FaUserFriends,
  FaSyncAlt,
  FaChalkboardTeacher,
  FaClock,
  FaHospital,
  FaUserMd,
  FaClinicMedical,
  FaHeartbeat,
  FaNetworkWired,
  FaCode as FaCodeIcon,
  FaUserFriends as FaUserFriendsIcon,
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageTransitionOverlay from '../../../../components/PageTransitionOverlay';

const StatCard = ({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
    <div className="pt-0">
      <Icon className="w-8 h-8 text-white mb-4" />
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  </div>
);

const ClientIcon = ({ icon: Icon, label, imageSrc, isLarge, align = 'center' }: { icon?: React.ElementType; label: string; imageSrc?: string; isLarge?: boolean; align?: 'left' | 'center' }) => (
  <div className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 ${isLarge ? 'p-12' : 'p-6'} flex flex-col ${align === 'center' ? 'items-center justify-center' : 'items-start justify-start'}`}>
    <div className={`pt-0 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={label}
          width={isLarge ? 64 : 32}
          height={isLarge ? 64 : 32}
          className={`mb-4 ${align === 'center' ? 'mx-auto' : ''}`}
        />
      ) : (
        Icon && <Icon className={`${isLarge ? 'w-16 h-16' : 'w-8 h-8'} text-white mb-4 ${align === 'center' ? 'mx-auto' : ''}`} />
      )}
      <div className="text-gray-400">{label}</div>
    </div>
  </div>
);

// Project data for AdviseStream
const project = {
  title: "AdviseStream",
  description: "Designed a digital platform to connect healthcare professionals and resources across developing nations, focusing on improving access to medical expertise and knowledge sharing.",
  heroImage: "/portfolio/images/Advistestream_mockup-createReport.jpg",
  year: "Product Design",
  stats: {
    users: "15k+",
    countries: "12",
    impact: "78%"
  },
  overview: "Created a comprehensive digital platform designed to bridge the gap between healthcare professionals in developing regions and global medical resources.",
  images: [
    "/portfolio/images/Web 1920 – 67.png",
    "/portfolio/images/Web 1920 – 67.png",
    "/portfolio/images/Web 1920 – 67.png"
  ]
};

export default function AdviseStreamProjectPage() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/projects/previous/');
    }, 500);
  };

  const handleBackHome = () => {
    router.push('/projects/previous/');
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <AnimatePresence>
        {isTransitioning && <PageTransitionOverlay />}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 right-0 z-50 mt-5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-start">
            {/* Back Button */}
            <div className="py-4">
              <button
                onClick={handleBackHome}
                className="hover:opacity-80 transition-opacity flex items-center gap-2 text-white"
                aria-label="Back to projects"
              >
                <FaArrowLeft className="w-5 h-5" />
                <span className="text-[12pt]">Back to Projects</span>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center" aria-label="Project Hero">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black z-10" />
        <div className="absolute inset-0">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mt-[100px]"
          >
            <div className="inline-flex items-center gap-2 text-white text-sm font-medium mb-6">
              <span className="text-gray-400">{project.year}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">
                {project.title}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Details Subheads for AdviseStream */}
      <section className="py-0 pb-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row w-full md:w-[70%] justify-between gap-6">
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Role:</p>
              <p>Product Designer</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Duration:</p>
              <p className="whitespace-nowrap">6 Months</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Project Goal:</p>
              <p>Connect healthcare professionals in developing regions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard icon={FaUsers} value={project.stats.users} label="Users" />
            <StatCard icon={FaChartLine} value={project.stats.countries} label="Countries" />
            <StatCard icon={FaCheckCircle} value={project.stats.impact} label="Impact" />
          </div>
        </div>
      </section>

      {/* Project Images Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="space-y-8">
            {project.images.map((image, index) => (
              <div key={index} className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-base font-normal mb-12 text-center text-gray-400">
            More Design Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Project Card 1 */}
            <Link href="/projects/previous/mcdonalds-kiosk" className="group">
              <div className="group relative w-full h-[300px] overflow-hidden rounded-xl">
                <Image
                  src="/portfolio/images/mcDonalds-card.jpg"
                  alt="McDonalds Kiosk"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">McDonalds Kiosk</h3>
                  <p className="text-sm text-gray-200 mb-4">Innovative self-service ordering experience</p>
                  <div className="inline-flex items-center font-medium text-white hover:text-gray-300 transition-colors">
                    View Project
                  </div>
                </div>
              </div>
            </Link>

            {/* Project Card 2 */}
            <Link href="/projects/previous/sphere-software" className="group">
              <div className="group relative w-full h-[300px] overflow-hidden rounded-xl">
                <Image
                  src="/portfolio/images/sphere-card.jpg"
                  alt="Sphere Software"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Sphere Software</h3>
                  <p className="text-sm text-gray-200 mb-4">Innovative software solutions for modern businesses</p>
                  <div className="inline-flex items-center font-medium text-white hover:text-gray-300 transition-colors">
                    View Project
                  </div>
                </div>
              </div>
            </Link>

            {/* Project Card 3 */}
            <Link href="/projects/previous/havas-agency" className="group">
              <div className="group relative w-full h-[300px] overflow-hidden rounded-xl">
                <Image
                  src="/portfolio/images/havas-card.jpg"
                  alt="Havas Agency"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Havas Agency</h3>
                  <p className="text-sm text-gray-200 mb-4">Creative digital solutions for global advertising</p>
                  <div className="inline-flex items-center font-medium text-white hover:text-gray-300 transition-colors">
                    View Project
                  </div>
                </div>
              </div>
            </Link>

            {/* Project Card 4 */}
            <Link href="/projects/previous/rich-products" className="group">
              <div className="group relative w-full h-[300px] overflow-hidden rounded-xl">
                <Image
                  src="/portfolio/images/richProducts-card.jpg"
                  alt="Rich Products"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Rich Products</h3>
                  <p className="text-sm text-gray-200 mb-4">Digital transformation for food industry leader</p>
                  <div className="inline-flex items-center font-medium text-white hover:text-gray-300 transition-colors">
                    View Project
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 