"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { dictionaries } from "@/lib/dictionary";
import { href, type Lang } from "@/lib/site";
import { ChevronIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { SearchBox } from "@/components/SearchBox";
import { LangSwitch } from "@/components/LangSwitch";
import { IconTile, type IconName, type Tone } from "@/components/AppIcon";

type L = { label: string; to: string; icon?: IconName; tone?: Tone };

export function MobileMenu({ lang, specialties, designations, links }: { lang: Lang; specialties: L[]; designations: L[]; links: L[] }) {
  const t = dictionaries[lang].nav;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} className="grid size-10 place-items-center rounded-full hover:bg-surface-2 lg:hidden" aria-label={t.menu} aria-expanded={open}>
        <MenuIcon className="size-6" />
      </button>
      {/* Portalled to <body>: the header's backdrop-filter would otherwise become the
          containing block for this fixed overlay and clip it to the header's height. */}
      {open && createPortal(
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-label={t.close} />
          <div className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-surface shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <LangSwitch lang={lang} />
              <button onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-surface-2" aria-label={t.close}>
                <CloseIcon className="size-6" />
              </button>
            </div>
            {/* Any link tap inside the drawer closes it. */}
            <div className="flex-1 overflow-y-auto p-4" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
              <SearchBox lang={lang} compact />
              <nav className="mt-4 space-y-1 text-[15px]">
                <Link href={href(lang, "/")} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-surface-2">
                  {t.home}
                </Link>
                <Link href={href(lang, "/doctors")} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-surface-2">
                  {t.doctors}
                </Link>
                <details className="group rounded-xl">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2.5 font-medium hover:bg-surface-2">
                    {t.specialties}
                    <ChevronIcon className="size-4 transition group-open:rotate-180" />
                  </summary>
                  <div className="grid grid-cols-1 gap-0.5 py-1 pl-2">
                    {specialties.map((s) => (
                      <Link key={s.to} href={s.to} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-surface-2">
                        {s.icon && <IconTile name={s.icon} tone={s.tone ?? "teal"} className="size-7 rounded-lg" iconClassName="size-4" />}
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </details>
                <details className="group rounded-xl">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2.5 font-medium hover:bg-surface-2">
                    {t.designation}
                    <ChevronIcon className="size-4 transition group-open:rotate-180" />
                  </summary>
                  <div className="py-1 pl-2">
                    {designations.map((d) => (
                      <Link key={d.to} href={d.to} className="block rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-surface-2">
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </details>
                {links.map((l) => (
                  <Link key={l.to} href={l.to} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-surface-2">
                    {l.label}
                  </Link>
                ))}
                <Link href={href(lang, "/lab-tests")} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-surface-2">
                  {t.labTests}
                </Link>
                <Link href={href(lang, "/india-treatment")} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-surface-2">
                  {t.indiaTreatment}
                </Link>
                <Link href={href(lang, "/about")} className="block rounded-xl px-3 py-2.5 font-medium hover:bg-surface-2">
                  {t.about}
                </Link>
              </nav>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
