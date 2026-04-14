import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-media.choiceqr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mr-burger.cz",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
