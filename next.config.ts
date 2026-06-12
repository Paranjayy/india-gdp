import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow tree-shaking of d3 ESM modules
  transpilePackages: ["d3", "d3-array", "d3-geo", "d3-scale", "d3-hierarchy"],
};

export default nextConfig;
