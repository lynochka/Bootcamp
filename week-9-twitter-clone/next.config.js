/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cloudflare-ipfs.com",
      "avatars.githubusercontent.com",
      "localhost",
    ],
  },
};

module.exports = nextConfig;
