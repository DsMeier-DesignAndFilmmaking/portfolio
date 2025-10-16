'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import FadeInSection from './FadeInSection';
import { isCurrentlyAnchorScrolling } from '@/utils/scrollUtils';

const videoProjects = [
  {
    videoUrl: "https://player.vimeo.com/video/1089382469?h=f20ea6cdaf&controls=0&background=0&autopause=0&loop=1&quality=720p&muted=1&playsinline=1&autoplay=1",
    title: "Featured Video Project"
  }
];

export default function VideoProjectsSection() {
  const videoRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection observer for the section
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Don't trigger video loading if we're currently anchor scrolling
            if (isCurrentlyAnchorScrolling()) {
              console.log('Skipping video load during anchor scroll');
              return;
            }
            setIsVisible(true);
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1, // Lower threshold to trigger earlier
        rootMargin: '50px' // Start loading slightly before the section comes into view
      }
    );

    // Observe the section container
    const sectionElement = document.getElementById('video-projects');
    if (sectionElement) {
      sectionObserver.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        sectionObserver.unobserve(sectionElement);
      }
    };
  }, []);

  return (
    <section 
      id="video-projects" 
      className="py-24 bg-black"
    >
      <div className="max-w-4xl mx-auto px-6">
        <FadeInSection 
          delay={0.1}
          duration={0.8}
          direction="up"
          distance={40}
          threshold={0.2}
        >
          <div className="pt-20">
            <h2 className="text-base font-normal text-gray-400 mb-4 font-sans uppercase">
              Video Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl font-sans">
              A collection of video projects showcasing my work in cinematography and visual storytelling.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              * All visuals are captured through my lens — nothing AI generated, nothing artificial
            </p>
          </div>
        </FadeInSection>

        <FadeInSection 
          delay={0.2}
          duration={0.8}
          direction="up"
          distance={50}
          threshold={0.1}
        >
          <div className="grid grid-cols-1 gap-16">
            {videoProjects.map((project, index) => (
              <div key={index} className="group">
                <div 
                  className="relative w-full bg-gray-900 rounded-lg" 
                  style={{ paddingBottom: '56.25%' }}
                >
                  {/* Placeholder to maintain aspect ratio */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500 text-sm">Loading video...</div>
                  </div>
                  <iframe
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    title={`vimeo-player-${index}`}
                    src={isVisible ? project.videoUrl : "about:blank"}
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    allow="autoplay; fullscreen; picture-in-picture"
                    onLoad={(e) => {
                      // Hide placeholder when iframe loads
                      const target = e.target as HTMLIFrameElement;
                      const placeholder = target.parentElement?.querySelector('.absolute.bg-gray-900');
                      if (placeholder) {
                        placeholder.style.display = 'none';
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Photo Grid */}
        <FadeInSection 
          delay={0.3}
          duration={0.8}
          direction="up"
          distance={40}
          threshold={0.1}
        >
          <div>
            <div className="grid grid-cols-1 gap-8">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="relative">
                  <div className="relative bg-white/10 overflow-hidden">
                    {index === 1 ? (
                      <Image
                        src="/portfolio/images/Istanbul-frames-2.jpg"
                        alt="Istanbul Video Frames"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={index <= 2}
                        loading={index <= 2 ? "eager" : "lazy"}
                        style={{ width: '100%', height: 'auto' }}
                        className="shadow-lg"
                      />
                    ) : index === 2 ? (
                      <Image
                        src="/portfolio/images/japan-frames.jpg"
                        alt="Japan Video Frames"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={index <= 2}
                        loading={index <= 2 ? "eager" : "lazy"}
                        style={{ width: '100%', height: 'auto' }}
                        className="shadow-lg"
                      />
                    ) : index === 3 ? (
                      <Image
                        src="/portfolio/images/Terratorium-stillFrames.jpg"
                        alt="Terratorium Video Frames"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={index <= 2}
                        loading={index <= 2 ? "eager" : "lazy"}
                        style={{ width: '100%', height: 'auto' }}
                        className="shadow-lg"
                      />
                    ) : index === 4 ? (
                      <Image
                        src="/portfolio/images/Teleportal-frames.jpg"
                        alt="Teleportal Video Frames"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={index <= 2}
                        loading={index <= 2 ? "eager" : "lazy"}
                        style={{ width: '100%', height: 'auto' }}
                        className="shadow-lg"
                      />
                    ) : index === 5 ? (
                      <Image
                        src="/portfolio/images/Morrocco-frames.jpg"
                        alt="Morocco Video Frames"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={index <= 2}
                        loading={index <= 2 ? "eager" : "lazy"}
                        style={{ width: '100%', height: 'auto' }}
                        className="shadow-lg"
                      />
                    ) : index === 6 ? (
                      <Image
                        src="/portfolio/images/Indonesia-frames.jpg"
                        alt="Indonesia Video Frames"
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={index <= 2}
                        loading={index <= 2 ? "eager" : "lazy"}
                        style={{ width: '100%', height: 'auto' }}
                        className="shadow-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40">
                        Photo {index}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Video Grid */}
        <FadeInSection 
          delay={0.4}
          duration={0.8}
          direction="up"
          distance={50}
          threshold={0.1}
        >
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                width="560"
                height="315"
                src={isVisible ? "https://www.youtube.com/embed/2OGGUn3Fimo?si=-eOy1xz3u-jDkx5-" : "about:blank"}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full rounded-lg"
              />
            </div>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                title="vimeo-player"
                src={isVisible ? "https://player.vimeo.com/video/903464774?h=0c041a1340&controls=1" : "about:blank"}
                width="640"
                height="360"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full rounded-lg"
              />
            </div>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                width="560"
                height="315"
                src={isVisible ? "https://www.youtube.com/embed/YUuAKf3wMow?si=bg3Imnwd_IGo1gn6" : "about:blank"}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full rounded-lg"
              />
            </div>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                title="vimeo-player"
                src={isVisible ? "https://player.vimeo.com/video/884512779?h=98ee643b4f&controls=1" : "about:blank"}
                width="640"
                height="360"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full rounded-lg"
              />
            </div>
          </div>
        </FadeInSection>

        {/* Channel Buttons */}
        <FadeInSection 
          delay={0.5}
          duration={0.8}
          direction="up"
          distance={30}
          threshold={0.1}
        >
          <div className="mt-8 pt-16 flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="https://www.youtube.com/@dsmeier"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube Channel
            </a>
            <a
              href="https://vimeo.com/user94578264"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.396 7.164c-.093 2.026-1.507 4.799-4.245 8.32C15.322 19.161 12.928 22 11.092 22c-1.826 0-2.27-2.812-1.334-8.437l.744-3.162c.82-3.469 1.704-5.208 2.65-5.208.82 0 1.334 1.334 1.54 4.004l1.334.744c1.6-5.208 3.47-7.84 5.608-7.84 1.6 0 2.27 1.334 2.016 4.004z"/>
              </svg>
              Vimeo Channel
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
} 