const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/KAJ',
  experimental: {
    turbopack: {}, // Silence turbopack/webpack conflict
  }
};

module.exports = withPWA(nextConfig);
