import { dayNames, doctorName, money, openDays, placeName, specialtyOf, type Doctor } from "@/lib/doctors";
import { href, type Lang } from "@/lib/site";
import { DoctorCardView, type CardData } from "@/components/DoctorCardView";

export function cardData(doctor: Doctor, lang: Lang, specialtyLabel?: string): CardData {
  const sp = specialtyOf(doctor);
  const short = (d: string) => (lang === "bn" ? d.replace(/বার$/, "") : d.slice(0, 3));
  return {
    url: href(lang, `/doctors/${doctor.slug}`),
    name: doctorName(doctor, lang),
    specialty: specialtyLabel ?? (lang === "bn" ? sp.bnPerson : sp.enPerson),
    specialtyIcon: sp.icon,
    specialtyTone: sp.tone,
    degrees: doctor.degrees,
    chamber: doctor.chambers[0]?.name ? placeName(doctor.chambers[0].name, lang) : "",
    days: openDays(doctor)
      .map((d) => short(dayNames[lang][d]))
      .join(", "),
    fee: money(doctor.fees.new, lang),
    available: doctor.available,
    photo: doctor.photo,
  };
}

export function DoctorCard({ doctor, lang, specialtyLabel }: { doctor: Doctor; lang: Lang; specialtyLabel?: string }) {
  return <DoctorCardView d={cardData(doctor, lang, specialtyLabel)} lang={lang} />;
}

export function DoctorGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
