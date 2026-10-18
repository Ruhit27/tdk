import Link from "next/link";
import { dictionaries } from "@/lib/dictionary";
import { href, type Lang } from "@/lib/site";
import { IconTile, type IconName, type Tone } from "@/components/AppIcon";

export function PageHeader({ lang, title, body, crumbs = [], icon, tone = "teal" }: { lang: Lang; title: string; body?: string; crumbs?: { label: string; to?: string }[]; icon?: IconName; tone?: Tone }) {
  const t = dictionaries[lang];
  const trail = [{ label: t.nav.home, to: href(lang, "/") }, ...crumbs];
  return (
    <section className="border-b border-line bg-gradient-to-b from-brand-soft/60 to-transparent">
      <div className="container-x py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-ink-2">
          {trail.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {c.to ? (
                <Link href={c.to} className="hover:text-brand-strong">
                  {c.label}
                </Link>
              ) : (
                <span className="text-ink">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {icon && <IconTile name={icon} tone={tone} className="size-12 rounded-2xl shadow-sm" iconClassName="size-6" />}
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        </div>
        {body && <p className="mt-3 max-w-2xl text-ink-2">{body}</p>}
      </div>
    </section>
  );
}
