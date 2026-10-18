import type { IconName, Tone } from "@/components/AppIcon";
import { href, type Lang } from "@/lib/site";

export type SearchEntry = {
  /** "d" = Doctor, "s" = Specialty */
  k: "d" | "s";
  t: string; // title
  st: string; // subtitle
  u: string; // url
  p?: string | null; // photo
  i?: IconName; // icon
  tn?: Tone; // icon colour
  x: string; // lowercased haystack
};

/**
 * Compact wire format: diseases and places are shared tables referenced by index,
 * so the payload stays small even though 200+ doctors repeat the same terms.
 */
export type SearchPayload = {
  s: { slug: string; t: string; st: string; i: IconName; tn: Tone; x: string }[];
  dz: string[];
  pl: string[];
  d: { slug: string; t: string; alt: string; s: number[]; dz: number[]; pl: number[]; p: 0 | 1 }[];
};

/** Expand the wire format into flat entries (runs once in the browser). */
export function expandSearchPayload(payload: SearchPayload, lang: Lang): SearchEntry[] {
  const specialtyEntries: SearchEntry[] = payload.s.map((s) => ({ k: "s", t: s.t, st: s.st, u: href(lang, `/specialties/${s.slug}`), i: s.i, tn: s.tn, x: s.x }));
  const doctorEntries: SearchEntry[] = payload.d.map((d) => ({
    k: "d",
    t: d.t,
    st: payload.s[d.s[0]].st,
    u: href(lang, `/doctors/${d.slug}`),
    p: d.p ? `/photos/${d.slug}.webp` : null,
    x: [d.t, d.alt, ...d.s.map((i) => payload.s[i].x), ...d.dz.map((i) => payload.dz[i]), ...d.pl.map((i) => payload.pl[i])].join(" ").toLowerCase(),
  }));
  return [...specialtyEntries, ...doctorEntries];
}
