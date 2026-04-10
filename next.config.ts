import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "landrup-api-h4b5.onrender.com",
        pathname: "/file-bucket/**",
      },
    ],
  },
};

export default nextConfig;