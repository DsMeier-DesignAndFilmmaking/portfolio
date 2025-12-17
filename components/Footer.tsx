'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Dan Meier</h3>
            <p className="text-gray-600 max-w-xs">
              Where design meets code, travel sparks ideas, and stories come to life on screen.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://dan-meier-portfolio.vercel.app/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="https://dan-meier-portfolio.vercel.app/projects/purdue/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Purdue University
                </Link>
              </li>
              <li>
                <Link href="https://dan-meier-portfolio.vercel.app/projects/travel-and-ai/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Travel & AI
                </Link>
              </li>
              <li>
                <Link href="https://dan-meier-portfolio.vercel.app/projects/previous/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Previous Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.linkedin.com/in/dan-meier-16185352/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/DsMeier-DesignAndFilmmaking" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="mailto:danmeier@dsmeier.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-center">
            <p className="text-gray-600 text-sm">
              © {currentYear} Dan Meier. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 