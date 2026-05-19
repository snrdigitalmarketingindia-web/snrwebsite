import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/snrwebsite",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
