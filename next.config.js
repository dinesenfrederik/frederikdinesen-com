/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
      {
        source: '/en',
        destination: '/en/index.html',
      },
      {
        source: '/en/',
        destination: '/en/index.html',
      },
      {
        source: '/terms',
        destination: '/terms.html',
      },
      {
        source: '/terms.html',
        destination: '/terms.html',
      },
    ];
  },
};

module.exports = nextConfig;

