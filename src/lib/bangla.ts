import nameTokens from "@/data/bn/name-tokens.json";
import terms from "@/data/bn/terms.json";
import diseases from "@/data/bn/diseases.json";

import { bnDigits } from "@/lib/digits";

export { bnDigits };

const tokens = nameTokens as Record<string, string>;

/** Transliterate a Doctor's name token by token: "Dr. Md. Zahidur Rahman" → "ডাঃ মোঃ জাহিদুর রহমান". */
export function bnName(name: string): string {
  return name
    .replace(/\(([^)]+)\)/g, (_, inner: string) => `(${bnName(inner)})`)
    .split(/([\s.\-]+)/)
    .map((part) => {
      if (/^[\s.\-]+$/.test(part)) return part.includes(" ") ? " " : part === "-" ? "-" : " ";
      return tokens[part] ?? tokens[part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()] ?? part;
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

const phrases = Object.entries((terms as { phrases: Record<string, string> }).phrases).sort((a, b) => b[0].length - a[0].length);
const words = (terms as { words: Record<string, string> }).words;

/** Translate a post, workplace or chamber string using phrase and word tables; unknown words stay as written. */
export function bnTerm(text: string) {
  let out = ` ${text} `;
  for (const [en, bn] of phrases) {
    const re = new RegExp(`(?<![A-Za-z])${en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![A-Za-z])`, "gi");
    out = out.replace(re, bn);
  }
  out = out.replace(/[A-Za-z]+/g, (w) => {
    const hit = words[w.toLowerCase()] ?? tokens[w];
    return hit ?? w;
  });
  return bnDigits(out.replace(/\s+,/g, ",").replace(/\s+/g, " ").trim().replace(/,$/, ""));
}

export function bnDisease(text: string) {
  return (diseases as Record<string, string>)[text] ?? text;
}
