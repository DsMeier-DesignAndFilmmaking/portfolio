'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Custom hook for mobile video autoplay handling
const useMobileVideoAutoplay = () => {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);
    console.log('Mobile device detected:', mobileCheck);

    const handleUserInteraction = () => {
      console.log('User interaction detected on mobile device');
      setHasUserInteracted(true);
      // Remove event listeners after first interaction
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };

    if (mobileCheck) {
      // Add event listeners for mobile interaction
      document.addEventListener('touchstart', handleUserInteraction);
      document.addEventListener('click', handleUserInteraction);
    }

    return () => {
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  const triggerVideoAutoplay = useCallback((iframe: HTMLIFrameElement) => {
    if (isMobile && hasUserInteracted && iframe.src.includes('vimeo.com')) {
      console.log('Triggering mobile video autoplay for:', iframe.src);
      const currentSrc = iframe.src;
      iframe.src = '';
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 100);
    }
  }, [isMobile, hasUserInteracted]);

  return { isMobile, hasUserInteracted, triggerVideoAutoplay };
};

const videoProjects = [
  {
    videoUrl: "https://player.vimeo.com/video/1089382469?h=f20ea6cdaf&controls=0&background=1&autopause=0&loop=1&quality=720p&muted=1&playsinline=1"
  }
];

export default function VideoProjectsSection() {
  const videoRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const { isMobile, hasUserInteracted, triggerVideoAutoplay } = useMobileVideoAutoplay();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection observer for the entire section
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Intersection observer for individual videos
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLIFrameElement) {
            entry.target.style.opacity = '1';
            
            // Add autoplay parameter when video comes into view
            const currentSrc = entry.target.src;
            if (!currentSrc.includes('autoplay=1')) {
              entry.target.src = currentSrc + '&autoplay=1';
            }
            
            // Trigger mobile autoplay if conditions are met
            if (entry.target instanceof HTMLIFrameElement) {
              triggerVideoAutoplay(entry.target);
            }
          } else if (entry.target instanceof HTMLIFrameElement) {
            entry.target.style.opacity = '0';
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe the section container
    const sectionElement = document.getElementById('video-projects');
    if (sectionElement) {
      sectionObserver.observe(sectionElement);
    }

    videoRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.opacity = '0';
        ref.style.transition = 'opacity 0.3s ease-in-out';
        videoObserver.observe(ref);
      }
    });

    return () => {
      if (sectionElement) {
        sectionObserver.unobserve(sectionElement);
      }
      videoRefs.current.forEach((ref) => {
        if (ref) {
          videoObserver.unobserve(ref);
        }
      });
    };
  }, [triggerVideoAutoplay]);

  return (
    <motion.section 
      id="video-projects" 
      className="py-24 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6">
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

        <div className="grid grid-cols-1 gap-16">
          {videoProjects.map((project, index) => (
            <div key={index} className="group">
              <div 
                className="relative w-full" 
                style={{ paddingBottom: '56.25%' }}
                onClick={() => {
                  if (isMobile && videoRefs.current[index]) {
                    triggerVideoAutoplay(videoRefs.current[index]!);
                  }
                }}
              >
                <iframe
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  title={`vimeo-player-${index}`}
                  src={isVisible ? project.videoUrl : ''}
                  frameBorder="0"
                  allowFullScreen
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Photo Grid */}
        <div>
          <div className="grid grid-cols-1 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="relative">
                <div className="relative bg-white/10 overflow-hidden rounded-lg">
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
                      className="rounded-lg shadow-lg"
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
                      className="rounded-lg shadow-lg"
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
                      className="rounded-lg shadow-lg"
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
                      className="rounded-lg shadow-lg"
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
                      className="rounded-lg shadow-lg"
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
                      className="rounded-lg shadow-lg"
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

        {/* Video Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              width="560"
              height="315"
              src={isVisible ? "https://www.youtube.com/embed/2OGGUn3Fimo?si=-eOy1xz3u-jDkx5-" : ""}
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
              src={isVisible ? "https://player.vimeo.com/video/903464774?h=0c041a1340&controls=1" : ""}
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
              src={isVisible ? "https://www.youtube.com/embed/YUuAKf3wMow?si=bg3Imnwd_IGo1gn6" : ""}
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
              src={isVisible ? "https://player.vimeo.com/video/884512779?h=98ee643b4f&controls=1" : ""}
              width="640"
              height="360"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full rounded-lg"
            />
          </div>
        </div>

        {/* Channel Buttons */}
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
      </div>
    </motion.section>
  );
} 