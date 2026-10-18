"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { dictionaries } from "@/lib/dictionary";
import { href, type Lang } from "@/lib/site";
import { expandSearchPayload, type SearchEntry, type SearchPayload } from "@/lib/search-expand";
import { SearchIcon } from "@/components/icons";
import { Avatar } from "@/components/Avatar";
import { IconTile } from "@/components/AppIcon";

const cache: Partial<Record<Lang, Promise<SearchEntry[]>>> = {};

function loadIndex(lang: Lang) {
  cache[lang] ??= fetch(`/search-index/${lang}`)
    .then((r) => r.json() as Promise<SearchPayload>)
    .then((p) => expandSearchPayload(p, lang));
  return cache[lang]!;
}

export function SearchBox({ lang, compact = false, autoFocus = false }: { lang: Lang; compact?: boolean; autoFocus?: boolean }) {
  const t = dictionaries[lang].search;
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const results = useMemo(() => {
    const words = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!index || words.length === 0) return [];
    const hits = index.filter((e) => words.every((w) => e.x.includes(w)));
    // Specialties first, then doctors whose name matches, then everything else.
    hits.sort((a, b) => rank(a) - rank(b));
    return hits.slice(0, 8);
    function rank(e: SearchEntry) {
      if (e.k === "s") return 0;
      return words.every((w) => e.t.toLowerCase().includes(w)) ? 1 : 2;
    }
  }, [q, index]);

  function prime() {
    if (!index) loadIndex(lang).then(setIndex);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[active];
      router.push(hit ? hit.u : `${href(lang, "/doctors")}?q=${encodeURIComponent(q)}`);
      setOpen(false);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={box} className="relative w-full">
      <label className="relative block">
        <span className="sr-only">{t.placeholder}</span>
        <SearchIcon className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-2 ${compact ? "size-4" : "size-5"}`} />
        <input
          type="search"
          value={q}
          autoFocus={autoFocus}
          onFocus={() => {
            prime();
            setOpen(true);
          }}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
            setOpen(true);
            prime();
          }}
          onKeyDown={onKey}
          placeholder={compact ? t.short : t.placeholder}
          className={`field appearance-none py-0 leading-none ${compact ? "h-10 !rounded-full pl-10 text-sm" : "h-14 !rounded-2xl pl-12 text-base shadow-sm"}`}
          role="combobox"
          aria-expanded={open && q.length > 0}
          aria-controls="search-results"
          autoComplete="off"
        />
      </label>
      {open && q.trim() && (
        <div id="search-results" role="listbox" className={`card absolute z-50 mt-2 max-h-[70vh] overflow-auto p-2 shadow-2xl ${compact ? "right-0 w-[22rem] max-w-[calc(100vw-2rem)]" : "inset-x-0"}`}>
          {!index && <p className="p-3 text-sm text-ink-2">…</p>}
          {index && results.length === 0 && <p className="p-3 text-sm text-ink-2">{t.noResults}</p>}
          {results.map((r, i) => (
            <Link
              key={r.u}
              href={r.u}
              role="option"
              aria-selected={i === active}
              onClick={() => setOpen(false)}
              onMouseEnter={() => setActive(i)}
              className={`flex items-center gap-3 rounded-xl p-2 ${i === active ? "bg-surface-2" : ""}`}
            >
              {r.k === "s" ? (
                r.i && <IconTile name={r.i} tone={r.tn ?? "teal"} className="size-10 rounded-xl" />
              ) : (
                <Avatar name={r.t} photo={r.p ?? null} size={40} />
              )}
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{r.t}</span>
                <span className="block truncate text-xs text-ink-2">
                  {r.k === "s" ? t.specialty : t.doctor} · {r.st}
                </span>
              </span>
            </Link>
          ))}
          {index && q.trim() && (
            <Link href={`${href(lang, "/doctors")}?q=${encodeURIComponent(q)}`} onClick={() => setOpen(false)} className="mt-1 block rounded-xl p-2 text-center text-sm font-semibold text-brand-strong hover:bg-surface-2">
              {t.allResults} →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
