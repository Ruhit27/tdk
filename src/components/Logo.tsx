import { lockupMarkScale, lockupViewBox, mark, wordmark } from "@/lib/brand";
import { site } from "@/lib/site";

// English on both language trees: the wordmark is the brand name, not translated copy.
export function Logo({ className = "h-9 w-auto sm:h-10" }: { className?: string }) {
  return (
    <svg viewBox={lockupViewBox} className={className} role="img" aria-label={site.nameEn}>
      <g transform={`scale(${lockupMarkScale})`}>
        <circle {...mark.disc} fill="var(--brand-soft)" />
        <path d={mark.ripple} fill="none" stroke="var(--accent)" strokeWidth={mark.rippleWidth} strokeLinecap="round" opacity={mark.rippleOpacity} />
        <path d={mark.pulse} fill="none" stroke="var(--brand)" strokeWidth={mark.lineWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d={mark.river} fill="none" stroke="var(--accent)" strokeWidth={mark.lineWidth} strokeLinecap="round" />
      </g>
      <path d={wordmark.top} fill="var(--ink)" />
      <path d={wordmark.khulna} fill="var(--accent)" />
    </svg>
  );
}
