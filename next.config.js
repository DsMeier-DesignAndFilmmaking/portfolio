/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true, // Enable gzip compression
  trailingSlash: true,
  output: 'export',
  poweredByHeader: false, // Remove X-Powered-By header for security
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // basePath: '/portfolio' for GitHub Pages, empty for Vercel
  // Vercel sets VERCEL=1 during builds, VERCEL_URL at runtime
  // Check multiple Vercel environment variables for reliability
  basePath: (process.env.VERCEL === '1' || process.env.VERCEL_URL || process.env.VERCEL_ENV) ? '' : '/portfolio',
  env: {
    NEXT_PUBLIC_BASE_PATH: (process.env.VERCEL === '1' || process.env.VERCEL_URL || process.env.VERCEL_ENV) ? '' : '/portfolio',
  },
  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundle
}

module.exports = nextConfig 