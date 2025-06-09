/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.discordapp.com', 'images.pexels.com'],
  },
  async redirects() {
    return [
      {
        source: '/user-agreements/terms',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/user-agreements/privacy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/usage/commands',
        destination: '/commands',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;