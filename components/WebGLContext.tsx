'use client';

import { createContext, useContext, ReactNode } from 'react';
import * as THREE from 'three';

interface WebGLContextValue {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
}

const WebGLContext = createContext<WebGLContextValue>({
  scene: null,
  camera: null,
  renderer: null,
});

export function useWebGL() {
  return useContext(WebGLContext);
}

export function WebGLProvider({
  scene,
  camera,
  renderer,
  children,
}: {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  children: ReactNode;
}) {
  return (
    <WebGLContext.Provider value={{ scene, camera, renderer }}>
      {children}
    </WebGLContext.Provider>
  );
}
