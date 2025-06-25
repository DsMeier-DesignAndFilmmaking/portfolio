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
import ViewMoreWorkSection from '../../../../components/ViewMoreWorkSection';

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

// Project data for McDonald's Kiosk
const project = {
  title: "McDonald's Kiosk",
  description: "Partnered with an agency to enhance McDonald's kiosk experience, focusing on improving upsell and cross-sell opportunities through smarter UX and design.",
  heroImage: "/portfolio/images/mcDonalds-card.jpg",
  year: "Product Design",
  stats: {
    users: "1M+",
    countries: "5",
    impact: "90%"
  },
  overview: "Designed and implemented a next-generation self-service kiosk system for McDonald's, enhancing customer experience and operational efficiency.",
  images: [
    "/portfolio/images/4.kiosk core build_ attract screen@2x.png",
    "/portfolio/images/mcDs_kiosk_screen-1.jpg",
    "/portfolio/images/4.kiosk core build_ attract screen@2x.png",
    "/portfolio/images/4.kiosk core build_ attract screen@2x.png"
  ]
};

export default function McDonaldsKioskProjectPage() {
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

      {/* Project Details Subheads for McDonald's Kiosk */}
      <section className="py-0 pb-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row w-full md:w-[70%] justify-between gap-6">
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Role:</p>
              <p>UX & UI Designer</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Duration:</p>
              <p className="whitespace-nowrap">3 Months</p>
            </div>
            <div className="min-h-[60px] flex flex-col justify-start">
              <p className="text-sm text-gray-400">Project Goal:</p>
              <p>Enhance kiosk UX with upsell and cross-sell opportunities</p>
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
      <ViewMoreWorkSection 
        currentProjectId="mcdonalds-kiosk"
        title="More Design Work"
        bgColor="bg-white"
        textColor="text-gray-400"
      />

      {/* Sample Deliverables Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-white">Sample Deliverables</h2>
          <p className="text-gray-300 mb-12 max-w-2xl">
            Explore detailed documentation and deliverables from this project, including wireframes, specifications, and design assets.
          </p>
          <div className="space-y-4 max-w-4xl">
            <a 
              href="/portfolio/documents/DY Cross-sell Up-sell Wireframes 7.8.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Discovery and Plan Deck</h3>
                  <p className="text-gray-400 text-sm">Discovery research and strategic planning documentation for kiosk optimization</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a 
              href="/portfolio/documents/DynamicYield_ConceptFlows.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Dynamic Yield UX</h3>
                  <p className="text-gray-400 text-sm">Kiosk upsell and cross-sell UI enhancements and flows.</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Research & User Testing Results Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-white">Research & User Testing Results</h2>
          <p className="text-gray-300 mb-12 max-w-2xl">
            Key insights from user research and testing sessions.
          </p>
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Pattern Recognition & Efficiency</h3>
                <p className="text-gray-300">Even non-Kiosk users were able to progress through the flow easily due to patterns they recognized and understood (e.g., yellow primary CTAs). The Kiosk seemed to be all about efficiency, avoiding a line, and getting food faster.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Upsell/Cross-sell Tolerance</h3>
                <p className="text-gray-300">Most don't mind the up/cross sell, though pop ups are a little more annoying than options that you can ignore.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Usability Clarity</h3>
                <p className="text-gray-300">From a usability perspective, all of the options for up and cross sell were understood, both from the perspective of not getting items offered and getting items.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Selection & Confirmation Preferences</h3>
                <p className="text-gray-300">The selection step was clear, and it was preferred to not have to go through a confirmation step (a la preference for the cross/and up sell that you can just ignore, but it was overall fine. Users like updates to the pictures to reflect new options.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Efficiency Concerns</h3>
                <p className="text-gray-300">For a few users, there was a desire to move to a Quick Add PDP or quickly add the item to your bag rather than having to go through more steps. Using the kiosk is all about efficiency and some of the cross and upsells seemed to not be super efficient.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Related Item Preferences</h3>
                <p className="text-gray-300">Users wanted the items suggested for U/C Sell to be related items. And if there were no related items to not show anything at all. They preferred the Burger/meal upsell over the coffee one because it was on the page and you didn't have to acknowledge it to move on. Felt less intrusive.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-teal-600 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Customization & Personalization</h3>
                <p className="text-gray-300">Overall preference for customization, though a few didn't want to have to log in to the kiosk and would have preferred to just order on GMA. For a few, suggestions based on weather were not welcome (too invasive, crossing a line), though suggestions based on data/correlations that were more general seemed to be fine. Some people acknowledged that they were kinda weird and always went against the grain, to which customization would benefit them.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-pink-600 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Standard Experience Expectations</h3>
                <p className="text-gray-300">A few said they wouldn't ever utilize the US or CS modules, but their presence wasn't bothersome. Most said that it's kind of standard these days in some sort of checkout or purchase experience, whether digital or physical, so it wasn't out of the ordinary. Most were agreeable.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Beverage Upsell Visibility Issues</h3>
                <p className="text-gray-300">Beverage upsell was not understood in the meal loop. Users could barely see the options and most didn't even notice the module at all. The text was too small to read. No feedback about the size. A few users thought its placement was awkward in between the other options and would have preferred it not to interrupt the beverage options. Most overlooked the 'Thirsty for more?' header and barely noticed the grey background. Test effects here possible, because they could not read the tiles.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-cyan-600 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Meal Upsell Confusion</h3>
                <p className="text-gray-300">A few confused the meal upsell to be customizations on that item rather than different products. Though it made sense that they were different products, the feedback was that it should be related items and not things crossing protein categories, for instance. May have been test effects as they could barely read.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-lime-600 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Coffee Upsell Logic</h3>
                <p className="text-gray-300">The coffee upsell didn't always make sense to users - they preferred there to be some sort of logic - like if you were browsing, upsell could be an option, but if adding directly from product tile (on home screen), don't add suggestions.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-amber-600 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Multiple Item Selection</h3>
                <p className="text-gray-300">On the cross sell drawer after coffee selection, most felt they should be able to select more than one item. If it didn't, they would know how to go select it on their own, but felt that it should allow them to do so.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 