import raw from "@/data/doctors.json";
import { specialtyBySlug, type Specialty } from "@/data/specialties";
import { bnDigits, bnDisease, bnName, bnTerm } from "@/lib/bangla";
import type { Lang } from "@/lib/site";

export type Day = "sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri";
export type Designation =
  | "professor"
  | "associate-professor"
  | "assistant-professor"
  | "consultant"
  | "specialist"
  | "medical-officer"
  | "general-physician";

type RawDoctor = {
  slug: string;
  name: string;
  degrees: string;
  post: string;
  workplace: string;
  designation: string;
  specialty: string;
  alsoIn: string[];
  available: boolean;
  featured: boolean;
  diseases: string[];
  fees: { new: number | null; returning: number | null; report: number | null };
  chambers: { name: string; schedule: { day: string; time: string | null }[] }[];
  photo: string | null;
};

export type Doctor = Omit<RawDoctor, "designation" | "chambers"> & {
  designation: Designation;
  chambers: { name: string; schedule: { day: Day; time: string | null }[] }[];
};

export const doctors = raw as Doctor[];
export const doctorBySlug = new Map(doctors.map((d) => [d.slug, d]));

export const days: Day[] = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];

export const dayNames: Record<Lang, Record<Day, string>> = {
  en: { sat: "Saturday", sun: "Sunday", mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday" },
  bn: { sat: "শনিবার", sun: "রবিবার", mon: "সোমবার", tue: "মঙ্গলবার", wed: "বুধবার", thu: "বৃহস্পতিবার", fri: "শুক্রবার" },
};

export const designations: { slug: Designation; en: string; bn: string }[] = [
  { slug: "professor", en: "Professor", bn: "অধ্যাপক" },
  { slug: "associate-professor", en: "Associate Professor", bn: "সহযোগী অধ্যাপক" },
  { slug: "assistant-professor", en: "Assistant Professor", bn: "সহকারী অধ্যাপক" },
  { slug: "consultant", en: "Consultant", bn: "কনসালটেন্ট" },
  { slug: "specialist", en: "Specialist", bn: "বিশেষজ্ঞ" },
  { slug: "medical-officer", en: "Medical Officer", bn: "মেডিকেল অফিসার" },
  { slug: "general-physician", en: "General Physician", bn: "সাধারণ চিকিৎসক" },
];

// Available Doctors first, then seniority, then name.
const seniority: Designation[] = ["professor", "associate-professor", "assistant-professor", "consultant", "specialist", "medical-officer", "general-physician"];
export function bySeniority<T extends { available: boolean; designation: Designation; name: string }>(list: T[]) {
  return [...list].sort((a, b) => Number(b.available) - Number(a.available) || seniority.indexOf(a.designation) - seniority.indexOf(b.designation) || a.name.localeCompare(b.name));
}

export function doctorsInSpecialty(slug: string) {
  return doctors.filter((d) => d.specialty === slug || d.alsoIn.includes(slug));
}

export function specialtyOf(d: Doctor): Specialty {
  return specialtyBySlug.get(d.specialty)!;
}

export const doctorName = (d: Doctor, lang: Lang) => (lang === "bn" ? bnName(d.name) : d.name);
export const doctorPost = (d: Doctor, lang: Lang) => (lang === "bn" ? bnTerm(d.post) : d.post);
export const placeName = (s: string, lang: Lang) => (lang === "bn" ? bnTerm(s) : s);
export const diseaseName = (s: string, lang: Lang) => (lang === "bn" ? bnDisease(s) : s);

// A few listed doctors sit only in Dhaka, Jashore or Barisal; their pages must not claim Khulna.
const cities = { Dhaka: "ঢাকা", Jashore: "যশোর", Barisal: "বরিশাল", Khulna: "খুলনা" } as const;
export type City = keyof typeof cities;
export const cityOf = (chamber: string): City => (chamber.match(/(Dhaka|Jashore|Barisal)\s*$/i)?.[1].replace(/^./, (c) => c.toUpperCase()) as City) ?? "Khulna";
/** Where the Doctor sees patients: Khulna if any chamber is there, else the first chamber's city. */
export const doctorCity = (d: Doctor): City => (d.chambers.some((c) => cityOf(c.name) === "Khulna") || !d.chambers[0] ? "Khulna" : cityOf(d.chambers[0].name));
export const cityName = (c: City, lang: Lang) => (lang === "bn" ? cities[c] : c);
/** Chamber name without its street address: "Mirpur General Hospital (Plot#10, …), Dhaka" → "Mirpur General Hospital, Dhaka". */
export const shortChamber = (s: string, lang: Lang) => placeName(s, lang).replace(/\s*\(.*\)/, ""); // greedy: addresses nest brackets

export function money(n: number | null | undefined, lang: Lang) {
  if (n == null) return lang === "bn" ? "জানতে কল করুন" : "Call to ask";
  if (n === 0) return lang === "bn" ? "ফ্রি" : "Free";
  return lang === "bn" ? `${bnDigits(n)} টাকা` : `৳${n}`;
}

const bnPeriod = (h24: number) =>
  h24 < 4 ? "রাত" : h24 < 12 ? "সকাল" : h24 < 15 ? "দুপুর" : h24 < 18 ? "বিকাল" : h24 < 19 ? "সন্ধ্যা" : "রাত";

function formatClock(raw: string, lang: Lang) {
  const m = raw.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!m) return lang === "bn" ? bnTerm(raw) : raw;
  const h = Number(m[1]);
  const min = m[2] ?? "00";
  const pm = m[3].toLowerCase() === "pm";
  if (lang === "en") return `${h}:${min} ${pm ? "PM" : "AM"}`;
  const h24 = (h % 12) + (pm ? 12 : 0);
  return `${bnPeriod(h24)} ${bnDigits(h)}:${bnDigits(min)}`;
}

/** "05:00 pm to 08:00 pm and ..." → "5:00 PM – 8:00 PM, ..." in the chosen language. */
export function formatHours(time: string | null, lang: Lang) {
  if (!time) return lang === "bn" ? "বন্ধ" : "Closed";
  return time
    .split(/\s+and\s+/i)
    .map((range) => range.split(/\s+to\s+/i).map((t) => formatClock(t, lang)).join(" – "))
    .join(lang === "bn" ? ", " : ", ");
}

export function openDays(d: Doctor): Day[] {
  const set = new Set<Day>();
  for (const c of d.chambers) for (const s of c.schedule) if (s.time) set.add(s.day);
  return days.filter((x) => set.has(x));
}
