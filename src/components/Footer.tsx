import Link from "next/link";
import { emergencyLines } from "@/data/facilities";
import { dictionaries } from "@/lib/dictionary";
import { bnDigits } from "@/lib/bangla";
import { href, site, whatsappLink, type Lang } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

export function Footer({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];
  const n = (s: string) => (lang === "bn" ? bnDigits(s) : s);
  const services = [
    { label: t.services.appointment.title, to: href(lang, "/doctors") },
    { label: t.services.lab.title, to: href(lang, "/lab-tests") },
    { label: t.services.admission.title, to: href(lang, "/hospitals") },
    { label: t.services.ambulance.title, to: href(lang, "/ambulance") },
    { label: t.services.india.title, to: href(lang, "/india-treatment") },
  ];
  const quick = [
    { label: t.nav.about, to: href(lang, "/about") },
    { label: t.nav.specialties, to: href(lang, "/specialties") },
    { label: t.nav.bloodBanks, to: href(lang, "/blood-banks") },
    { label: t.nav.pharmacies, to: href(lang, "/pharmacies") },
    { label: t.nav.blog, to: href(lang, "/blog") },
    { label: t.nav.contact, to: href(lang, "/contact") },
  ];

  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-2">{t.footer.about}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-2">{t.footer.bookingLine}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <a href={`tel:${site.phoneTel}`} className="btn btn-brand !py-2 text-sm">
              <PhoneIcon className="size-4" /> {n(site.phoneDisplay)}
            </a>
            <a href={whatsappLink(t.whatsapp.general)} target="_blank" rel="noopener" className="btn btn-wa !py-2 text-sm" aria-label="WhatsApp">
              <WhatsAppIcon className="size-4" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">{t.nav.services}</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-2">
            {services.map((l) => (
              <li key={l.to + l.label}>
                <Link href={l.to} className="hover:text-brand-strong">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">{t.footer.quick}</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-2">
            {quick.map((l) => (
              <li key={l.to}>
                <Link href={l.to} className="hover:text-brand-strong">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-danger">{t.footer.emergency}</h3>
          <ul className="mt-3 space-y-3 text-sm">
            {emergencyLines.map((e) => (
              <li key={e.en}>
                <span className="block text-ink">{lang === "bn" ? e.bn : e.en}</span>
                <span className="flex flex-wrap gap-x-3 text-ink-2">
                  {e.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/-/g, "")}`} className="hover:text-brand-strong">
                      {n(p)}
                    </a>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year lang={lang} /> {t.siteName}. {t.footer.rights}
          </p>
          <p>{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}

async function Year({ lang }: { lang: Lang }) {
  "use cache";
  const y = String(new Date().getFullYear());
  return lang === "bn" ? bnDigits(y) : y;
}
