import type { Metadata } from "next";
import { href, site, type Lang } from "@/lib/site";
import { dictionaries } from "@/lib/dictionary";

/** Metadata with canonical + hreflang alternates. `path` is the English path, e.g. `/doctors`. */
export function pageMeta(lang: Lang, path: string, title: string | null, description: string, image?: string | null): Metadata {
  const name = dictionaries[lang].siteName;
  const fullTitle = title ? `${title} | ${name}` : `${name} — ${dictionaries[lang].tagline}`;
  return {
    metadataBase: new URL(site.url),
    title: fullTitle,
    description,
    alternates: {
      canonical: href(lang, path),
      languages: { en: href("en", path), bn: href("bn", path), "x-default": href("en", path) },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: href(lang, path),
      siteName: name,
      locale: lang === "bn" ? "bn_BD" : "en_US",
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}
