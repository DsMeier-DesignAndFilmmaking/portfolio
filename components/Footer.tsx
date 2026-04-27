"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-100 py-12 mt-20">
      {/* Container aligned to navbar settings: max-width 56rem (4xl) and padding 1.5rem (px-6) */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Section */}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Dan Meier</h2>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Curious about systems, code, and how people experience the world. 
              I design products that connect logic with real life.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="https://dan-meier-portfolio.vercel.app/" className="text-sm text-gray-600 hover:text-black transition-colors">Home</Link>
              <Link href="https://dan-meier-portfolio.vercel.app/projects/field-notes/" className="text-sm text-gray-600 hover:text-black transition-colors">Field Notes</Link>
              <Link href="https://dan-meier-portfolio.vercel.app/projects/travel-and-ai/" className="text-sm text-gray-600 hover:text-black transition-colors">Travel & AI</Link>
              <Link href="https://dan-meier-portfolio.vercel.app/projects/digital-executor/" className="text-sm text-gray-600 hover:text-black transition-colors">Digital Executor</Link>
              <Link href="https://dan-meier-portfolio.vercel.app/projects/previous/" className="text-sm text-gray-600 hover:text-black transition-colors">Client Work</Link>
            </nav>
          </div>

          {/* Combined Contact & Socials Column */}
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Connect
              </h3>
            </div>

            <div className="flex space-x-5 text-gray-400">
              <a 
                href="https://github.com/DsMeier-DesignAndFilmmaking" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
                title="GitHub"
              >
                <Github size={20} />
              </a>

              <a 
                href="https://www.youtube.com/@dsmeier" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
                title="YouTube"
              >
                <Youtube size={20} />
              </a>

              <a 
                href="https://www.linkedin.com/in/dan-meier-16185352/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-50">
          <p className="text-xs text-gray-400">
            © {currentYear} Dan Meier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}