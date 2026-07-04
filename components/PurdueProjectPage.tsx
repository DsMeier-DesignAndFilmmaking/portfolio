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
                    <span>Figma</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#cfb991] rounded-full"></div>
                    <span>Sitebulb</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#cfb991] rounded-full"></div>
                    <span>Github</span>
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

      {/* Systems Architecture Deliverables Section */}
      <section aria-labelledby="system-artifacts-heading" className="bg-black pb-20 pt-0">
        <div className="container mx-auto px-6">
          <div className="border-t border-white/10 pt-16">
            <div className="mb-4 whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
              [ SYSTEM ARTIFACTS & BLUEPRINTS ]
            </div>

            <h2 id="system-artifacts-heading" className="mb-6 text-2xl font-bold text-white md:text-3xl">
              Mapping Institutional Policy onto Modular Infrastructure
            </h2>

            <p className="mb-12 max-w-3xl text-sm leading-relaxed text-gray-300">
              To satisfy the cross-departmental requirements of the Purdue Graduate School Leadership Team, the redesign abandoned isolated page layout construction. Instead, we developed a series of multi-tenant system blueprints to align Admissions, OGA, and Postdoctoral pipelines into a single, cohesive interface engine that handles user routing exceptions programmatically.
            </p>

            <div className="space-y-8">
              {/* Layer 01 // Substrate */}
              <article className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0A] p-6 transition-colors duration-200 hover:border-white/25">
                <div className="mb-3 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#cfb991]">
                  [ LAYER 01 // SUBSTRATE ]
                </div>
                <h3 className="mb-6 border-b border-white/5 pb-2 text-base font-medium text-white">
                  Cross-Departmental ERD Schema
                </h3>

	                <div className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-neutral-950 p-5 font-mono text-xs md:min-h-[420px]">
	                  <div className="grid w-full max-w-full grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6" aria-label="Institutional identity graph connecting admissions and graduate school ecosystems">
	                    <div className="rounded-lg border border-white/5 bg-white/[0.015] p-4 md:p-5">
	                      <div className="mb-4 text-center text-[11px] uppercase tracking-[0.14em] text-neutral-600 md:text-xs">
	                        Admissions ecosystem
	                      </div>
	                      <div className="space-y-3">
	                        {['Application', 'Recruitment', 'Program Interest'].map((node) => (
	                          <div key={node} className="rounded border border-white/10 bg-white/[0.02] px-3 py-2 text-center text-sm font-medium leading-snug text-neutral-300 md:text-[15px]">
	                            {node}
	                          </div>
	                        ))}
	                      </div>
	                    </div>

                    <div className="flex flex-col items-center justify-center md:h-full md:flex-row">
                      <div aria-hidden="true" className="h-7 w-px bg-white/15 md:h-px md:w-8" />
	                      <div className="relative rounded-full border border-[#cfb991]/30 bg-[#cfb991]/10 px-6 py-5 text-center shadow-[0_0_0_1px_rgba(207,185,145,0.04)]">
	                        <div className="text-sm font-semibold leading-tight text-[#cfb991] md:text-base">Institutional Identity</div>
	                        <div className="mt-1 text-xs leading-tight text-neutral-500 md:text-sm">Person / Institution ID</div>
	                      </div>
	                      <div aria-hidden="true" className="h-7 w-px bg-white/15 md:h-px md:w-8" />
	                    </div>

	                    <div className="rounded-lg border border-white/5 bg-white/[0.015] p-4 md:p-5">
	                      <div className="mb-4 text-center text-[11px] uppercase tracking-[0.14em] text-neutral-600 md:text-xs">
	                        Graduate + postdoc
	                      </div>
	                      <div className="space-y-3">
	                        {['Funding', 'Appointment', 'Fellowship'].map((node) => (
	                          <div key={node} className="rounded border border-white/10 bg-white/[0.02] px-3 py-2 text-center text-sm font-medium leading-snug text-neutral-300 md:text-[15px]">
	                            {node}
	                          </div>
	                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-wider text-gray-500">
                  Engine: Relational Taxonomy Map
                </div>
                <p className="mt-4 max-w-[60ch] font-sans text-xs leading-relaxed text-gray-400">
                  A baseline taxonomy resolves the point where admissions data and postdoctoral records describe the same person, allowing one institutional identity to move cleanly across departmental systems.
                </p>
              </article>

              {/* Layer 02 // Logic */}
              <article className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0A] p-6 transition-colors duration-200 hover:border-white/25">
                <div className="mb-3 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#cfb991]">
                  [ LAYER 02 // LOGIC ]
                </div>
                <h3 className="mb-6 border-b border-white/5 pb-2 text-base font-medium text-white">
                  Multi-Tenant Routing Matrix
                </h3>

	                <div className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-neutral-950 p-5 font-mono text-xs md:min-h-[420px]">
	                  <div className="grid w-full max-w-full grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6" aria-label="Decision routing diagram from audiences through a central decision engine to institutional pathways">
	                    <div className="rounded-lg border border-white/5 bg-white/[0.015] p-4 md:p-5">
	                      <div className="mb-4 text-center text-[11px] uppercase tracking-[0.14em] text-neutral-600 md:text-xs">
	                        Audience inputs
	                      </div>
	                      <div className="space-y-2.5">
	                        {['Prospective Student', 'Current Student', 'Faculty', 'Postdoctoral Scholar'].map((audience) => (
	                          <div key={audience} className="rounded border border-white/10 bg-white/[0.02] px-3 py-2 text-center text-sm font-medium leading-snug text-neutral-300 md:text-[15px]">
	                            {audience}
	                          </div>
	                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center md:h-full md:flex-row">
                      <div aria-hidden="true" className="h-6 w-px bg-white/15 md:h-px md:w-7" />
	                      <div className="rounded-lg border border-[#cfb991]/25 bg-[#cfb991]/10 p-4 text-center md:p-5">
	                        <div className="text-sm font-semibold leading-tight text-[#cfb991] md:text-base">Intent Routing Engine</div>
	                        <div className="mt-4 grid grid-cols-2 gap-2">
	                          {['Intent', 'Dept', 'Status', 'Program', 'Funding', 'Eligibility'].map((node) => (
	                            <div key={node} className="rounded border border-white/10 bg-neutral-950/70 px-2 py-1.5 text-xs font-normal uppercase tracking-[0.08em] text-neutral-500">
	                              {node}
	                            </div>
	                          ))}
                        </div>
                      </div>
                      <div aria-hidden="true" className="h-6 w-px bg-white/15 md:h-px md:w-7" />
                    </div>

	                    <div className="rounded-lg border border-white/5 bg-white/[0.015] p-4 md:p-5">
	                      <div className="mb-4 text-center text-[11px] uppercase tracking-[0.14em] text-neutral-600 md:text-xs">
	                        Destination pathways
	                      </div>
	                      <div className="space-y-2.5">
	                        {['Admissions', 'OGA', 'Funding', 'Postdoctoral'].map((pathway) => (
	                          <div key={pathway} className="rounded border border-white/10 bg-white/[0.02] px-3 py-2 text-center text-sm font-medium leading-snug text-neutral-300 md:text-[15px]">
	                            {pathway}
	                          </div>
	                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-wider text-gray-500">
                  Logic: Contextual Flow State
                </div>
                <p className="mt-4 max-w-[60ch] font-sans text-xs leading-relaxed text-gray-400">
                  Programmatic routing parses intent and department-specific metadata before sending each user segment to the correct Purdue Graduate School pathway, eliminating duplicate loops across OGA requirements, fellowships, and recruitment pipelines.
                </p>
              </article>

              {/* Layer 03 // Interface */}
              <article className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0A] p-6 transition-colors duration-200 hover:border-white/25">
                <div className="mb-3 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#cfb991]">
                  [ LAYER 03 // INTERFACE ]
                </div>
                <h3 className="mb-6 border-b border-white/5 pb-2 text-base font-medium text-white">
                  Unified Tokenized Framework
                </h3>

	                <div className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-neutral-950 p-5 font-mono text-xs md:min-h-[420px]">
	                  <div className="grid w-full max-w-full grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)] md:gap-6" aria-label="Design system blueprint connecting reusable components to Purdue department page compositions">
	                    <div className="rounded-lg border border-white/5 bg-white/[0.015] p-4 md:p-5">
	                      <div className="mb-4 text-center text-[11px] uppercase tracking-[0.14em] text-neutral-600 md:text-xs">
	                        Component library
	                      </div>
	                      <div className="grid grid-cols-2 gap-2.5">
	                        {['Hero', 'Section Header', 'Editorial Block', 'Table', 'Accordion', 'Callout', 'CTA', 'Sidebar'].map((component) => (
	                          <div key={component} className="rounded border border-white/10 bg-white/[0.02] px-3 py-2 text-center text-sm font-medium leading-snug text-neutral-300 md:text-[15px]">
	                            {component}
	                          </div>
	                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center md:h-full md:flex-row">
                      <div aria-hidden="true" className="h-5 w-px bg-white/15 md:h-px md:w-6" />
	                      <div className="rounded-full border border-[#cfb991]/25 bg-[#cfb991]/10 px-5 py-3 text-center text-sm font-semibold leading-tight text-[#cfb991] md:text-base">
	                        Tokens / Grid / Rules
	                      </div>
	                      <div aria-hidden="true" className="h-5 w-px bg-white/15 md:h-px md:w-6" />
	                    </div>

	                    <div className="rounded-lg border border-white/5 bg-white/[0.015] p-4 md:p-5">
	                      <div className="mb-4 text-center text-[11px] uppercase tracking-[0.14em] text-neutral-600 md:text-xs">
	                        Page assemblies
	                      </div>
	                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                        {[
                          { name: 'Admissions', layout: ['w-full', 'w-2/3', 'w-full', 'w-1/2'] },
                          { name: 'OGA', layout: ['w-3/4', 'w-full', 'w-1/2', 'w-full'] },
                          { name: 'Postdoctoral', layout: ['w-full', 'w-1/2', 'w-3/4', 'w-full'] },
                        ].map((page) => (
	                          <div key={page.name} className="rounded border border-white/10 bg-white/[0.015] p-3">
	                            <div className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-neutral-500">{page.name}</div>
                            <div className="space-y-1.5">
                              {page.layout.map((width, index) => (
                                <div
                                  key={`${page.name}-${index}`}
                                  aria-hidden="true"
                                  className={`${width} h-1.5 rounded bg-white/10 ${index === 0 ? 'bg-[#cfb991]/30' : ''}`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-wider text-gray-500">
                  Interface: Component Architecture
                </div>
                <div className="mt-4 space-y-3">
                  <p className="max-w-[60ch] font-sans text-xs leading-relaxed text-gray-400">
                    Modular WordPress layout primitives gave Purdue teams repeatable publishing structures for high-density tables, editorial content, and department-specific page patterns without breaking the shared visual system.
                  </p>
                  <p className="max-w-[60ch] font-sans text-xs leading-relaxed text-gray-400">
                    Scalable component primitives handle complex tabular university data while preserving layout-safe spacing, reusable color tokens, and long-term maintainability across multi-departmental publishing workflows.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

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
