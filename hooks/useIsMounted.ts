import { useState, useEffect } from 'react';

/**
 * Hook to track if component is mounted on the client.
 * Prevents hydration mismatches by ensuring code only runs after client-side mount.
 * 
 * @example
 * ```tsx
 * const isMounted = useIsMounted();
 * 
 * if (!isMounted) {
 *   return <LoadingPlaceholder />;
 * }
 * 
 * return <ClientOnlyComponent />;
 * ```
 */
export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return isMounted;
}

