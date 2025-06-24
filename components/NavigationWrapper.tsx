'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavigationWrapper() {
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith('/projects/');

  return !isProjectPage ? <Navbar /> : null;
} 