import type { MetadataRoute } from "next";
import { brandColors } from "@/lib/brand";
import { dictionaries } from "@/lib/dictionary";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.nameEn,
    short_name: "Top Doctors",
    description: dictionaries.en.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f9f8",
    theme_color: brandColors.light.leaf,
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
