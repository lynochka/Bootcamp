/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "bootcamp-lynochka.s3.eu-north-1.amazonaws.com",
      "cloudflare-ipfs.com",
    ],
  },
};

module.exports = nextConfig;
