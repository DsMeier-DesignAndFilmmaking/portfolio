import { useEffect, RefObject, DependencyList } from 'react';
import * as THREE from 'three';

interface UseDeepDisposeOptions {
  /**
   * Reference to the Three.js scene or any Object3D to dispose
   */
  objectRef: RefObject<THREE.Object3D | THREE.Scene | null>;
  
  /**
   * Optional reference to the WebGL renderer for context disposal
   */
  rendererRef?: RefObject<THREE.WebGLRenderer | null>;
  
  /**
   * Optional callback fired before disposal begins
   */
  onBeforeDispose?: () => void;
  
  /**
   * Optional callback fired after disposal completes
   */
  onAfterDispose?: () => void;
  
  /**
   * Dependencies array for the useEffect
   * Defaults to empty array (cleanup runs on unmount only)
   */
  deps?: DependencyList;
  
  /**
   * Enable verbose logging for debugging (only in development)
   * Default: false
   */
  verbose?: boolean;
}

/**
 * Recursively disposes all geometries in a Three.js object
 */
function disposeGeometry(geometry: THREE.BufferGeometry | THREE.Geometry | undefined, verbose: boolean = false): void {
  if (!geometry) return;
  
  try {
    if (typeof geometry.dispose === 'function') {
      geometry.dispose();
      if (verbose && process.env.NODE_ENV === 'development') {
        console.log('Disposed geometry:', geometry.type);
      }
    } else if (process.env.NODE_ENV === 'development' && verbose) {
      console.warn('Geometry does not have dispose method:', geometry.type);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Error disposing geometry:', error);
    }
  }
}

/**
 * Recursively disposes all textures from a material
 */
