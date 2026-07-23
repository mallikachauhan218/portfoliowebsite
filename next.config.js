/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};

module.exports = nextConfig;
