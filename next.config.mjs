/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 REQUIRED for static exports (replaces `next export`)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
