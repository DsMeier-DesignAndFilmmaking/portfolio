// ✅ STATIC FOOTER - No 'use client', no hooks, no JS behavior
import Link from 'next/link';
import Image from 'next/image';
import BackToTopButton from './BackToTopButton';
import { Mail } from "lucide-react";
import { topLevelProjectNavItems } from '@/utils/projectNavigation';

const COPYRIGHT_YEAR = 2026;

type StaticFooterProps = {
  compactSpacing?: boolean;
  containerVariant?: 'home' | 'internal';
};

export default function StaticFooter({
  compactSpacing = false,
  containerVariant = 'home',
}: StaticFooterProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const footerClassName = compactSpacing
    ? 'w-full bg-white border-t border-gray-200'
    : 'w-full bg-white border-t border-gray-200 pt-12 pb-12 md:pt-[70px] md:pb-[70px]';
  const containerWidthClassName =
    containerVariant === 'internal'
      ? 'container mx-auto px-6 md:px-8'
      : 'max-w-4xl mx-auto px-6';
  const containerClassName = compactSpacing
    ? `${containerWidthClassName} py-12 md:py-[70px]`
    : `${containerWidthClassName} py-9 md:py-12`;

  return (
    <>
      {/* Flexbox spacer: margin-top: auto pushes the footer to the bottom.
          The #contact scroll target now lives in the homepage contact section. */}
      <div className="anchor-offset" style={{ marginTop: 'auto' }} aria-hidden="true"></div>
      <footer id="footer" className={footerClassName}>
      <div className={containerClassName}>
        <div className="mb-8 border-t border-gray-200 pt-6 md:mb-9"></div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
          
          {/* Brand Section */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block mb-4">
              <Image
                src={`${basePath}/images/signature-25.png`}
                alt="Dan Meier logo"
                width={96}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Designing systems and experiences for people moving through complex digital and
              physical&nbsp;environments.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                scroll={true}
                className="text-sm text-gray-600 hover:text-[#2F2A3B] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/practice"
                className="text-sm text-gray-600 hover:text-[#2F2A3B] transition-colors"
              >
                Systems Design Practice
              </Link>
              {topLevelProjectNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-600 hover:text-[#2F2A3B] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                href="/projects/previous/" 
                className="text-sm text-gray-600 hover:text-[#2F2A3B] transition-colors"
              >
                Client Work
              </Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Learn More
            </h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-5">
                <a 
                  href="https://github.com/DsMeier-DesignAndFilmmaking" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#2F2A3B] transition-colors"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/dan-meier-16185352/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#2F2A3B] transition-colors"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/@dsmeier" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#2F2A3B] transition-colors"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                href="mailto:danielstevenmeier@outlook.com"
                className="text-gray-400 transition-colors hover:text-[#2F2A3B]"
                aria-label="Email"
                title="Email"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16v12H4V6zm0 0 8 7 8-7"
                  />
                </svg>
              </a>
              </div>
              <a
                href="/services/"
                className="self-start whitespace-nowrap rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-black transition-all duration-200 ease-in-out hover:bg-black hover:text-white"
              >
                Services & Engagements
              </a>
              <Link
                href="/services/scoping-call"
                className="self-start whitespace-nowrap rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-black transition-all duration-200 ease-in-out hover:bg-black hover:text-white"
              >
                Book A Scoping Call
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-200 pt-6 md:mt-9">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-xs text-gray-500">
              © {COPYRIGHT_YEAR} Dan Meier. All rights reserved.
            </p>
            <BackToTopButton />
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
