/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "static1.srcdn.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "nikolozkobaidze.vercel.app",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "imageproxy.wolt.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
