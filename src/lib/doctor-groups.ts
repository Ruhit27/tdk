// Groups of Doctors that blog Doctor Lists are built from: by Specialty, by Hospital, or by the day they sit.
// The directory spells hospital names many ways ("Top Choice Diagnostic Center", "Top Choice Diagnostic Centre, Khulna."),
// so each Hospital is matched by pattern, and only chambers in Khulna count.
import { facilities, type Facility } from "@/data/facilities";
import { bySeniority, doctors, doctorsInSpecialty, type Day, type Doctor } from "@/lib/doctors";

export type Chamber = Doctor["chambers"][number];
export type Sitting = { doctor: Doctor; chamber: Chamber | null };

export type Hospital = {
  slug: string;
  en: string;
  bn: string;
  match: RegExp;
  /** The listed Facility, when we hold its address and phone numbers. */
  facility?: Facility;
};

const facility = (en: string) => facilities.find((f) => f.en === en);

export const hospitals: Hospital[] = [
  { slug: "top-choice-diagnostic-center", en: "Top Choice Diagnostic Center", bn: "টপ চয়েস ডায়াগনস্টিক সেন্টার", match: /^top choice/i, facility: facility("Top Choice Diagnostic Centre") },
  { slug: "khulna-city-medical-college-hospital", en: "Khulna City Medical College Hospital", bn: "খুলনা সিটি মেডিকেল কলেজ হাসপাতাল", match: /^khulna city medical college/i, facility: facility("Khulna City Medical College Hospital") },
  { slug: "islami-bank-hospital-khulna", en: "Islami Bank Hospital, Khulna", bn: "ইসলামী ব্যাংক হাসপাতাল, খুলনা", match: /^islami bank hospital/i, facility: facility("Islami Bank Hospital") },
  { slug: "doctors-point-specialized-hospital", en: "Doctors Point Specialized Hospital", bn: "ডক্টরস পয়েন্ট স্পেশালাইজড হাসপাতাল", match: /^doctors point/i },
  { slug: "labaid-diagnostic-khulna", en: "Labaid Diagnostic, Khulna", bn: "ল্যাবএইড ডায়াগনস্টিক, খুলনা", match: /^lab ?aid/i },
  { slug: "garib-nawaz-clinic", en: "Garib Nawaz Clinic", bn: "গরীবে নেওয়াজ ক্লিনিক", match: /^garib/i },
  { slug: "gazi-medical-college-hospital", en: "Gazi Medical College Hospital", bn: "গাজী মেডিকেল কলেজ হাসপাতাল", match: /^gazi medical college/i, facility: facility("Gazi Medical College and Hospital") },
];

const inKhulna = (name: string) => /khulna/i.test(name);

export function sittingsAtHospital(h: Hospital): Sitting[] {
  const out: Sitting[] = [];
  for (const d of bySeniority(doctors)) {
    const chamber = d.chambers.find((c) => h.match.test(c.name) && inKhulna(c.name));
    if (chamber) out.push({ doctor: d, chamber });
  }
  return out;
}

export function sittingsOnDay(day: Day): Sitting[] {
  const out: Sitting[] = [];
  for (const d of bySeniority(doctors)) {
    const chamber = d.chambers.find((c) => c.schedule.some((s) => s.day === day && s.time));
    if (chamber) out.push({ doctor: d, chamber });
  }
  return out;
}

/** What a Post's `doctors` block asks for. */
export type DoctorQuery = { specialty: string } | { hospital: string } | { day: Day };

export function resolveQuery(q: DoctorQuery): Sitting[] {
  if ("specialty" in q) return bySeniority(doctorsInSpecialty(q.specialty)).map((doctor) => ({ doctor, chamber: null }));
  if ("hospital" in q) return sittingsAtHospital(hospitals.find((h) => h.slug === q.hospital)!);
  return sittingsOnDay(q.day);
}
