"use client";

import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { Lang } from "@/lib/site";

export function otherLangPath(lang: Lang, path: string) {
  if (lang === "bn") return path.replace(/^\/bn(?=\/|$)/, "") || "/";
  return path === "/" ? "/bn" : `/bn${path}`;
}

/**
 * Two-option pill (EN | বাংলা) with the current language filled in, so it reads as a switch.
 * Plain <a>, not <Link>: each language has its own root layout, so switching is a full page load anyway.
 */
export function LangSwitch({ lang, className = "" }: { lang: Lang; className?: string }) {
  const path = usePathname() ?? "/";
  const other = otherLangPath(lang, path);
  const options: { code: Lang; label: string; title: string }[] = [
    { code: "en", label: "EN", title: "English" },
    { code: "bn", label: "বাংলা", title: "বাংলায় দেখুন" },
  ];
  return (
    <div role="group" aria-label="Language / ভাষা" className={`inline-flex items-center gap-1 rounded-full border border-line bg-surface p-1 shadow-sm ${className}`}>
      <Languages className="ml-1.5 size-4 text-ink-2" aria-hidden />
      {options.map((o) =>
        o.code === lang ? (
          <span key={o.code} aria-current="true" className="rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-ink">
            {o.label}
          </span>
        ) : (
          <a key={o.code} href={other} hrefLang={o.code} title={o.title} className="rounded-full px-3 py-1 text-xs font-semibold text-ink-2 transition hover:bg-surface-2 hover:text-ink">
            {o.label}
          </a>
        ),
      )}
    </div>
  );
}
