// Original illustration: Khulna at sunrise — the river, a long bridge, a nouka, palms and a clinic on the bank.
// Colours lean on the national flag (green #006a4e, red #f42a41).
export function HeroArt({ className = "" }: { className?: string }) {
  const piers = Array.from({ length: 13 }, (_, i) => -10 + i * 52);
  return (
    <svg viewBox="0 0 600 500" className={className} role="img" aria-label="Illustration of a river at sunrise in Khulna with a bridge, a wooden boat, palm trees and a clinic">
      <defs>
        <linearGradient id="ha-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe9e2" />
          <stop offset="0.55" stopColor="#fff2dc" />
          <stop offset="1" stopColor="#ffd9b8" />
        </linearGradient>
        <linearGradient id="ha-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd3c9" />
          <stop offset="1" stopColor="#1f7f78" />
        </linearGradient>
        <linearGradient id="ha-bank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e9a6b" />
          <stop offset="1" stopColor="#006a4e" />
        </linearGradient>
        <radialGradient id="ha-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffb38a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffb38a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky and sun */}
      <rect width="600" height="500" fill="url(#ha-sky)" />
      <circle cx="390" cy="225" r="120" fill="url(#ha-glow)" />
      <circle cx="390" cy="230" r="62" fill="#f42a41" />

      {/* Birds */}
      <g fill="none" stroke="#24524d" strokeWidth="2.2" strokeLinecap="round" opacity="0.7">
        <path d="M120 92 q8 -8 16 0 q8 -8 16 0" />
        <path d="M170 70 q6 -6 12 0 q6 -6 12 0" />
        <path d="M480 110 q7 -7 14 0 q7 -7 14 0" />
      </g>

      {/* Far treeline of the delta */}
      <path d="M0 262 q20 -18 40 -6 q18 -22 44 -4 q22 -16 40 0 q26 -20 52 -2 q20 -14 40 2 q24 -18 48 0 q22 -12 44 2 q26 -20 52 -2 q22 -16 46 0 q24 -18 50 -2 q22 -14 44 2 q26 -16 50 0 L600 290 L0 290 Z" fill="#3f8f6b" opacity="0.55" />

      {/* River */}
      <rect y="284" width="600" height="216" fill="url(#ha-water)" />
      <g fill="#f42a41" opacity="0.35">
        <rect x="350" y="300" width="80" height="5" rx="2.5" />
        <rect x="362" y="316" width="56" height="4" rx="2" />
        <rect x="374" y="330" width="32" height="3" rx="1.5" />
      </g>
      <g stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.45">
        <path d="M60 330 h40" />
        <path d="M200 352 h60" />
        <path d="M470 362 h50" />
        <path d="M120 410 h70" />
        <path d="M430 440 h60" />
        <path d="M260 470 h50" />
      </g>

      {/* Bridge: deck, arches and piers */}
      <g fill="#4c6670">
        <rect x="-10" y="204" width="620" height="12" rx="2" />
        <rect x="-10" y="196" width="620" height="3" opacity="0.7" />
        {piers.map((x) => (
          <rect key={x} x={x + 21} y="216" width="10" height="84" />
        ))}
      </g>
      <g fill="none" stroke="#4c6670" strokeWidth="3" opacity="0.8">
        {piers.slice(0, -1).map((x) => (
          <path key={x} d={`M${x + 31} 216 q21 22 42 0`} />
        ))}
      </g>

      {/* Nouka (country boat) with boatman */}
      <g transform="translate(415 352) scale(0.7)">
        <path d="M-120 0 q120 46 240 0 q-14 26 -120 30 q-106 -4 -120 -30 Z" fill="#7a4524" />
        <path d="M-112 2 q112 38 224 0" fill="none" stroke="#a8683c" strokeWidth="3" />
        <path d="M-50 4 q50 -60 100 0 Z" fill="#d79a52" />
        <path d="M-50 4 q50 -60 100 0" fill="none" stroke="#9c6531" strokeWidth="3" />
        <g stroke="#2a2f33" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M82 2 l-6 -46" />
          <path d="M76 -30 l26 -10" />
        </g>
        <circle cx="74" cy="-56" r="8" fill="#2a2f33" />
        <path d="M102 -40 L140 40" stroke="#5c3a20" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M-130 12 q130 40 260 0" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
      </g>

      {/* Near bank */}
      <path d="M0 330 q70 -14 140 6 q60 16 110 50 q34 26 44 114 L0 500 Z" fill="url(#ha-bank)" />

      {/* Clinic on the bank */}
      <g transform="translate(150 318)">
        <rect x="0" y="0" width="92" height="58" rx="4" fill="#ffffff" />
        <path d="M-6 2 L46 -22 L98 2 Z" fill="#0d9488" />
        <g fill="#bfe3dd">
          <rect x="10" y="14" width="14" height="12" rx="2" />
          <rect x="68" y="14" width="14" height="12" rx="2" />
          <rect x="10" y="34" width="14" height="12" rx="2" />
          <rect x="68" y="34" width="14" height="12" rx="2" />
        </g>
        <rect x="36" y="30" width="20" height="28" rx="2" fill="#0d9488" />
        <rect x="40" y="6" width="12" height="16" rx="1.5" fill="#f42a41" />
        <rect x="35" y="11" width="22" height="6" rx="1.5" fill="#f42a41" />
      </g>

      {/* Rickshaw */}
      <g transform="translate(40 392)">
        <path d="M18 -34 q22 -22 44 0 v20 h-44 Z" fill="#f4b400" />
        <path d="M18 -34 q22 -22 44 0" fill="none" stroke="#e05a2a" strokeWidth="4" />
        <rect x="14" y="-14" width="52" height="8" rx="3" fill="#e05a2a" />
        <path d="M66 -10 L104 -10" stroke="#2a2f33" strokeWidth="4" strokeLinecap="round" />
        <path d="M100 -10 l6 -18 h10" stroke="#2a2f33" strokeWidth="4" strokeLinecap="round" fill="none" />
        <g fill="none" stroke="#2a2f33" strokeWidth="4">
          <circle cx="30" cy="8" r="12" />
          <circle cx="98" cy="8" r="12" />
        </g>
        <g fill="#2a2f33">
          <circle cx="30" cy="8" r="2.5" />
          <circle cx="98" cy="8" r="2.5" />
        </g>
      </g>

      {/* Coconut palms */}
      {[
        { x: 70, y: 340, h: 150, lean: 18, s: 1 },
        { x: 268, y: 430, h: 130, lean: 16, s: 0.8 },
      ].map((p) => (
        <g key={p.x} transform={`translate(${p.x} ${p.y})`}>
          <path d={`M0 0 q${p.lean / 2} ${-p.h / 2} ${p.lean} ${-p.h}`} fill="none" stroke="#7a4f2a" strokeWidth={9 * p.s} strokeLinecap="round" />
          <g transform={`translate(${p.lean} ${-p.h}) scale(${p.s})`} fill="#1f7a4d">
            <path d="M0 0 q-40 -30 -78 4 q40 -14 78 -4 Z" />
            <path d="M0 0 q40 -30 78 4 q-40 -14 -78 -4 Z" />
            <path d="M0 0 q-30 -44 -6 -66 q-10 30 6 66 Z" />
            <path d="M0 0 q30 -44 6 -66 q10 30 -6 66 Z" />
            <path d="M0 0 q-52 0 -66 38 q26 -30 66 -38 Z" />
            <path d="M0 0 q52 0 66 38 q-26 -30 -66 -38 Z" />
          </g>
          <g fill="#6b4423">
            <circle cx={p.lean - 4} cy={-p.h + 6} r={5 * p.s} />
            <circle cx={p.lean + 5} cy={-p.h + 8} r={5 * p.s} />
          </g>
        </g>
      ))}
    </svg>
  );
}
