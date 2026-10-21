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
    // Doctor photos, logos and blog illustrations rarely change. Only image files match: `/blog/*` is also
    // where the post pages live. Not `immutable`: the header lands on 404s too, and a browser that cached
    // a missing image for a year would show it broken long after the file is deployed.
    return [
      {
        source: "/:dir(photos|logos|blog)/:file(.+\\.(?:svg|png|webp|jpe?g|avif))",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
  async redirects() {
    // Bangla used to live under /bn; it is now the default language at the root.
    return [
      { source: "/bn", destination: "/", permanent: true },
      { source: "/bn/:path+", destination: "/:path+", permanent: true },
    ];
  },
};

export default nextConfig;
