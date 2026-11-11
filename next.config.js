/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    // The static homepages are also reachable as /index.html and /en/index.html.
    // Redirect those duplicates to the canonical URLs.
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/en/index.html', destination: '/en', permanent: true },
    ];
  },
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

