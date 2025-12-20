/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable the new Cache Components feature introduced in Next.js 16.  When true,
  // components and pages can opt‑in to Partial Pre‑rendering (PPR), giving us
  // better performance characteristics and dynamic data fetching without
  // sacrificing fast initial page loads【945451579068555†L32-L59】.
  cacheComponents: true,

  // Performance optimizations
  compress: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Optimize headers for better caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Enable experimental features for better performance
  experimental: {
    // Disable optimizeCss to avoid critters dependency issue
    optimizePackageImports: ['framer-motion', 'three', '@react-three/fiber', '@react-three/drei'],
  },

  // Turbopack config (Next.js 16 default) - empty config to silence warning
  turbopack: {},
};

module.exports = nextConfig;