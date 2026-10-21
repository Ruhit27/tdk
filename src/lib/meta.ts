import type { Metadata } from "next";
import { href, site, type Lang } from "@/lib/site";
import { dictionaries } from "@/lib/dictionary";

type Extra = {
  /** Marks the page as an article with these ISO dates. */
  article?: { published: string; modified: string };
  /** The route has its own `opengraph-image` card; setting any image here would replace it. */
  ownCard?: boolean;
};

// Google shows about 60 characters of a title and 155 of a description; past that it cuts mid-word.
const TITLE_MAX = 65;
const DESCRIPTION_MAX = 158;
const homeTitle: Record<Lang, string> = { en: "Find & Book Specialist Doctors", bn: "বিশেষজ্ঞ ডাক্তার খুঁজুন ও সিরিয়াল নিন" };

/** Shortens to `max` characters at a word boundary, ending with "…". */
export function clip(s: string, max: number) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > max / 2 ? cut.lastIndexOf(" ") : cut.length).replace(/[\s,.;:—–-]+$/, "")}…`;
}

/** Metadata with canonical + hreflang alternates. `path` is the unprefixed path, e.g. `/doctors`. */
export function pageMeta(lang: Lang, path: string, title: string | null, desc: string, image?: string | null, extra: Extra = {}): Metadata {
  const name = dictionaries[lang].siteName;
  // The brand suffix is dropped when it would push the title past what Google shows.
  const fullTitle = !title ? `${name} — ${homeTitle[lang]}` : `${title} | ${name}`.length <= TITLE_MAX ? `${title} | ${name}` : title;
  const description = clip(desc, DESCRIPTION_MAX);
  return {
    metadataBase: new URL(site.url),
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: href(lang, path),
      languages: { en: href("en", path), bn: href("bn", path), "x-default": href("bn", path) },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: href(lang, path),
      siteName: name,
      locale: lang === "bn" ? "bn_BD" : "en_US",
      ...(extra.article ? { type: "article", publishedTime: extra.article.published, modifiedTime: extra.article.modified } : { type: "website" }),
      ...(extra.ownCard ? {} : { images: [image ? { url: image } : { url: "/og-image.png", width: 1200, height: 630, alt: `${name} — ${dictionaries[lang].tagline}` }] }),
    },
  };
}
