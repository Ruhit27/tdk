export const site = {
  nameEn: "Top Doctors Khulna",
  nameBn: "টপ ডক্টরস খুলনা",
  // Must be the host Vercel serves (the apex redirects to www), or canonicals point at a redirect.
  url: "https://www.topdoctorskhulna.com",
  // The Booking Line: the single number patients call or WhatsApp for every Service.
  phoneDisplay: "+880 1701-667283",
  phoneTel: "+8801701667283",
  whatsapp: "8801701667283",
};

export type Lang = "en" | "bn";

export const langs: Lang[] = ["en", "bn"];

/** Prefix an English path for the given language: `/doctors` → `/bn/doctors`. */
export function href(lang: Lang, path: string) {
  if (lang === "en") return path;
  return path === "/" ? "/bn" : `/bn${path}`;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
