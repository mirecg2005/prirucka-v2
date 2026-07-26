import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "build",
  basePath: "/prirucka-v2",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
