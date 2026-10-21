import { lockupMarkScale, lockupViewBox, mark, wordmark } from "@/lib/brand";
import { site } from "@/lib/site";

// English on both language trees: the wordmark is the brand name, not translated copy.
export function Logo({ className = "h-9 w-auto sm:h-10" }: { className?: string }) {
  return (
    <svg viewBox={lockupViewBox} className={className} role="img" aria-label={site.nameEn}>
      <g transform={`scale(${lockupMarkScale})`}>
        <path d={mark.leaf} fill="var(--brand)" fillRule="evenodd" />
        <path d={mark.roots} fill="none" stroke="var(--brand-strong)" strokeWidth={mark.rootWidth} strokeLinecap="round" />
        <path d={mark.water} fill="none" stroke="var(--accent)" strokeWidth={mark.waterWidth} strokeLinecap="round" />
      </g>
      <path d={wordmark.top} fill="var(--ink)" />
      <path d={wordmark.khulna} fill="var(--brand)" />
    </svg>
  );
}
