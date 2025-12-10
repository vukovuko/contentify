import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://cdn.shadcnstudio.com/**")],
  },
};

export default nextConfig;
