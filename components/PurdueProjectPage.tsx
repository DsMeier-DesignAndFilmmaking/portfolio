'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowRight, FaChartLine, FaUsers, FaClock, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import SystemsModule from './SystemsModule';
import ViewMoreWorkSection from './ViewMoreWorkSection';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';

const StatCard = ({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
    <Icon className="w-8 h-8 text-[#cfb991] mb-4" />
    <div className="text-3xl font-bold text-white mb-2">{value}</div>
    <div className="text-gray-400">{label}</div>
  </div>
);

export default function PurdueProjectPage() {

  return (
    <div className="min-h-screen bg-black text-white">
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
              <Link
                href="/projects/previous"
                className="hover:opacity-80 transition-opacity flex items-center gap-2 text-white"
                aria-label="Back to projects"
              >
                <FaArrowLeft className="w-5 h-5" />
                <span className="text-[12pt]">Back to Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center pt-20 md:pt-0" aria-label="Project Hero">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black z-10" />
        <div className="absolute inset-0">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/PU-Memorial-Mall-DJI.jpg`}
            alt="Purdue University Campus"
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
            className="max-w-2xl mt-[120px] md:mt-[100px]"
          >
            <div className="mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-[#e6cfa3]" aria-hidden="true"></div>
              <ProjectBreadcrumb projectId="purdue" onDark />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-[#e6cfa3]">
                Purdue University
              </span>
              <br />
              <span className="text-white">Website Audits & Redesigns</span>
            </h1>
            <p className="text-lg md:text-xl text-white leading-relaxed">
              Lead design for multiple high-visibility Purdue University web and digital projects across various departments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard icon={FaChartLine} value="1,500+" label="Enhanced and Migrated URLs" />
            <StatCard icon={FaUsers} value="44k" label="Avg. Monthly Visitors" />
            <StatCard icon={FaClock} value="1.5M" label="Page Views" />
            <StatCard icon={FaCheckCircle} value="132k" label="Event Count" />
          </div>
          <p className="text-sm text-gray-400 mt-4">* GA data from Jan - Mar 2025</p>
        </div>
      </section>

      {/* Project Overview */}
      <section id="overview" className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="pt-0">
              <h2 className="text-3xl font-bold mb-6 text-[#cfb991]">
                Overview
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaArrowRight className="text-[#cfb991]" />
                  <span>Website Audit & Analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaArrowRight className="text-[#cfb991]" />
                  <span>Information architecture restructuring</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaArrowRight className="text-[#cfb991]" />
                  <span>UI/UX design and prototyping</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaArrowRight className="text-[#cfb991]" />
                  <span>Full website UI and content overhaul</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-[12pt] font-normal text-gray-300 mb-4 uppercase">Tools Used:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#cfb991] rounded-full"></div>
                    <span>Figma (AI)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#cfb991] rounded-full"></div>
                    <span>Sitebulb</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#cfb991] rounded-full"></div>
                    <span>ChatGPT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#cfb991] rounded-full"></div>
                    <span>Google Analytics</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative aspect-[3024/1964] rounded-xl overflow-hidden bg-black/20">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/sitebulb-screenshot_1.jpg`}
                  alt="Sitebulb Screenshot"
                  fill
                  className="object-contain rounded-lg shadow-lg"
                />
              </div>
              <div className="relative aspect-[2648/1156] rounded-xl overflow-hidden bg-black/20">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Sitebulb-duplicateGraph.jpg`}
                  alt="Sitebulb Duplicate Graph"
                  fill
                  className="object-contain rounded-lg shadow-lg"
                />
              </div>
              <div className="relative aspect-[1512/905] rounded-xl overflow-hidden bg-black/20">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/GA-EventsScreenshot 1.png`}
                  alt="Google Analytics Events Screenshot"
                  fill
                  className="object-contain rounded-lg shadow-lg"
                />
              </div>
              <div className="relative aspect-[2936/1344] rounded-xl overflow-hidden bg-black/20">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/crawl_force-directed_www_purdue_edu_202506072022.png`}
                  alt="Purdue.edu Crawl Force Directed Graph"
                  fill
                  className="object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-black/40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-medium text-white/90 leading-relaxed">
              "We want to better align Admissions, About Us, Recruitment, Postdoctoral Scholars, OGA, and Fellowships pages with new organizational objectives to support recruitment and postdocs while enabling stakeholders to quickly access essential information."
            </blockquote>
            <div className="mt-6 text-gray-400">
              <p className="font-medium">Purdue Graduate School Leadership Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Website Screenshots */}
      <section id="current-website" className="py-20 bg-black/40">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-[#cfb991]">
            Old Website
          </h2>
          <p className="text-gray-300 mb-12 max-w-[calc(50%-1rem)]">
            Many of Purdue University's websites are cluttered, hard to navigate, and stuck in an outdated design. Users often struggle to find key information, and the overall experience felt behind the times.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Navigation */}
            <div className="space-y-4">
              <div className="relative aspect-[1512/899] rounded-lg overflow-hidden bg-black/20 shadow-xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Existing-howToApply_Screenshot (2).jpg`}
                  alt="Existing How To Apply Screenshot 2"
                  fill
                  className="object-contain rounded-lg shadow-lg"
                />
              </div>
              <p className="text-sm text-gray-400">Navigation</p>
            </div>

            {/* Program Page */}
            <div className="space-y-4">
              <div className="relative aspect-[1512/899] rounded-lg overflow-hidden bg-black/20 shadow-xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Existing-howToApply_Screenshot (1).jpg`}
                  alt="Existing How To Apply Screenshot 1"
                  fill
                  className="object-contain rounded-lg shadow-lg"
                />
              </div>
              <p className="text-sm text-gray-400">Program Page</p>
            </div>

            {/* How to Apply */}
            <div className="space-y-4">
              <div className="relative aspect-[1512/899] rounded-lg overflow-hidden bg-black/20 shadow-xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Existing-howToApply_Screenshot.jpg`}
                  alt="Existing How To Apply Screenshot"
                  fill
                  className="object-contain rounded-lg shadow-lg"
                />
              </div>
              <p className="text-sm text-gray-400">How to Apply</p>
            </div>

            {/* Application Page */}
            <div className="space-y-4">
              <div className="relative aspect-[1512/899] rounded-lg overflow-hidden bg-black/20 shadow-xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Existing-fellowships_Screenshot.jpg`}
                  alt="Existing Fellowships Screenshot"
                  fill
                  className="object-contain rounded-lg shadow-lg"
                />
              </div>
              <p className="text-sm text-gray-400">Fellowships Landing Page</p>
            </div>
          </div>
        </div>
      </section>

      {/* Website Performance Metrics */}
      <section id="performance" className="py-20 bg-black/40">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-[#cfb991]">
            Performance & Analytics
          </h2>
          <p className="text-gray-300 mb-12 max-w-[calc(50%-1rem)]">
            Key metrics and insights from our comprehensive website audit, highlighting areas for improvement and optimization (GA and Sitebulb analytics).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard 
              icon={FaChartLine} 
              value="2.8s" 
              label="Average Page Load Time" 
            />
            <StatCard 
              icon={FaUsers} 
              value="68%" 
              label="Bounce Rate" 
            />
            <StatCard 
              icon={FaClock} 
              value="1m 45s" 
              label="Avg. Session Duration" 
            />
            <StatCard 
              icon={FaCheckCircle} 
              value="42%" 
              label="Mobile Traffic" 
            />
          </div>
          <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-[#cfb991] mb-4">Key Findings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaArrowRight className="text-[#cfb991]" />
                  <span className="text-gray-300">High bounce rate indicates poor content engagement</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaArrowRight className="text-[#cfb991]" />
                  <span className="text-gray-300">Slow page load times affecting user experience</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaArrowRight className="text-[#cfb991]" />
                  <span className="text-gray-300">Mobile optimization needs improvement</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaArrowRight className="text-[#cfb991]" />
                  <span className="text-gray-300">Navigation structure causing user confusion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <SystemsModule
        heading="Systems Approach"
        introText="Purdue's web presence isn't one site — it's dozens of department sites that drift into duplicate pages and orphaned content over time. The Sitebulb crawl and duplicate-content graph weren't QA tools after the fact, they were how the actual shape of the system got diagnosed before any screen was redesigned."
        decisionPoints={[
          'Crawl & audit → flag duplicate/orphaned pages',
          'Stakeholder alignment (Admissions, Recruitment, OGA, Fellowships) → which pages merge vs. stay separate',
          'IA restructure → modular CMS template assignment',
          'URL migration → redirect mapping',
        ]}
        metrics={[
          { value: '1,500+', label: 'Enhanced & Migrated URLs', isPlaceholder: false },
          { value: '340 → 12', label: 'Duplicate Page Clusters Resolved', isPlaceholder: true },
          { value: '6 → 3', label: 'Clicks to Reach Key Content (Crawl Depth)', isPlaceholder: true },
        ]}
        feedbackLoop="Post-launch, the site was re-crawled with Sitebulb to confirm duplicate content actually dropped and migrated URLs resolved correctly — audit, redesign, re-audit."
        systemMap={[
          { label: 'Crawl & Audit (Sitebulb)' },
          { label: 'Identify Duplicate/Orphaned Pages' },
          { label: 'Stakeholder Alignment', branch: ['Admissions', 'Recruitment', 'OGA', 'Fellowships'] },
          { label: 'IA Restructure → Modular CMS Templates' },
          { label: 'URL Migration' },
          { label: 'Re-Crawl to Validate' },
        ]}
      />

      {/* Design in Progress */}
      <section id="design" className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-[#cfb991] text-center">
            New Design
          </h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto text-center">
            Along with improving information hierarchy and user experience, the redesign delivers a modern, accessible interface and a modular CMS design system that allows Purdue's teams to manage and scale content with ease.
          </p>
          <div className="space-y-4">
            <div className="relative w-full aspect-[5/3] rounded-lg overflow-hidden bg-black/20 shadow-xl">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/purdue_homepage_screenshot.jpg`}
                alt="Purdue OGSPS Website Screenshot"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="mt-12 text-center">
            <a
              href="https://www.purdue.edu/academics/ogsps/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-[#cfb991] text-black font-semibold rounded-lg hover:bg-[#d4c19f] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View Live Site
              <FaArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      <ViewMoreWorkSection
        currentProjectId="purdue"
        bgColor="bg-black"
        textColor="text-gray-400"
      />
    </div>
  );
} 