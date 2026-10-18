import { specialties } from "@/data/specialties";
import { diseaseName, doctorName, doctors, placeName } from "@/lib/doctors";
import type { Lang } from "@/lib/site";
import type { SearchPayload } from "@/lib/search-expand";

export function buildSearchPayload(lang: Lang): SearchPayload {
  const sIndex = new Map(specialties.map((s, i) => [s.slug, i]));
  const dz: string[] = [];
  const dzIndex = new Map<string, number>();
  const pl: string[] = [];
  const plIndex = new Map<string, number>();
  const intern = (list: string[], index: Map<string, number>, key: string, value: string) => {
    if (!index.has(key)) index.set(key, list.push(value) - 1);
    return index.get(key)!;
  };
  return {
    s: specialties.map((s) => ({ slug: s.slug, t: lang === "bn" ? s.bn : s.en, st: lang === "bn" ? s.bnPerson : s.enPerson, i: s.icon, tn: s.tone, x: [s.en, s.enPerson, s.bn, s.bnPerson].join(" ").toLowerCase() })),
    dz,
    pl,
    d: doctors.map((d) => ({
      slug: d.slug,
      t: doctorName(d, lang),
      alt: lang === "bn" ? d.name : "",
      s: [d.specialty, ...d.alsoIn].map((x) => sIndex.get(x)!),
      // Bangla search also matches the English term, since many people type symptoms in English.
      dz: d.diseases.map((x) => intern(dz, dzIndex, x, (lang === "bn" ? `${diseaseName(x, lang)} ${x}` : x).toLowerCase())),
      pl: d.chambers.map((c) => intern(pl, plIndex, c.name, placeName(c.name, lang).toLowerCase())),
      p: d.photo ? 1 : 0,
    })),
  };
}
