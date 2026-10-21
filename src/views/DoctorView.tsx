import Link from "next/link";
import { Info } from "lucide-react";
import { specialtyBySlug } from "@/data/specialties";
import { dictionaries, fill } from "@/lib/dictionary";
import { cityName, days, dayNames, designations, diseaseName, doctorCity, doctorName, doctorPost, doctorsInSpecialty, formatHours, money, openDays, placeName, specialtyOf, type Day, type Doctor } from "@/lib/doctors";
import { posts } from "@/content/blog";
import { doctorListSlug } from "@/content/doctor-lists";
import { href, site, whatsappLink, type Lang } from "@/lib/site";
import { bnDigits } from "@/lib/bangla";
import { Avatar } from "@/components/Avatar";
import { DoctorCard } from "@/components/DoctorCard";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { CheckIcon, ClockIcon, GraduationIcon, HospitalIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { AppIcon, toneText } from "@/components/AppIcon";

const schemaDay: Record<Day, string> = { sat: "Saturday", sun: "Sunday", mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday" };
/** "05:00 pm" → "17:00"; null when the clock can't be read. */
function to24(raw: string) {
  const m = raw.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!m) return null;
  return `${String((Number(m[1]) % 12) + (m[3].toLowerCase() === "pm" ? 12 : 0)).padStart(2, "0")}:${m[2] ?? "00"}`;
}
/** schema.org opening hours for one chamber: one entry per day and time range. */
function openingHours(schedule: Doctor["chambers"][number]["schedule"]) {
  return schedule.flatMap((s) =>
    (s.time ?? "")
      .split(/\s+and\s+/i)
      .map((range) => range.split(/\s+to\s+/i).map(to24))
      .filter((r): r is [string, string] => r.length === 2 && r.every(Boolean))
      .map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: schemaDay[s.day], opens, closes })),
  );
}

