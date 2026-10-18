import Link from "next/link";
import { specialties, type Specialty } from "@/data/specialties";
import { dictionaries, fill } from "@/lib/dictionary";
import { designations, doctors, doctorsInSpecialty, type Designation } from "@/lib/doctors";
import { bnDigits } from "@/lib/bangla";
import { href, type Lang } from "@/lib/site";
import { DoctorCard, DoctorGrid } from "@/components/DoctorCard";
import { PageHeader } from "@/components/PageHeader";
import { AppIcon, IconTile, toneText } from "@/components/AppIcon";

const count = (n: number, lang: Lang) => fill(dictionaries[lang].doctorsCount, { n: lang === "bn" ? bnDigits(n) : n });

// Available Doctors first, then seniority, then name.
const seniority: Designation[] = ["professor", "associate-professor", "assistant-professor", "consultant", "specialist", "medical-officer", "general-physician"];
function sortDoctors<T extends { available: boolean; designation: Designation; name: string }>(list: T[]) {
  return [...list].sort((a, b) => Number(b.available) - Number(a.available) || seniority.indexOf(a.designation) - seniority.indexOf(b.designation) || a.name.localeCompare(b.name));
}

export function SpecialtyView({ specialty: s, lang }: { specialty: Specialty; lang: Lang }) {
  const t = dictionaries[lang];
  const list = sortDoctors(doctorsInSpecialty(s.slug));
  const title = lang === "bn" ? `${s.bnPerson} — খুলনা` : `${s.enPerson}s in Khulna`;
  return (
    <>
      <PageHeader
        lang={lang}
        icon={s.icon}
        tone={s.tone}
        title={title}
        body={count(list.length, lang)}
        crumbs={[{ label: t.nav.specialties, to: href(lang, "/specialties") }, { label: lang === "bn" ? s.bn : s.en }]}
      />
      <div className="container-x mt-8">
        <DoctorGrid>
          {list.map((d) => (
            <DoctorCard key={d.slug} doctor={d} lang={lang} specialtyLabel={lang === "bn" ? s.bnPerson : s.enPerson} />
          ))}
        </DoctorGrid>
        <OtherSpecialties lang={lang} current={s.slug} />
      </div>
    </>
  );
}

function OtherSpecialties({ lang, current }: { lang: Lang; current?: string }) {
  const t = dictionaries[lang];
  return (
    <section className="mt-14">
      <h2 className="text-lg font-bold">{t.browseSpecialties}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {specialties
          .filter((s) => s.slug !== current)
          .map((s) => (
            <Link key={s.slug} href={href(lang, `/specialties/${s.slug}`)} className="chip border border-line !bg-surface hover:border-brand hover:text-ink">
              <AppIcon name={s.icon} className={`size-4 ${toneText(s.tone)}`} /> {lang === "bn" ? s.bn : s.en}
            </Link>
          ))}
      </div>
    </section>
  );
}

export function SpecialtiesView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];
  const groups = [
    { key: "medicine", label: lang === "bn" ? "মেডিসিন ও অন্যান্য" : "Medicine & clinical" },
    { key: "surgery", label: lang === "bn" ? "সার্জারি" : "Surgery" },
  ] as const;
  return (
    <>
      <PageHeader lang={lang} title={t.nav.specialties} body={t.browseSpecialties} crumbs={[{ label: t.nav.specialties }]} />
      <div className="container-x mt-8 space-y-10">
        {groups.map((g) => (
          <section key={g.key}>
            <h2 className="text-lg font-bold">{g.label}</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {specialties
                .filter((s) => s.group === g.key)
                .map((s) => (
                  <Link key={s.slug} href={href(lang, `/specialties/${s.slug}`)} className="card flex items-center gap-4 p-4 transition hover:border-brand hover:shadow-md">
                    <IconTile name={s.icon} tone={s.tone} className="size-12 rounded-xl" iconClassName="size-6" />
                    <span>
                      <span className="block font-semibold">{lang === "bn" ? s.bn : s.en}</span>
                      <span className="block text-sm text-ink-2">
                        {lang === "bn" ? s.bnPerson : s.enPerson} · {count(doctorsInSpecialty(s.slug).length, lang)}
                      </span>
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

export function DesignationView({ slug, lang }: { slug: Designation; lang: Lang }) {
  const t = dictionaries[lang];
  const d = designations.find((x) => x.slug === slug)!;
  const list = sortDoctors(doctors.filter((x) => x.designation === slug));
  return (
    <>
      <PageHeader lang={lang} title={lang === "bn" ? d.bn : `${d.en}s`} body={count(list.length, lang)} crumbs={[{ label: t.nav.designation }, { label: lang === "bn" ? d.bn : d.en }]} />
      <div className="container-x mt-6">
        <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {designations.map((x) => (
            <Link key={x.slug} href={href(lang, `/designations/${x.slug}`)} className={`btn shrink-0 !py-1.5 text-sm ${x.slug === slug ? "btn-brand" : "btn-ghost border border-line"}`}>
              {lang === "bn" ? x.bn : x.en}
            </Link>
          ))}
        </div>
        <DoctorGrid>
          {list.map((x) => (
            <DoctorCard key={x.slug} doctor={x} lang={lang} />
          ))}
        </DoctorGrid>
      </div>
    </>
  );
}
