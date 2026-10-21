import type { MetadataRoute } from "next";
import { specialties } from "@/data/specialties";
import { posts } from "@/content/blog";
import { designations, doctors } from "@/lib/doctors";
import { href, langs, site } from "@/lib/site";

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
  ];
  // Posts carry real dates; the other pages are regenerated from data and have none worth claiming.
  const dated: [string, string | undefined][] = [...paths.map((p): [string, undefined] => [p, undefined]), ...posts.map((p): [string, string] => [`/blog/${p.slug}`, p.updated ?? p.date])];
  // Each language version is its own entry, and each lists every version including itself.
  return dated.flatMap(([p, lastModified]) => {
    const languages = { en: `${site.url}${href("en", p)}`, bn: `${site.url}${href("bn", p)}`, "x-default": `${site.url}${href("en", p)}` };
    return langs.map((lang) => ({ url: languages[lang], ...(lastModified ? { lastModified } : {}), alternates: { languages } }));
  });
}
