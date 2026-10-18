import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    // Doctor photos, logos and blog illustrations never change in place; cache them hard.
    return [{ source: "/:dir(photos|logos|blog)/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }];
  },
  async redirects() {
    // Old-style /en/... links resolve to the English pages at the root.
    return [{ source: "/en/:path*", destination: "/:path*", permanent: true }];
  },
};

export default nextConfig;
