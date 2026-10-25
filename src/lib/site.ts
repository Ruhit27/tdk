export const site = {
  nameEn: "Top Doctors Khulna",
  nameBn: "টপ ডক্টরস খুলনা",
  // Must be the host Vercel serves (the apex redirects to www), or canonicals point at a redirect.
  url: "https://www.topdoctorskhulna.com",
  // The Booking Line: the single number patients call or WhatsApp for every Service.
  phoneDisplay: "+880 1355-438772",
  phoneTel: "+8801355438772",
  whatsapp: "8801355438772",
};

export type Lang = "en" | "bn";

export const langs: Lang[] = ["bn", "en"];

/** Bangla is the default language and lives at the root; English is under `/en`. */
export const defaultLang: Lang = "bn";

/** Prefix a site path for the given language: `/doctors` → `/en/doctors`. */
export function href(lang: Lang, path: string) {
  if (lang === defaultLang) return path;
  return path === "/" ? "/en" : `/en${path}`;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
