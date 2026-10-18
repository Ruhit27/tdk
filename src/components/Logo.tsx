import type { Lang } from "@/lib/site";

export function Logo({ lang }: { lang: Lang }) {
  return (
    <span className="flex items-center gap-2">
      <span className="grid size-9 place-items-center rounded-xl bg-brand text-brand-ink shadow-sm">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-bold tracking-tight">{lang === "bn" ? "টপ ডক্টরস" : "Top Doctors"}</span>
        <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-brand-strong">{lang === "bn" ? "খুলনা" : "Khulna"}</span>
      </span>
    </span>
  );
}
