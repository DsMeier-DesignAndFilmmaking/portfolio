'use client';

import Navbar from './Navbar';

/**
 * Global Navigation Wrapper
 * 
 * This component ensures the Navbar appears consistently across all pages.
 * The Navbar handles its own styling and behavior based on the current route.
 */
export default function NavigationWrapper() {
  return <Navbar />;
} 