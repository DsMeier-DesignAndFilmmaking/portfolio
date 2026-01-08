'use client'

/**
 * SafeCanvas - DEPRECATED
 * 
 * This component used module-level singletons which caused navigation bugs.
 * It has been replaced by page-specific WebGL implementations.
 * 
 * ⚠️ DO NOT USE - This file is kept for reference only.
 * All WebGL should be managed within page components with proper cleanup.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ⛔ REMOVED: Module-level singletons that persisted across routes
// This was the root cause of navigation bugs

export function getScene() {
  console.warn('[SafeCanvas] getScene() is deprecated - use page-specific WebGL instead')
  return null
}

export function getCamera() {
  console.warn('[SafeCanvas] getCamera() is deprecated - use page-specific WebGL instead')
  return null
}

export function getRenderer() {
  console.warn('[SafeCanvas] getRenderer() is deprecated - use page-specific WebGL instead')
  return null
}

export default function SafeCanvas() {
  console.warn('[SafeCanvas] SafeCanvas component is deprecated and should not be used')
  return null
}
