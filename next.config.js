/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable the new Cache Components feature introduced in Next.js 16.  When true,
  // components and pages can opt‑in to Partial Pre‑rendering (PPR), giving us
  // better performance characteristics and dynamic data fetching without
  // sacrificing fast initial page loads【945451579068555†L32-L59】.
  cacheComponents: true,
  // Future configuration can be added here as needed.
};

export default nextConfig;