export function DoctorView({ doctor: d, lang }: { doctor: Doctor; lang: Lang }) {
  const t = dictionaries[lang];
  const sp = specialtyOf(d);
  const name = doctorName(d, lang);
  const spName = lang === "bn" ? sp.bnPerson : sp.enPerson;
  const firstChamber = d.chambers[0]?.name ? placeName(d.chambers[0].name, lang) : "";
  const waText = fill(t.whatsapp.doctor, { name, specialty: spName, chamber: firstChamber });
  const designation = designations.find((x) => x.slug === d.designation)!;
  const related = doctorsInSpecialty(d.specialty)
    .filter((x) => x.slug !== d.slug)
    .slice(0, 3);
  const open = openDays(d);
  const city = doctorCity(d);
  // The Doctor List Post for this specialty first, then guides about it.
  const reading = posts
    .filter((p) => p.related.includes(d.specialty))
    .sort((a, b) => Number(b.slug === doctorListSlug(sp)) - Number(a.slug === doctorListSlug(sp)))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: d.name,
    medicalSpecialty: sp.en,
    description: `${d.degrees}. ${d.post}`.trim(),
    url: `${site.url}${href(lang, `/doctors/${d.slug}`)}`,
    image: d.photo ? `${site.url}${d.photo}` : undefined,
    priceRange: typeof d.fees.new === "number" && d.fees.new > 0 ? `৳${d.fees.new}` : undefined,
    address: { "@type": "PostalAddress", addressLocality: city, addressCountry: "BD", streetAddress: d.chambers[0]?.name },
    openingHoursSpecification: d.chambers[0] ? openingHours(d.chambers[0].schedule) : undefined,
    // The number is the Booking Line, not the doctor's own, so it is offered as a way to book.
    potentialAction: { "@type": "ReserveAction", target: { "@type": "EntryPoint", urlTemplate: `tel:${site.phoneTel}` } },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHeader
        lang={lang}
        title={name}
        crumbs={[
          { label: t.nav.doctors, to: href(lang, "/doctors") },
          { label: lang === "bn" ? sp.bn : sp.en, to: href(lang, `/specialties/${sp.slug}`) },
          { label: name },
        ]}
      />
      <div className="container-x mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <section className="card flex flex-col gap-5 p-5 sm:flex-row sm:p-6" aria-labelledby="profile">
            <h2 id="profile" className="sr-only">
              {t.doctor.profile}
            </h2>
            <Avatar name={name} photo={d.photo} size={144} priority className="!rounded-3xl" />
            <div className="min-w-0">
              <Link href={href(lang, `/specialties/${sp.slug}`)} className="chip !bg-brand-soft font-medium text-brand-strong">
                <AppIcon name={sp.icon} className={`size-4 ${toneText(sp.tone)}`} /> {spName}
              </Link>
              <p className="mt-3 flex items-start gap-2 text-sm">
                <GraduationIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>
                  <span className="sr-only">{t.doctor.degrees}: </span>
                  {d.degrees}
                </span>
              </p>
              {d.post && (
                <p className="mt-2 flex items-start gap-2 text-sm">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>
                    {doctorPost(d, lang)} ·{" "}
                    <Link href={href(lang, `/designations/${designation.slug}`)} className="text-brand-strong hover:underline">
                      {lang === "bn" ? designation.bn : designation.en}
                    </Link>
                  </span>
                </p>
              )}
              {d.workplace && (
                <p className="mt-2 flex items-start gap-2 text-sm text-ink-2">
                  <HospitalIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>
                    {t.doctor.workplace}: {placeName(d.workplace, lang)}
                  </span>
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {days.map((day) => (
                  <span key={day} className={`chip !text-xs ${open.includes(day) ? "!bg-brand-soft !text-brand-strong font-semibold" : "line-through opacity-60"}`}>
                    {dayNames[lang][day].replace(/day$|বার$/, "")}
                  </span>
                ))}
              </div>
              {city !== "Khulna" && (
                <p className="mt-3 flex items-start gap-2 rounded-xl bg-surface-2 p-3 text-xs text-ink-2">
                  <Info className="mt-px size-4 shrink-0" aria-hidden />
                  {fill(t.doctor.outsideKhulna, { city: cityName(city, lang) })}
                </p>
              )}
              {d.alsoIn.length > 0 && (
                <p className="mt-3 text-xs text-ink-2">
                  {t.doctor.alsoListed}:{" "}
                  {d.alsoIn.map((s, i) => {
                    const o = specialtyBySlug.get(s)!;
                    return (
                      <span key={s}>
                        {i > 0 && ", "}
                        <Link href={href(lang, `/specialties/${s}`)} className="text-brand-strong hover:underline">
                          {lang === "bn" ? o.bn : o.en}
                        </Link>
                      </span>
                    );
                  })}
                </p>
              )}
            </div>
          </section>

          <section className="card p-5 sm:p-6">
            <h2 className="text-lg font-bold">{t.doctor.chambers}</h2>
            <div className="mt-4 space-y-5">
              {d.chambers.map((c, ci) => (
                <div key={ci}>
                  {c.name && (
                    <p className="flex items-start gap-2 font-medium">
                      <PinIcon className="mt-0.5 size-5 shrink-0 text-brand" />
                      {placeName(c.name, lang)}
                    </p>
                  )}
                  <table className="mt-3 w-full text-sm">
                    <tbody>
                      {days.map((day) => {
                        const slot = c.schedule.find((s) => s.day === day);
                        if (!slot) return null;
                        return (
                          <tr key={day} className="border-b border-line last:border-0">
                            <th scope="row" className="py-2 pr-3 text-left font-medium">
                              {dayNames[lang][day]}
                            </th>
                            <td className={`py-2 text-right ${slot.time ? "" : "text-danger"}`}>
                              <span className="inline-flex items-center gap-1.5">
                                {slot.time && <ClockIcon className="size-3.5 text-ink-2" />}
                                {formatHours(slot.time, lang)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-start gap-2 rounded-xl bg-surface-2 p-3 text-xs text-ink-2">
              <Info className="mt-px size-4 shrink-0" aria-hidden />
              {t.doctor.scheduleNote}
            </p>
          </section>

          <section className="card p-5 sm:p-6">
            <h2 className="text-lg font-bold">{t.doctor.treats}</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {d.diseases.map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                  {diseaseName(x, lang)}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="card overflow-hidden">
            <div className="bg-brand p-5 text-brand-ink">
              <h2 className="text-lg font-bold">{t.doctor.book}</h2>
              <p className="mt-1 text-sm opacity-90">{t.doctor.bookHelp}</p>
            </div>
            <div className="grid gap-2 p-5">
              <a href={`tel:${site.phoneTel}`} className="btn btn-brand h-12">
                <PhoneIcon className="size-5" /> {t.doctor.call} · {lang === "bn" ? bnDigits(site.phoneDisplay) : site.phoneDisplay}
              </a>
              <a href={whatsappLink(waText)} target="_blank" rel="noopener" className="btn btn-wa h-12">
                <WhatsAppIcon className="size-5" /> {t.doctor.whatsapp}
              </a>
            </div>
          </section>
          <section className="card p-5">
            <h2 className="text-lg font-bold">{t.doctor.fees}</h2>
            <dl className="mt-3 divide-y divide-line text-sm">
              {(
                [
                  [t.doctor.newPatient, d.fees.new],
                  [t.doctor.returning, d.fees.returning],
                  [t.doctor.report, d.fees.report],
                ] as const
              ).map(([label, v]) => (
                <div key={label} className="flex justify-between py-2.5">
                  <dt className="text-ink-2">{label}</dt>
                  <dd className="font-semibold">{money(v, lang)}</dd>
                </div>
              ))}
            </dl>
          </section>
          {reading.length > 0 && (
            <section className="card p-5">
              <h2 className="text-lg font-bold">{t.doctor.readMore}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {reading.map((p) => (
                  <li key={p.slug}>
                    <Link href={href(lang, `/blog/${p.slug}`)} className="text-brand-strong hover:underline">
                      {p[lang].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="container-x mt-12">
          <h2 className="text-xl font-bold">{t.doctor.related}</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <DoctorCard key={r.slug} doctor={r} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
