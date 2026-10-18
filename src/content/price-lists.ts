// "X price in Khulna" Posts, one per LabTest in src/data/test-prices.ts that has confirmed prices.
import type { Post, PostCopy } from "@/content/blog";
import { labTests, type LabTest } from "@/data/test-prices";
import { bnDigits } from "@/lib/bangla";
import { money } from "@/lib/doctors";
import { site, type Lang } from "@/lib/site";

const YEAR = 2026;
export const priceSlug = (t: LabTest) => `${t.slug}-price-in-khulna`;
/** All price Posts share one cover. */
const COVER = "/blog/test-prices.svg";

function monthYear(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", { month: "long", year: "numeric", timeZone: "Asia/Dhaka" });
}

function copy(t: LabTest, lang: Lang): PostCopy {
  const sorted = [...t.prices].sort((a, b) => a.price - b.price);
  const lo = sorted[0];
  const hi = sorted.at(-1)!;
  const centre = (x: LabTest["prices"][number]) => (lang === "bn" ? x.centreBn : x.centre);
  const range = lo.price === hi.price ? money(lo.price, lang) : lang === "bn" ? `${money(lo.price, lang)} থেকে ${money(hi.price, lang)}` : `${money(lo.price, lang)} to ${money(hi.price, lang)}`;
  const phone = lang === "bn" ? bnDigits(site.phoneDisplay) : site.phoneDisplay;
  const when = monthYear(t.checked, lang);
  const table = { head: lang === "bn" ? ["ডায়াগনস্টিক সেন্টার", "খরচ"] : ["Diagnostic centre", "Price"], rows: sorted.map((x) => [centre(x), money(x.price, lang)]) };

  if (lang === "bn") {
    return {
      title: `খুলনায় ${t.bn}-এর খরচ কত? (${bnDigits(YEAR)})`,
      excerpt: `খুলনার ডায়াগনস্টিক সেন্টারগুলোতে ${t.bn}-এর খরচের তুলনা, ${when} পর্যন্ত যাচাই করা।`,
      answer: `খুলনায় ${t.bn}-এর খরচ ${range} (${when}-এ যাচাই করা)। সবচেয়ে কম খরচ ${centre(lo)}-এ। টপ ডক্টরস খুলনার মাধ্যমে বুক করলে ছাড় পাবেন — বুকিং লাইন ${phone}।`,
      cover: { src: COVER, alt: `খুলনায় ${t.bn}-এর খরচ — ডায়াগনস্টিক সেন্টারের তুলনা` },
      body: [
        { p: t.aboutBn },
        { h: `খুলনায় ${t.bn}-এর খরচ`, table },
        { h: "ছাড়ে টেস্ট করান", p: `প্রেসক্রিপশনের ছবি হোয়াটসঅ্যাপে পাঠান বা বুকিং লাইন ${phone} নম্বরে কল করুন — ছাড়ের পর মোট খরচ জানিয়ে সেন্টারে সিরিয়াল করে দেব।` },
        { h: "দাম সম্পর্কে", p: `দামগুলো ${when}-এ সেন্টারগুলো থেকে যাচাই করা। দাম বদলাতে পারে, তাই টেস্টের আগে নিশ্চিত করে নিন।` },
      ],
      faq: [
        { q: `খুলনায় ${t.bn} করতে কত টাকা লাগে?`, a: `${range}, সেন্টারভেদে (${when}-এ যাচাই করা)।` },
        { q: `খুলনায় সবচেয়ে কম খরচে ${t.bn} কোথায় হয়?`, a: `আমাদের যাচাই করা তালিকায় ${centre(lo)}-এ, ${money(lo.price, lang)}।` },
        { q: "ছাড় পাব কীভাবে?", a: `টপ ডক্টরস খুলনার বুকিং লাইন ${phone} নম্বরে কল বা হোয়াটসঅ্যাপ করে বুক করুন।` },
      ],
    };
  }
  return {
    title: `${t.en} Price in Khulna (${YEAR}): Cost at Diagnostic Centres`,
    excerpt: `What ${t.en} costs at diagnostic centres in Khulna, compared side by side and checked in ${when}.`,
    answer: `${t.en} costs ${range} in Khulna (checked ${when}). The lowest price is at ${centre(lo)}. Book through Top Doctors Khulna for a discount — Booking Line ${phone}.`,
    cover: { src: COVER, alt: `${t.en} price in Khulna — diagnostic centres compared` },
    body: [
      { p: t.aboutEn },
      { h: `${t.en} price in Khulna`, table },
      { h: "Get it at a discount", p: `Send a photo of your prescription on WhatsApp or call the Booking Line on ${phone}. We tell you the total after discount and book your slot at the centre.` },
      { h: "About these prices", p: `Prices were confirmed with each centre in ${when}. They can change, so please confirm before your test.` },
    ],
    faq: [
      { q: `How much does ${t.en} cost in Khulna?`, a: `${range}, depending on the centre (checked ${when}).` },
      { q: `Where is ${t.en} cheapest in Khulna?`, a: `In our checked list, at ${centre(lo)} for ${money(lo.price, lang)}.` },
      { q: "How do I get a discount?", a: `Book through the Top Doctors Khulna Booking Line on ${phone}, by call or WhatsApp.` },
    ],
  };
}

export const priceListPosts: Post[] = labTests
  .filter((t) => t.prices.length > 0)
  .map((t) => ({ slug: priceSlug(t), date: t.checked, updated: t.checked, icon: "test-tubes", tone: "amber", related: t.related, bn: copy(t, "bn"), en: copy(t, "en") }));
