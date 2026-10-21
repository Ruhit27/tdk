import Link from "next/link";
import { specialties } from "@/data/specialties";
import { designations } from "@/lib/doctors";
import { dictionaries } from "@/lib/dictionary";
import { href, site, type Lang } from "@/lib/site";
import { bnDigits } from "@/lib/bangla";
import { Logo } from "@/components/Logo";
import { LangSwitch } from "@/components/LangSwitch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchBox } from "@/components/SearchBox";
import { PhoneIcon } from "@/components/icons";
import { NavDropdown } from "@/components/NavDropdown";
import { IconTile } from "@/components/AppIcon";

export function navLinks(lang: Lang) {
  const t = dictionaries[lang].nav;
  return [
    { label: t.hospitals, to: href(lang, "/hospitals") },
    { label: t.diagnostics, to: href(lang, "/diagnostics") },
    { label: t.ambulance, to: href(lang, "/ambulance") },
    { label: t.bloodBanks, to: href(lang, "/blood-banks") },
    { label: t.pharmacies, to: href(lang, "/pharmacies") },
    { label: t.blog, to: href(lang, "/blog") },
    { label: t.contact, to: href(lang, "/contact") },
  ];
}

export function Header({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];
  const phone = lang === "bn" ? bnDigits(site.phoneDisplay) : site.phoneDisplay;
  const specialtyLinks = specialties.map((s) => ({ label: lang === "bn" ? s.bn : s.en, icon: s.icon, tone: s.tone, to: href(lang, `/specialties/${s.slug}`) }));
  const moreLinks = [
    ...navLinks(lang).slice(3),
    { label: t.nav.labTests, to: href(lang, "/lab-tests") },
    { label: t.nav.indiaTreatment, to: href(lang, "/india-treatment") },
    { label: t.nav.about, to: href(lang, "/about") },
  ];
  const designationLinks = designations.map((d) => ({ label: lang === "bn" ? d.bn : d.en, to: href(lang, `/designations/${d.slug}`) }));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      {/* Row 1: call · logo (centred) · language */}
      <div className="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-2 md:h-[72px]">
        <div className="flex items-center justify-start">
          <a
            href={`tel:${site.phoneTel}`}
            aria-label={`${t.header.callLabel}: ${phone}`}
            className="group inline-flex items-center gap-3 rounded-full border border-line bg-surface p-1 shadow-sm transition hover:border-brand hover:shadow-md md:py-1.5 md:pl-1.5 md:pr-4"
          >
            <span className="relative grid size-9 place-items-center rounded-full bg-brand text-brand-ink">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-25 motion-reduce:hidden" aria-hidden />
              <PhoneIcon className="relative size-4" />
            </span>
            <span className="hidden leading-tight md:block">
              <span className="block text-[11px] font-medium text-ink-2">{t.header.callLabel}</span>
              <span className="block text-sm font-bold tracking-wide text-ink group-hover:text-brand-strong">{phone}</span>
            </span>
          </a>
        </div>

        <Link href={href(lang, "/")} className="justify-self-center" aria-label={t.siteName}>
          <Logo />
        </Link>

        <div className="flex items-center justify-end gap-1">
          <span className="hidden sm:block">
            <LangSwitch lang={lang} />
          </span>
          <span className="md:hidden">
            <ThemeToggle label={t.theme} />
          </span>
          <MobileMenu lang={lang} specialties={specialtyLinks} designations={designationLinks} links={navLinks(lang)} />
        </div>
      </div>

      {/* Row 2: navigation · search · theme */}
      <div className="hidden border-t border-line md:block">
        <div className="container-x flex h-14 items-center gap-3">
        <nav className="-ml-3 hidden items-center gap-1 text-sm font-medium lg:flex" aria-label="Main">
          <NavDropdown label={t.nav.doctors} href={href(lang, "/doctors")} panelClassName="w-[44rem]">
            <div className="grid grid-cols-3 gap-1">
              {specialtyLinks.map((s) => (
                <Link key={s.to} href={s.to} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-ink-2 hover:bg-surface-2 hover:text-ink">
                  <IconTile name={s.icon} tone={s.tone} className="size-7 rounded-lg" iconClassName="size-4" />
                  {s.label}
                </Link>
              ))}
            </div>
          </NavDropdown>
          <NavDropdown label={t.nav.designation}>
            {designationLinks.map((d) => (
              <Link key={d.to} href={d.to} className="block rounded-lg px-3 py-1.5 text-ink-2 hover:bg-surface-2 hover:text-ink">
                {d.label}
              </Link>
            ))}
          </NavDropdown>
          {navLinks(lang).slice(0, 3).map((l) => (
            <Link key={l.to} href={l.to} className="whitespace-nowrap rounded-full px-3 py-2 hover:bg-surface-2">
              {l.label}
            </Link>
          ))}
          <NavDropdown label={t.nav.more} align="right" panelClassName="w-56">
            {moreLinks.map((l) => (
              <Link key={l.to} href={l.to} className="block whitespace-nowrap rounded-lg px-3 py-1.5 text-ink-2 hover:bg-surface-2 hover:text-ink">
                {l.label}
              </Link>
            ))}
          </NavDropdown>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="w-64 xl:w-72">
            <SearchBox lang={lang} compact />
          </div>
          <ThemeToggle label={t.theme} />
        </div>
        </div>
      </div>
    </header>
  );
}
