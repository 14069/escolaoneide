import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
