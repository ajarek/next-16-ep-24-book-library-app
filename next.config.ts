import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wolnelektury.pl",
      },
    ],
  },
};

export default nextConfig;