function disposeTextures(material: THREE.Material, verbose: boolean = false): void {
  if (!material) return;
  
  // List of all texture properties that might exist on materials
  const textureProperties = [
    'map',
    'normalMap',
    'roughnessMap',
    'metalnessMap',
    'aoMap',
    'emissiveMap',
    'bumpMap',
    'displacementMap',
    'alphaMap',
    'envMap',
    'lightMap',
    'matcap',
    'specularMap',
    'clearcoatMap',
    'clearcoatNormalMap',
    'clearcoatRoughnessMap',
    'sheenColorMap',
    'sheenRoughnessMap',
    'transmissionMap',
    'thicknessMap',
  ] as const;
  
  textureProperties.forEach((prop) => {
    try {
      const texture = (material as any)[prop] as THREE.Texture | undefined;
      if (texture && typeof texture.dispose === 'function') {
        texture.dispose();
        if (verbose && process.env.NODE_ENV === 'development') {
          console.log(`Disposed texture: ${prop}`);
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development' && verbose) {
        console.warn(`Error disposing texture ${prop}:`, error);
      }
    }
  });
}

/**
 * Disposes a single material and all its associated textures
 */
function disposeMaterial(material: THREE.Material, verbose: boolean = false): void {
  if (!material) return;
  
  try {
    // Dispose all textures first
    disposeTextures(material, verbose);
    
    // Then dispose the material itself
    if (typeof material.dispose === 'function') {
      material.dispose();
      if (verbose && process.env.NODE_ENV === 'development') {
        console.log('Disposed material:', material.type);
      }
    } else if (process.env.NODE_ENV === 'development' && verbose) {
      console.warn('Material does not have dispose method:', material.type);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Error disposing material:', error);
    }
  }
}

/**
 * Disposes materials whether they're single or array
 */
function disposeMaterials(material: THREE.Material | THREE.Material[] | undefined, verbose: boolean = false): void {
  if (!material) return;
  
  if (Array.isArray(material)) {
    material.forEach((mat) => disposeMaterial(mat, verbose));
  } else {
    disposeMaterial(material, verbose);
  }
}

/**
 * Recursively traverses a Three.js object and disposes all resources
 */
function deepDisposeObject(
  object: THREE.Object3D | THREE.Scene,
  verbose: boolean = false
): void {
  if (!object) return;
  
  try {
    // Traverse the object tree
    object.traverse((child) => {
      // Dispose geometry
      const mesh = child as THREE.Mesh;
      if (mesh.geometry) {
        disposeGeometry(mesh.geometry, verbose);
      }
      
      // Dispose materials and textures
      if (mesh.material) {
        disposeMaterials(mesh.material, verbose);
      }
      
      // Handle other object types that might have resources
      if (child instanceof THREE.Line) {
        if (child.geometry) disposeGeometry(child.geometry, verbose);
        if (child.material) disposeMaterial(child.material as THREE.Material, verbose);
      }
      
      if (child instanceof THREE.Points) {
        if (child.geometry) disposeGeometry(child.geometry, verbose);
        if (child.material) disposeMaterial(child.material as THREE.Material, verbose);
      }
      
      if (child instanceof THREE.Sprite) {
        if (child.material) disposeMaterial(child.material as THREE.Material, verbose);
      }
      
      // Remove from parent to ensure complete cleanup
      if (child.parent) {
        try {
          child.parent.remove(child);
        } catch (error) {
          // Object may have already been removed
          if (process.env.NODE_ENV === 'development' && verbose) {
            console.warn('Error removing child from parent:', error);
          }
        }
      }
    });
    
    // Clear the scene/object
    if (object instanceof THREE.Scene) {
      object.clear();
      if (verbose && process.env.NODE_ENV === 'development') {
        console.log('Cleared scene');
      }
    } else {
      // Remove all children
      while (object.children.length > 0) {
        object.remove(object.children[0]);
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error during deep disposal:', error);
    }
  }
}

/**
 * Disposes a WebGL renderer and its context
 */
function disposeRenderer(renderer: THREE.WebGLRenderer | null, verbose: boolean = false): void {
  if (!renderer) return;
  
  try {
    const gl = renderer.getContext();
    
    // Check if context is already lost
    if (gl && !gl.isContextLost()) {
      // Dispose renderer first
      if (typeof renderer.dispose === 'function') {
        renderer.dispose();
        if (verbose && process.env.NODE_ENV === 'development') {
          console.log('Disposed renderer');
        }
      }
      
      // Force context loss if available
      if (typeof renderer.forceContextLoss === 'function') {
        renderer.forceContextLoss();
        if (verbose && process.env.NODE_ENV === 'development') {
          console.log('Forced WebGL context loss');
        }
      }
    } else if (gl && gl.isContextLost()) {
      // Context already lost, just dispose
      if (typeof renderer.dispose === 'function') {
        renderer.dispose();
      }
    }
    
    // Null out domElement reference
    (renderer as any).domElement = null;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Error disposing renderer:', error);
    }
  }
}

/**
 * useDeepDispose - Comprehensive Three.js Resource Disposal Hook
 * 
 * This hook provides deep, recursive disposal of all Three.js resources including:
 * - Geometries (BufferGeometry and legacy Geometry)
 * - Materials (single and arrays)
 * - Textures (map, normalMap, roughnessMap, etc.)
 * - Renderers and WebGL contexts
 * 
 * Use this hook to prevent WebGL memory leaks during page transitions in Next.js.
 * 
 * @example
 * ```tsx
 * const sceneRef = useRef<THREE.Scene | null>(null);
 * const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
 * 
 * useDeepDispose({
 *   objectRef: sceneRef,
 *   rendererRef: rendererRef,
 *   verbose: true, // Enable logging in development
 * });
 * ```
 * 
 * @example With callbacks
 * ```tsx
 * useDeepDispose({
 *   objectRef: sceneRef,
 *   rendererRef: rendererRef,
 *   onBeforeDispose: () => console.log('Starting disposal...'),
 *   onAfterDispose: () => console.log('Disposal complete'),
 *   deps: [modelPath], // Re-run cleanup when dependencies change
 * });
 * ```
 */
export function useDeepDispose({
  objectRef,
  rendererRef,
  onBeforeDispose,
  onAfterDispose,
  deps = [],
  verbose = false,
}: UseDeepDisposeOptions) {
  useEffect(() => {
    // Return cleanup function that runs on unmount or when deps change
    return () => {
      const object = objectRef.current;
      const renderer = rendererRef?.current || null;
      
      // Early return if already cleaned up
      if (!object) {
        if (renderer) {
          disposeRenderer(renderer, verbose);
        }
        return;
      }
      
      try {
        // Call before dispose callback
        if (onBeforeDispose) {
          onBeforeDispose();
        }
        
        if (verbose && process.env.NODE_ENV === 'development') {
          console.log('Starting deep disposal...');
        }
        
        // Dispose the object/scene recursively
        deepDisposeObject(object, verbose);
        
        // Dispose renderer
        if (renderer) {
          disposeRenderer(renderer, verbose);
        }
        
        // Clear references
        (objectRef as any).current = null;
        if (rendererRef) {
          (rendererRef as any).current = null;
        }
        
        if (verbose && process.env.NODE_ENV === 'development') {
          console.log('Deep disposal complete');
        }
        
        // Call after dispose callback
        if (onAfterDispose) {
          onAfterDispose();
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error in useDeepDispose:', error);
        }
        
        // Ensure references are cleared even on error
        (objectRef as any).current = null;
        if (rendererRef) {
          (rendererRef as any).current = null;
        }
      }
    };
  }, deps); // Run cleanup when dependencies change or on unmount
}

/**
 * Standalone function for manual disposal (useful for cleanup in useEffect)
 * 
 * @example
 * ```tsx
 * useEffect(() => {
 *   // ... setup code
 *   
 *   return () => {
 *     deepDispose(sceneRef.current, rendererRef.current);
 *   };
 * }, []);
 * ```
 */
export function deepDispose(
  object: THREE.Object3D | THREE.Scene | null,
  renderer?: THREE.WebGLRenderer | null,
  verbose: boolean = false
): void {
  if (object) {
    deepDisposeObject(object, verbose);
  }
  
  if (renderer) {
    disposeRenderer(renderer, verbose);
  }
}

