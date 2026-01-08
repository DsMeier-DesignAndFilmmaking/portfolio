'use client';

/**
 * WebGLSceneManager - DEPRECATED
 * 
 * ⚠️ DO NOT USE - This component used SafeCanvas singleton pattern which caused navigation bugs.
 * 
 * Use HomePageWebGL instead, which provides page-specific WebGL with proper cleanup.
 * 
 * This file is kept for reference only.
 */

import { usePathname } from 'next/navigation';

export default function WebGLSceneManager() {
  console.warn('[WebGLSceneManager] WebGLSceneManager is deprecated and should not be used. Use HomePageWebGL instead.');
  
  const pathname = usePathname();
  
  // Return null - component should not be used
  if (pathname === '/') {
    console.warn('[WebGLSceneManager] This component is deprecated. HomePageWebGL should be used instead.');
  }
  
  return null;
}
