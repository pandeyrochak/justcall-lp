import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "10004", // Match the port in your error message exactly
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "10004", // Match the port in your error message exactly
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "ideal-ostrich-d2fdbc.instawp.dev",
        port: "", // Match the port in your error message exactly
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
