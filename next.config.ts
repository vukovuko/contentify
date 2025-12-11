import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    viewTransition: true,
    staleTimes: {
      dynamic: 30,
    },
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      new URL("https://cdn.shadcnstudio.com/**"),
      new URL(`${process.env.BLOB_BASE_URL}/**`),
    ],
  },
};

export default nextConfig;
