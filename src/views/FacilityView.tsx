import { BadgePercent } from "lucide-react";
import { facilities, type FacilityKind } from "@/data/facilities";
import { dictionaries } from "@/lib/dictionary";
import { bnDigits } from "@/lib/bangla";
import { site, whatsappLink, type Lang } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";

export function FacilityView({ kind, lang }: { kind: FacilityKind; lang: Lang }) {
  const t = dictionaries[lang];
  const f = t.facilities;
  const copy = {
    hospital: { title: f.hospitalsTitle, body: f.hospitalsBody, crumb: t.nav.hospitals, service: t.services.admission.title },
    diagnostic: { title: f.diagnosticsTitle, body: f.diagnosticsBody, crumb: t.nav.diagnostics, service: t.services.lab.title },
    "blood-bank": { title: f.bloodTitle, body: f.bloodBody, crumb: t.nav.bloodBanks, service: t.nav.bloodBanks },
    pharmacy: { title: f.pharmacyTitle, body: f.pharmacyBody, crumb: t.nav.pharmacies, service: t.nav.pharmacies },
  }[kind];
  const n = (s: string) => (lang === "bn" ? bnDigits(s) : s);
  const list = facilities.filter((x) => x.kind === kind);

  return (
    <>
      <PageHeader lang={lang} title={copy.title} body={copy.body} crumbs={[{ label: copy.crumb }]} />
      <div className="container-x mt-8 grid gap-4 md:grid-cols-2">
        {list.map((x) => (
          <article key={x.en} className="card flex flex-col gap-4 p-5 sm:flex-row">
            {x.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={x.logo} alt="" width={88} height={88} loading="lazy" className="size-20 shrink-0 rounded-2xl border border-line bg-white object-contain p-2" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold">{lang === "bn" ? x.bn : x.en}</h2>
                {x.discount && <span className="chip !bg-amber-100 !text-amber-800 dark:!bg-amber-500/15 dark:!text-amber-300"><BadgePercent className="size-3.5" aria-hidden /> {f.discount}</span>}
              </div>
              <p className="mt-1 flex items-start gap-1.5 text-sm text-ink-2">
                <PinIcon className="mt-0.5 size-4 shrink-0" />
                {lang === "bn" ? x.addressBn : x.addressEn}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {x.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/-/g, "")}`} className="btn btn-ghost !px-3 !py-1.5 text-sm">
                    <PhoneIcon className="size-3.5" /> {n(p)}
                  </a>
                ))}
                {x.link && (
                  <a href={x.link} target="_blank" rel="noopener" className="btn btn-ghost !px-3 !py-1.5 text-sm">
                    Facebook ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="container-x mt-8">
        <div className="card flex flex-col items-start justify-between gap-4 bg-brand-soft/50 p-5 sm:flex-row sm:items-center">
          <p className="font-medium">{copy.body}</p>
          <div className="flex shrink-0 gap-2">
            <a href={`tel:${site.phoneTel}`} className="btn btn-brand">
              <PhoneIcon className="size-4" /> {t.doctor.call}
            </a>
            <a href={whatsappLink(t.whatsapp.service.replace("{service}", copy.service))} target="_blank" rel="noopener" className="btn btn-wa">
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
