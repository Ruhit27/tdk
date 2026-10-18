"use client";

import { useEffect, useMemo, useState } from "react";
import { dictionaries } from "@/lib/dictionary";
import { bnDigits } from "@/lib/digits";
import type { Lang } from "@/lib/site";
import { DoctorCardView, type CardData } from "@/components/DoctorCardView";

export type FinderDoctor = {
  card: CardData;
  sp: string[]; // specialty slugs
  dg: string; // designation slug
  f: number | null; // new patient fee
  dy: string[]; // open days
  x: string; // haystack
};

type Opt = { value: string; label: string };

const FEES = [500, 700, 1000];
const PAGE = 24;

export function DoctorFinder({ data, specialties, designations, days, lang }: { data: FinderDoctor[]; specialties: Opt[]; designations: Opt[]; days: Opt[]; lang: Lang }) {
  const t = dictionaries[lang];
  const num = (n: number) => (lang === "bn" ? bnDigits(n) : String(n));
  const feeLabel = (n: number) => (lang === "bn" ? `${bnDigits(n)} টাকা` : `৳${n}`);
  const [q, setQ] = useState("");
  const [sp, setSp] = useState("");
  const [day, setDay] = useState("");
  const [dg, setDg] = useState("");
  const [fee, setFee] = useState("");
  const [limit, setLimit] = useState(PAGE);

  // Pick up ?q= and ?specialty= from the header search without forcing this page to render dynamically.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect */
    setQ(params.get("q") ?? "");
    setSp(params.get("specialty") ?? "");
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const list = useMemo(() => {
    const words = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return data.filter(
      (d) =>
        (!sp || d.sp.includes(sp)) &&
        (!day || d.dy.includes(day)) &&
        (!dg || d.dg === dg) &&
        (!fee || (d.f != null && d.f <= Number(fee))) &&
        words.every((w) => d.x.includes(w)),
    );
  }, [data, q, sp, day, dg, fee]);

  const reset = () => {
    setQ("");
    setSp("");
    setDay("");
    setDg("");
    setFee("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
      <aside className="card h-fit space-y-3 p-4 lg:sticky lg:top-24">
        <h2 className="font-semibold">{t.filters.title}</h2>
        <input className="field" type="search" placeholder={t.filters.query} value={q} onChange={(e) => (setQ(e.target.value), setLimit(PAGE))} aria-label={t.filters.query} />
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          <Select label={t.filters.specialty} value={sp} onChange={setSp} options={[{ value: "", label: t.filters.anySpecialty }, ...specialties]} />
          <Select label={t.filters.day} value={day} onChange={setDay} options={[{ value: "", label: t.filters.anyDay }, ...days]} />
          <Select label={t.filters.designation} value={dg} onChange={setDg} options={[{ value: "", label: t.filters.anyDesignation }, ...designations]} />
          <Select label={t.filters.maxFee} value={fee} onChange={setFee} options={[{ value: "", label: t.filters.anyFee }, ...FEES.map((f) => ({ value: String(f), label: `≤ ${feeLabel(f)}` }))]} />
        </div>
        <button onClick={reset} className="btn btn-ghost w-full text-sm">
          {t.filters.reset}
        </button>
      </aside>

      <div>
        <p className="mb-4 text-sm text-ink-2" aria-live="polite">
          {t.filters.showing.replace("{n}", num(list.length))}
        </p>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {list.slice(0, limit).map((d) => (
            <DoctorCardView key={d.card.url} d={d.card} lang={lang} />
          ))}
        </div>
        {list.length === 0 && <p className="card p-8 text-center text-ink-2">{t.search.noResults}</p>}
        {list.length > limit && (
          <button onClick={() => setLimit((l) => l + PAGE)} className="btn btn-ghost mx-auto mt-6 flex border border-line">
            + {num(Math.min(PAGE, list.length - limit))}
          </button>
        )}
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: Opt[] }) {
  return (
    <label className="block text-xs font-medium text-ink-2">
      {label}
      <select className="field mt-1 !py-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
