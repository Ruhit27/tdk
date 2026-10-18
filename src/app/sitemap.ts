import type { MetadataRoute } from "next";
import { specialties } from "@/data/specialties";
import { posts } from "@/content/blog";
import { designations, doctors } from "@/lib/doctors";
import { href, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/doctors",
    "/specialties",
    "/hospitals",
    "/diagnostics",
    "/blood-banks",
    "/pharmacies",
    "/ambulance",
    "/lab-tests",
    "/india-treatment",
    "/about",
    "/contact",
    "/blog",
    ...doctors.map((d) => `/doctors/${d.slug}`),
    ...specialties.map((s) => `/specialties/${s.slug}`),
    ...designations.map((d) => `/designations/${d.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((p) => ({
    url: `${site.url}${href("en", p)}`,
    alternates: { languages: { en: `${site.url}${href("en", p)}`, bn: `${site.url}${href("bn", p)}` } },
  }));
}
