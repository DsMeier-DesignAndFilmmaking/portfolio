/**
 * Image optimization utilities for better performance
 */

// Image quality settings based on device capabilities
export const getImageQuality = (): number => {
  if (typeof window === 'undefined') return 75;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const devicePixelRatio = window.devicePixelRatio || 1;
  
  // Lower quality for high DPI displays to save bandwidth
  if (devicePixelRatio > 2) {
    return 60;
  } else if (devicePixelRatio > 1.5) {
    return 70;
  }
  
  return 75;
};

// Get optimal image format based on browser support
export const getOptimalImageFormat = (): 'webp' | 'avif' | 'jpeg' | 'png' => {
  if (typeof window === 'undefined') return 'jpeg';
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  // Check AVIF support
  if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
    return 'avif';
  }
  
  // Check WebP support
  if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
    return 'webp';
  }
  
  return 'jpeg';
};

// Generate responsive image sizes
export const generateImageSizes = (baseWidth: number): string => {
  const sizes = [
    { width: 320, descriptor: '320w' },
    { width: 640, descriptor: '640w' },
    { width: 768, descriptor: '768w' },
    { width: 1024, descriptor: '1024w' },
    { width: 1280, descriptor: '1280w' },
    { width: 1920, descriptor: '1920w' },
  ];
  
  return sizes
    .filter(size => size.width <= baseWidth * 2) // Only include sizes up to 2x the base width
    .map(size => size.descriptor)
    .join(', ');
};

// Generate srcSet for responsive images
export const generateSrcSet = (
  baseUrl: string,
  baseWidth: number,
  format: string = 'jpeg'
): string => {
  const sizes = [1, 1.5, 2, 3];
  
  return sizes
    .map(multiplier => {
      const width = Math.round(baseWidth * multiplier);
      const url = baseUrl.replace(/\.(jpg|jpeg|png|webp|avif)$/i, `-${width}w.${format}`);
      return `${url} ${width}w`;
    })
    .join(', ');
};

// Lazy loading configuration
export const getLazyLoadingConfig = () => {
  if (typeof window === 'undefined') return { loading: 'lazy' as const };
  
  // Use native lazy loading if supported
  if ('loading' in HTMLImageElement.prototype) {
    return { loading: 'lazy' as const };
  }
  
  // Fallback to intersection observer
  return { loading: 'eager' as const };
};

// Image preloading for critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Batch preload multiple images
export const preloadImages = async (srcs: string[]): Promise<void[]> => {
  const promises = srcs.map(src => preloadImage(src));
  return Promise.allSettled(promises).then(results => {
    const errors = results
      .filter(result => result.status === 'rejected')
      .map(result => (result as PromiseRejectedResult).reason);
    
    if (errors.length > 0) {
      console.warn('Some images failed to preload:', errors);
    }
    
    return [];
  });
};

// Generate placeholder for images
export const generateImagePlaceholder = (
  width: number,
  height: number,
  backgroundColor: string = '#f3f4f6'
): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL();
};

// Image compression utility
export const compressImage = (
  file: File,
  quality: number = 0.8,
  maxWidth: number = 1920,
  maxHeight: number = 1080
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => resolve(blob || file),
          'image/jpeg',
          quality
        );
      } else {
        resolve(file);
      }
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Get image dimensions without loading the full image
export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = src;
  });
};

// Check if image is in viewport for lazy loading
export const isImageInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top >= -windowHeight * 0.5 && // Start loading 50% before entering viewport
    rect.left >= -windowWidth * 0.5 &&
    rect.bottom <= windowHeight * 1.5 && // Keep loading 50% after leaving viewport
    rect.right <= windowWidth * 1.5
  );
};

// Progressive image loading
export const loadProgressiveImage = (
  lowQualitySrc: string,
  highQualitySrc: string,
  onLoad: (src: string) => void
): void => {
  // Load low quality first
  const lowQualityImg = new Image();
  lowQualityImg.onload = () => {
    onLoad(lowQualitySrc);
    
    // Then load high quality
    const highQualityImg = new Image();
    highQualityImg.onload = () => {
      onLoad(highQualitySrc);
    };
    highQualityImg.src = highQualitySrc;
  };
  lowQualityImg.src = lowQualitySrc;
};
