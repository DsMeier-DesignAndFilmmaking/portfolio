"use client";

import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react"; // Optional: npm install lucide-react

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-100 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">YourName</h2>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Full-stack developer specializing in building exceptional digital experiences.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navigation</h3>
            <Link href="/" className="text-sm text-gray-600 hover:text-black transition-colors">Home</Link>
            <Link href="/projects" className="text-sm text-gray-600 hover:text-black transition-colors">Projects</Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-black transition-colors">About</Link>
          </div>

          {/* Services/Resources */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</h3>
            <Link href="mailto:hello@example.com" className="text-sm text-gray-600 hover:text-black transition-colors">Email Me</Link>
            <Link href="/resume.pdf" className="text-sm text-gray-600 hover:text-black transition-colors">Download Resume</Link>
          </div>

          {/* Social Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Social</h3>
            <div className="flex space-x-4 text-gray-500">
              <a href="https://github.com" className="hover:text-black transition-colors"><Github size={20} /></a>
              <a href="https://twitter.com" className="hover:text-black transition-colors"><Twitter size={20} /></a>
              <a href="https://linkedin.com" className="hover:text-black transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {currentYear} YourName. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}