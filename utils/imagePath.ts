/**
 * Get basePath-aware image path
 * Returns path with basePath prefix for GitHub Pages, empty for Vercel
 */
export function getImagePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // Remove leading slash from path if basePath is empty to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}

