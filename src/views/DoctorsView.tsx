import { specialties } from "@/data/specialties";
import { dictionaries, fill } from "@/lib/dictionary";
import { dayNames, days, designations, diseaseName, doctorName, doctors, openDays, placeName, specialtyOf } from "@/lib/doctors";
import { bnDigits } from "@/lib/bangla";
import type { Lang } from "@/lib/site";
import { DoctorFinder, type FinderDoctor } from "@/components/DoctorFinder";
import { cardData } from "@/components/DoctorCard";
import { PageHeader } from "@/components/PageHeader";

export function DoctorsView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];
  const data: FinderDoctor[] = [...doctors]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || Number(b.available) - Number(a.available) || a.name.localeCompare(b.name))
    .map((d) => {
      const sp = specialtyOf(d);
      const name = doctorName(d, lang);
      return {
        card: cardData(d, lang),
        sp: [d.specialty, ...d.alsoIn],
        dg: d.designation,
        f: d.fees.new,
        dy: openDays(d),
        x: [name, d.name, sp.en, sp.bn, sp.enPerson, sp.bnPerson, ...d.diseases.map((x) => diseaseName(x, lang)), ...d.chambers.map((c) => placeName(c.name, lang))].join(" ").toLowerCase(),
      };
    });
  return (
    <>
      <PageHeader lang={lang} title={t.allDoctors} body={fill(t.doctorsCount, { n: lang === "bn" ? bnDigits(doctors.length) : doctors.length })} crumbs={[{ label: t.nav.doctors }]} />
      <div className="container-x mt-8">
        <DoctorFinder
          lang={lang}
          data={data}
          specialties={specialties.map((s) => ({ value: s.slug, label: lang === "bn" ? s.bn : s.en }))}
          designations={designations.map((d) => ({ value: d.slug, label: lang === "bn" ? d.bn : d.en }))}
          days={days.map((d) => ({ value: d, label: dayNames[lang][d] }))}
        />
      </div>
    </>
  );
}
