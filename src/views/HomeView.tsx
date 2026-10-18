import Link from "next/link";
import { specialties } from "@/data/specialties";
import { dictionaries, fill } from "@/lib/dictionary";
import { designations, doctors } from "@/lib/doctors";
import { bnDigits } from "@/lib/bangla";
import { href, site, whatsappLink, type Lang } from "@/lib/site";
import { DoctorCard, DoctorGrid } from "@/components/DoctorCard";
import { SearchBox } from "@/components/SearchBox";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { IconTile } from "@/components/AppIcon";
import { HeroArt } from "@/components/HeroArt";

export function HomeView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];
  const n = (x: number | string) => (lang === "bn" ? bnDigits(x) : String(x));
  const featured = doctors.filter((d) => d.featured);
  const withPhoto = [...featured, ...doctors].filter((d) => d.photo);
  const services = [
    { ...t.services.appointment, icon: "stethoscope" as const, color: "teal" as const, to: href(lang, "/doctors"), tone: "from-teal-500/15" },
    { ...t.services.lab, icon: "test-tubes" as const, color: "amber" as const, to: href(lang, "/lab-tests"), tone: "from-amber-500/15" },
    { ...t.services.ambulance, icon: "ambulance" as const, color: "rose" as const, to: href(lang, "/ambulance"), tone: "from-rose-500/15" },
    { ...t.services.admission, icon: "hospital" as const, color: "sky" as const, to: href(lang, "/hospitals"), tone: "from-sky-500/15" },
    { ...t.services.india, icon: "plane" as const, color: "violet" as const, to: href(lang, "/india-treatment"), tone: "from-violet-500/15" },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_80%_-10%,var(--brand-soft),transparent),radial-gradient(40rem_20rem_at_0%_110%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent)]" />
        <div className="container-x grid items-center gap-10 py-10 sm:py-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="chip !bg-surface font-medium text-brand-strong shadow-sm"><span className="size-2 rounded-full bg-brand" aria-hidden /> {t.hero.eyebrow}</p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{t.hero.title}</h1>
            <p className="mt-4 max-w-xl text-base text-ink-2 sm:text-lg">{fill(t.hero.body, { count: n(doctors.length), specialties: n(specialties.length) })}</p>
            <div className="mt-6 max-w-xl">
              <SearchBox lang={lang} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`tel:${site.phoneTel}`} className="btn btn-brand">
                <PhoneIcon className="size-4" /> {t.hero.call}
              </a>
              <a href={whatsappLink(t.whatsapp.general)} target="_blank" rel="noopener" className="btn btn-wa">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-[2rem] border border-line shadow-xl">
              <HeroArt className="block h-auto w-full" />
            </div>
            <div className="card absolute -left-2 top-6 flex items-center gap-3 px-4 py-3 shadow-lg sm:-left-6">
              <IconTile name="stethoscope" tone="teal" className="size-10 rounded-xl" />
              <div className="leading-tight">
                <p className="text-lg font-bold">{n(doctors.length)}+</p>
                <p className="text-xs text-ink-2">{t.hero.statDoctors}</p>
              </div>
            </div>
            <div className="card absolute -right-2 bottom-6 flex items-center gap-3 px-4 py-3 shadow-lg sm:-right-6">
              <div className="flex -space-x-3">
                {withPhoto.slice(0, 3).map((d) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={d.slug} src={d.photo!} alt="" width={36} height={36} className="size-9 rounded-full border-2 border-surface object-cover" />
                ))}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold">{n(specialties.length)} {t.hero.statSpecialties}</p>
                <p className="text-xs text-ink-2">{t.hero.statBook}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mt-12">
        <h2 className="text-xl font-bold sm:text-2xl">{t.services.title}</h2>
        <div className="no-scrollbar -mx-4 mt-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {services.map((s) => (
            <Link key={s.to} href={s.to} className={`card w-64 shrink-0 snap-start bg-gradient-to-br ${s.tone} to-transparent p-5 transition hover:-translate-y-0.5 hover:shadow-lg sm:w-auto`}>
              <IconTile name={s.icon} tone={s.color} className="size-11 rounded-xl" iconClassName="size-6" />
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{s.body}</p>
            </Link>
          ))}
        </div>
      </section>


      <section className="container-x mt-14">
        <h2 className="text-xl font-bold sm:text-2xl">{t.browseDesignation}</h2>
        <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {designations.map((d) => (
            <Link key={d.slug} href={href(lang, `/designations/${d.slug}`)} className="btn btn-ghost shrink-0 border border-line text-sm">
              {lang === "bn" ? d.bn : d.en}
              <span className="text-xs text-ink-2">{n(doctors.filter((x) => x.designation === d.slug).length)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x mt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold sm:text-2xl">{t.popular}</h2>
          <Link href={href(lang, "/doctors")} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-strong">
            {t.allDoctors} <ArrowIcon className="size-4" />
          </Link>
        </div>
        <div className="mt-4">
          <DoctorGrid>
            {featured.map((d) => (
              <DoctorCard key={d.slug} doctor={d} lang={lang} />
            ))}
          </DoctorGrid>
        </div>
      </section>
    </>
  );
}
