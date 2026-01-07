import { useEffect, RefObject, DependencyList } from 'react';
import * as THREE from 'three';

interface UseThreeCleanupOptions {
  /**
   * Reference to the Three.js WebGL renderer
   */
  rendererRef: RefObject<THREE.WebGLRenderer | null>;
  
  /**
   * Reference to the Three.js scene
   */
  sceneRef: RefObject<THREE.Scene | null>;
  
  /**
   * Reference to the container element that holds the renderer's canvas
   * Used for safe DOM removal of the canvas element
   */
  containerRef?: RefObject<HTMLElement | null>;
  
  /**
   * Reference to store the animation frame ID for cleanup
   * Should be created with useRef<number | null>(null)
   */
  frameIdRef?: RefObject<number | null>;
  
  /**
   * Additional cleanup functions to run on unmount
   * Useful for stopping external animations (e.g., anime.js) or removing event listeners
   */
  onCleanup?: () => void;
  
  /**
   * Dependencies array for the useEffect
   * Defaults to empty array (cleanup runs on unmount only)
   */
  deps?: DependencyList;
}

/**
 * Reusable hook for proper Three.js cleanup on component unmount or route change.
 * 
 * This hook handles:
 * - Disposing the WebGL renderer
 * - Forcing WebGL context loss
 * - Disposing all geometries and materials in the scene
 * - Safely removing the canvas from the DOM
 * - Canceling animation frames
 * - Cleaning up additional resources via onCleanup callback
 * 
 * @example
 * ```tsx
 * const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
 * const sceneRef = useRef<THREE.Scene | null>(null);
 * const containerRef = useRef<HTMLDivElement>(null);
 * const frameIdRef = useRef<number | null>(null);
 * 
 * useThreeCleanup({
 *   rendererRef,
 *   sceneRef,
 *   containerRef,
 *   frameIdRef,
 * });
 * ```
 */
export function useThreeCleanup({
  rendererRef,
  sceneRef,
  containerRef,
  frameIdRef,
  onCleanup,
  deps = [],
}: UseThreeCleanupOptions) {
  useEffect(() => {
    // Return cleanup function that runs on unmount or when deps change
    return () => {
      const renderer = rendererRef.current;
      const scene = sceneRef.current;
      
      // Cancel animation frame if active
      if (frameIdRef?.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
      
      // Run additional cleanup callbacks first (e.g., stop anime.js animations)
      if (onCleanup) {
        try {
          onCleanup();
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error in onCleanup callback:', error);
          }
        }
      }
      
      // Dispose renderer if it exists
      if (renderer) {
        try {
          // Dispose all geometries and materials in the scene before disposing renderer
          if (scene) {
            scene.traverse((obj: THREE.Object3D) => {
              const mesh = obj as THREE.Mesh;
              if (mesh.geometry) {
                mesh.geometry.dispose();
              }
              if (mesh.material) {
                const material = mesh.material;
                if (Array.isArray(material)) {
                  material.forEach((m) => m.dispose());
                } else {
                  material.dispose();
                }
              }
            });
            
            // Clear the scene
            scene.clear();
          }
          
          // Get the canvas element before disposing renderer
          const domElement = renderer.domElement;
          
          // Dispose the renderer
          renderer.dispose();
          
          // Force WebGL context loss to release GPU resources immediately
          renderer.forceContextLoss();
          
          // Null out the domElement reference
          (renderer as any).domElement = null;
          
          // Safely remove canvas from DOM if container exists
          if (containerRef?.current && domElement) {
            try {
              const container = containerRef.current;
              // Guard: ensure container and element both have parent nodes
              // This prevents NotFoundError during fast route transitions
              if (
                container.parentNode &&
                domElement.parentNode &&
                container.contains(domElement)
              ) {
                container.removeChild(domElement);
              }
            } catch (error) {
              // Ignore DOM removal errors (element may already be removed)
              if (process.env.NODE_ENV === 'development') {
                console.warn('Error removing canvas from DOM:', error);
              }
            }
          }
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error disposing Three.js renderer:', error);
          }
        }
        
        // Clear refs
        rendererRef.current = null;
      }
      
      // Clear scene ref
      if (sceneRef.current) {
        sceneRef.current = null;
      }
    };
  }, deps); // Run cleanup when dependencies change or on unmount
}

