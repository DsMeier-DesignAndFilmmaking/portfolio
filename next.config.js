/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true, // Keep unoptimized images; safe for both static and server
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
}

module.exports = nextConfig 