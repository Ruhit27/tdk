// Doctor List Posts, generated from the directory so counts, fees and chambers never go stale:
// one per Specialty ("best X in Khulna"), one per Hospital ("doctor list & serial number"), and doctors open on Friday.
// Doctors are listed by seniority, never numbered: the order is not a quality rating.
import type { Post, PostCopy } from "@/content/blog";
import { specialties, type Specialty } from "@/data/specialties";
import { bySeniority, designations, doctorName, doctorsInSpecialty, money, placeName, specialtyOf, type Doctor } from "@/lib/doctors";
import { hospitals, sittingsAtHospital, sittingsOnDay, type Hospital } from "@/lib/doctor-groups";
import { bnDigits } from "@/lib/bangla";
import { site, type Lang } from "@/lib/site";

const PUBLISHED = "2026-10-18";
const YEAR = 2026;

const plural = (s: Specialty) => `${s.enPerson}s`;
export const doctorListSlug = (s: Specialty) => `best-${plural(s).toLowerCase().replace(/&/g, "").replace(/[^a-z]+/g, "-")}-in-khulna`;

const n = (x: number, lang: Lang) => (lang === "bn" ? bnDigits(x) : String(x));
const join = (items: string[], lang: Lang) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")}${lang === "bn" ? " ও " : " and "}${items.at(-1)}`;

function feeRange(list: Doctor[], lang: Lang) {
  const fees = list.map((d) => d.fees.new).filter((f): f is number => typeof f === "number" && f > 0);
  if (!fees.length) return null;
  const lo = Math.min(...fees);
  const hi = Math.max(...fees);
  return lo === hi ? money(lo, lang) : lang === "bn" ? `${money(lo, lang)} থেকে ${money(hi, lang)}` : `${money(lo, lang)} to ${money(hi, lang)}`;
}

/** "3 professors, 2 assistant professors and 4 consultants" */
function makeup(list: Doctor[], lang: Lang) {
  const parts = designations
    .map((d) => ({ d, count: list.filter((x) => x.designation === d.slug).length }))
    .filter((x) => x.count)
    .map(({ d, count }) => (lang === "bn" ? `${n(count, lang)} জন ${d.bn}` : `${count} ${d.en.toLowerCase()}${count > 1 ? "s" : ""}`));
  return join(parts, lang);
}

function topChambers(list: Doctor[], lang: Lang, max = 5) {
  const counts = new Map<string, number>();
  for (const d of list) for (const c of new Set(d.chambers.map((c) => c.name))) counts.set(c, (counts.get(c) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, max)
    .map(([name, count]) => (lang === "bn" ? `${placeName(name, lang)} — ${n(count, lang)} জন` : `${name} — ${count} doctor${count > 1 ? "s" : ""}`));
}

function copy(s: Specialty, list: Doctor[], lang: Lang): PostCopy {
  const count = list.length;
  const fees = feeRange(list, lang);
  const senior = list.slice(0, 3).map((d) => doctorName(d, lang));
  const slug = doctorListSlug(s);
  const phone = lang === "bn" ? bnDigits(site.phoneDisplay) : site.phoneDisplay;

  if (lang === "bn") {
    const p = s.bnPerson;
    return {
      title: `খুলনার সেরা ${n(count, lang)} জন ${p} (${bnDigits(YEAR)}): চেম্বার, ফি ও সময়সূচি`,
      excerpt: `খুলনার সব ${p} এক পেজে — পদবি, চেম্বার, বসার দিন ও ভিজিট ফি। সবচেয়ে অভিজ্ঞরা আগে।`,
      answer: `টপ ডক্টরস খুলনায় ${n(count, lang)} জন ${p} তালিকাভুক্ত আছেন — ${makeup(list, lang)}।${senior.length ? ` সবচেয়ে অভিজ্ঞদের মধ্যে আছেন ${join(senior, lang)}।` : ""}${fees ? ` নতুন রোগীর ভিজিট ফি ${fees}।` : ""} যেকোনো ডাক্তারের সিরিয়াল নিতে বুকিং লাইন ${phone} নম্বরে কল বা হোয়াটসঅ্যাপ করুন।`,
      cover: { src: `/blog/${slug}.svg`, alt: `খুলনার সেরা ${p}দের তালিকা — ${s.bn} বিভাগের ডাক্তার` },
      body: [
        { p: `খুলনায় ভালো ${p} খুঁজতে অনেককে কয়েকটি চেম্বারে ফোন করতে হয়। এই পেজে আমাদের ডিরেক্টরির সব ${n(count, lang)} জন ${p}কে এক জায়গায় দেওয়া হলো — চেম্বার, বসার দিন ও ফিসহ।` },
        { h: "তালিকাটি কীভাবে সাজানো", p: "ডাক্তারদের পদমর্যাদা অনুযায়ী সাজানো হয়েছে — প্রথমে অধ্যাপক, তারপর সহযোগী ও সহকারী অধ্যাপক, কনসালটেন্ট ও বিশেষজ্ঞ। এখন রোগী দেখছেন না এমন ডাক্তাররা শেষে আছেন। এই ক্রম মানের রেটিং নয় — তালিকার প্রত্যেকেই যোগ্য বিশেষজ্ঞ।" },
        { h: `খুলনার সব ${p}`, doctors: { specialty: s.slug } },
        { h: "তাঁরা কোথায় রোগী দেখেন", ul: topChambers(list, lang) },
        { h: "সিরিয়াল নিন", p: `পছন্দের ডাক্তারের কার্ডে চাপ দিয়ে পুরো সময়সূচি দেখুন, তারপর বুকিং লাইনে কল বা হোয়াটসঅ্যাপ করুন। সিরিয়াল নিতে কোনো বাড়তি খরচ নেই। সময়সূচি বদলাতে পারে, তাই যাওয়ার আগে নিশ্চিত করে নিন।` },
      ],
      faq: [
        { q: `খুলনায় কতজন ${p} আছেন?`, a: `টপ ডক্টরস খুলনায় বর্তমানে ${n(count, lang)} জন ${p} তালিকাভুক্ত: ${makeup(list, lang)}।` },
        { q: `খুলনায় ${p}ের ভিজিট ফি কত?`, a: fees ? `আমাদের তালিকায় নতুন রোগীর ফি ${fees}। পুরাতন রোগীর ফি সাধারণত কম, আর অনেকে নির্দিষ্ট সময়ের মধ্যে রিপোর্ট ফ্রি দেখেন। প্রত্যেক ডাক্তারের পেজে বিস্তারিত ফি আছে।` : "ফি জানতে বুকিং লাইনে কল করুন।" },
        { q: `খুলনার সবচেয়ে অভিজ্ঞ ${p} কারা?`, a: senior.length ? `পদমর্যাদা অনুযায়ী তালিকার শুরুতে আছেন ${join(senior, lang)}। তবে সঠিক ডাক্তার নির্ভর করে আপনার সমস্যা ও সুবিধাজনক সময়ের ওপর।` : "তালিকাটি পদমর্যাদা অনুযায়ী সাজানো।" },
        { q: `${p}ের সিরিয়াল কীভাবে নেব?`, a: `বুকিং লাইন ${phone} নম্বরে কল বা হোয়াটসঅ্যাপ করে ডাক্তারের নাম ও পছন্দের দিন জানান। আমরা সিরিয়াল নিয়ে নিশ্চিত সময় জানিয়ে দেব।` },
      ],
    };
  }

  const P = plural(s);
  const p = P.toLowerCase().replace(/^ent /, "ENT ");
  return {
    title: `${count} Best ${P} in Khulna (${YEAR}): Chambers, Fees & Schedule`,
    excerpt: `Every ${s.enPerson.toLowerCase().replace(/^ent /, "ENT ")} in Khulna on one page — designation, chamber, visiting days and fee, with the most senior listed first.`,
    answer: `Top Doctors Khulna lists ${count} ${p} in Khulna: ${makeup(list, lang)}.${senior.length ? ` The most senior include ${join(senior, lang)}.` : ""}${fees ? ` New-patient fees range from ${fees}.` : ""} Call or WhatsApp the Booking Line on ${phone} to book a serial with any of them.`,
    cover: { src: `/blog/${slug}.svg`, alt: `List of the best ${p} in Khulna — ${s.en} doctors` },
    body: [
      { p: `Finding a good ${s.enPerson.toLowerCase().replace(/^ent /, "ENT ")} in Khulna often means calling several chambers. This page brings all ${count} ${p} in our directory together, with their chambers, visiting days and fees.` },
      { h: "How this list is ordered", p: "Doctors are listed by seniority — professors first, then associate and assistant professors, consultants and specialists. Doctors not currently taking patients appear last. The order is not a rating of quality: every doctor here is a qualified specialist." },
      { h: `All ${p} in Khulna`, doctors: { specialty: s.slug } },
      { h: "Where they see patients", ul: topChambers(list, lang) },
      { h: "Book a serial", p: "Tap a doctor's card for their full schedule, then call or WhatsApp the Booking Line. Booking costs nothing extra. Schedules change, so please confirm before you visit." },
    ],
    faq: [
      { q: `How many ${p} are there in Khulna?`, a: `Top Doctors Khulna currently lists ${count} ${p}: ${makeup(list, lang)}.` },
      { q: `What is the fee of a ${s.enPerson.toLowerCase().replace(/^ent /, "ENT ")} in Khulna?`, a: fees ? `New-patient fees in our list range from ${fees}. Returning-patient fees are usually lower, and many doctors see reports free within a set period. Each doctor's page shows the exact fees.` : "Call the Booking Line to ask about fees." },
      { q: `Who are the most senior ${p} in Khulna?`, a: senior.length ? `By designation, the list starts with ${join(senior, lang)}. The right doctor still depends on your problem and which days suit you.` : "The list is ordered by seniority." },
      { q: `How do I book a serial with a ${s.enPerson.toLowerCase().replace(/^ent /, "ENT ")}?`, a: `Call or WhatsApp the Booking Line on ${phone} with the doctor's name and the day you want. We book the serial and confirm the time.` },
    ],
  };
}

export const doctorListPosts: Post[] = specialties.map((s) => {
  const list = bySeniority(doctorsInSpecialty(s.slug));
  return {
    slug: doctorListSlug(s),
    date: PUBLISHED,
    icon: s.icon,
    tone: s.tone,
    related: [s.slug],
    bn: copy(s, list, "bn"),
    en: copy(s, list, "en"),
  };
});

// ---------- By Hospital ----------

/** "Cardiologist — 3" for the specialties present in a group of Doctors, most common first. */
function specialtyMix(list: Doctor[], lang: Lang, max = 8) {
  const counts = new Map<string, number>();
  for (const d of list) counts.set(d.specialty, (counts.get(d.specialty) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([slug, c]) => {
      const sp = specialtyOf(list.find((d) => d.specialty === slug)!);
      return { slug, label: lang === "bn" ? sp.bnPerson : sp.enPerson, count: c };
    });
}

export const hospitalListSlug = (h: Hospital) => `${h.slug}-doctor-list`;

function hospitalCopy(h: Hospital, list: Doctor[], lang: Lang): PostCopy {
  const count = list.length;
  const fees = feeRange(list, lang);
  const mix = specialtyMix(list, lang);
  const phone = lang === "bn" ? bnDigits(site.phoneDisplay) : site.phoneDisplay;
  const f = h.facility;
  const own = f ? f.phones.map((x) => (lang === "bn" ? bnDigits(x) : x)) : [];
  const slug = hospitalListSlug(h);
  const mixText = (lang: Lang) => join(mix.slice(0, 4).map((m) => m.label), lang);

  if (lang === "bn") {
    return {
      title: `${h.bn} ডাক্তার তালিকা ও সিরিয়াল নম্বর (${bnDigits(YEAR)})`,
      excerpt: `${h.bn}-এ যে ${n(count, lang)} জন বিশেষজ্ঞ রোগী দেখেন — বিভাগ, বসার দিন, সময় ও ফি, আর সিরিয়াল নেওয়ার নিয়ম।`,
      answer: `আমাদের ডিরেক্টরির ${n(count, lang)} জন ডাক্তার ${h.bn}-এ রোগী দেখেন, যাঁদের মধ্যে আছেন ${mixText(lang)}।${f ? ` ঠিকানা: ${f.addressBn}। হাসপাতালের নিজস্ব ফোন: ${own.join(", ")}।` : ""} এই ডাক্তারদের যেকোনো একজনের সিরিয়াল নিতে টপ ডক্টরস খুলনার বুকিং লাইন ${phone} নম্বরে কল বা হোয়াটসঅ্যাপ করুন।`,
      cover: { src: `/blog/${slug}.svg`, alt: `${h.bn} — ডাক্তার তালিকা ও সিরিয়াল` },
      body: [
        { p: `${h.bn}-এ কোন ডাক্তার কবে বসেন, তা জানতে অনেককে বারবার ফোন করতে হয়। নিচে আমাদের ডিরেক্টরির যে ডাক্তাররা এখানে রোগী দেখেন, তাঁদের এই হাসপাতালের বসার দিন, সময় ও ফি দেওয়া হলো।` },
        ...(f ? [{ h: "ঠিকানা ও ফোন নম্বর", ul: [`ঠিকানা: ${f.addressBn}`, `হাসপাতালের ফোন: ${own.join(", ")}`, `সিরিয়ালের জন্য টপ ডক্টরস খুলনা বুকিং লাইন: ${phone}`] }] : []),
        { h: "যে বিভাগের ডাক্তার পাবেন", ul: mix.map((m) => `${m.label} — ${n(m.count, lang)} জন`) },
        { h: `${h.bn}-এর ডাক্তাররা`, doctors: { hospital: h.slug } },
        { h: "সিরিয়াল নেওয়ার নিয়ম", ul: ["তালিকা থেকে ডাক্তার ও তিনি কোন দিন বসেন দেখে নিন", `বুকিং লাইন ${phone} নম্বরে কল বা হোয়াটসঅ্যাপ করে ডাক্তারের নাম ও দিন জানান${f ? ", অথবা হাসপাতালের রিসেপশনে কল করুন" : ""}`, "আমরা সিরিয়াল নিয়ে নিশ্চিত সময় জানিয়ে দেব", "আগের প্রেসক্রিপশন ও রিপোর্ট নিয়ে একটু আগে পৌঁছান"] },
        { h: "তালিকাটি কীভাবে সাজানো", p: "ডাক্তারদের পদমর্যাদা অনুযায়ী সাজানো হয়েছে; এটি মানের রেটিং নয়। কার্ডে দেখানো দিন ও সময় এই হাসপাতালের — সময়সূচি বদলাতে পারে, তাই যাওয়ার আগে নিশ্চিত করে নিন।" },
      ],
      faq: [
        { q: `${h.bn}-এ কতজন ডাক্তার বসেন?`, a: `আমাদের ডিরেক্টরির ${n(count, lang)} জন বিশেষজ্ঞ এখানে রোগী দেখেন। হাসপাতালে আরও ডাক্তার থাকতে পারেন যাঁরা আমাদের তালিকায় নেই।` },
        { q: `${h.bn}-এর সিরিয়াল নম্বর কী?`, a: `${f ? `হাসপাতালের নিজস্ব নম্বর ${own.join(", ")}। ` : ""}এই তালিকার ডাক্তারদের সিরিয়াল টপ ডক্টরস খুলনার বুকিং লাইন ${phone} থেকেও নিতে পারেন — এটি আমাদের নম্বর, হাসপাতালের নয়।` },
        { q: `${h.bn}-এ কোন কোন বিশেষজ্ঞ আছেন?`, a: `${join(mix.map((m) => m.label), lang)}।` },
        { q: `${h.bn}-এ ডাক্তারের ভিজিট ফি কত?`, a: fees ? `এই তালিকায় নতুন রোগীর ফি ${fees}। প্রত্যেক ডাক্তারের কার্ডে তাঁর ফি দেওয়া আছে।` : "ফি জানতে বুকিং লাইনে কল করুন।" },
      ],
    };
  }

  return {
    title: `${h.en} Doctor List & Serial Number (${YEAR})`,
    excerpt: `The ${count} specialists who see patients at ${h.en} — specialty, visiting days, hours and fee, plus how to book a serial.`,
    answer: `${count} doctors from our directory see patients at ${h.en}, including ${join(mix.slice(0, 4).map((m) => `${m.label}s`), lang)}.${f ? ` The hospital is at ${f.addressEn}; its own phone numbers are ${own.join(", ")}.` : ""} To book a serial with any of these doctors, call or WhatsApp the Top Doctors Khulna Booking Line on ${phone}.`,
    cover: { src: `/blog/${slug}.svg`, alt: `${h.en} — doctor list and serial number` },
    body: [
      { p: `Finding out which doctor sits at ${h.en} on which day usually takes several phone calls. Below are the doctors from our directory who see patients here, with their days, hours and fees at this hospital.` },
      ...(f ? [{ h: "Address and phone numbers", ul: [`Address: ${f.addressEn}`, `Hospital phone: ${own.join(", ")}`, `Serial via the Top Doctors Khulna Booking Line: ${phone}`] }] : []),
      { h: "Specialties available", ul: mix.map((m) => `${m.label} — ${m.count}`) },
      { h: `Doctors at ${h.en}`, doctors: { hospital: h.slug } },
      { h: "How to take a serial", ul: ["Pick a doctor and check which days they sit here", `Call or WhatsApp the Booking Line on ${phone} with the doctor's name and day${f ? ", or call the hospital reception" : ""}`, "We book the serial and confirm the time", "Arrive a little early with your previous prescriptions and reports"] },
      { h: "How this list is ordered", p: "Doctors are listed by seniority; this is not a rating of quality. The days and hours on each card are for this hospital — schedules change, so please confirm before you visit." },
    ],
    faq: [
      { q: `How many doctors see patients at ${h.en}?`, a: `${count} specialists from our directory see patients here. The hospital may have other doctors who are not in our directory.` },
      { q: `What is the serial number of ${h.en}?`, a: `${f ? `The hospital's own numbers are ${own.join(", ")}. ` : ""}You can also book a serial with any doctor on this list through the Top Doctors Khulna Booking Line on ${phone} — that is our number, not the hospital's.` },
      { q: `Which specialists are available at ${h.en}?`, a: `${join(mix.map((m) => `${m.label}s`), lang)}.` },
      { q: `What is the doctor's fee at ${h.en}?`, a: fees ? `New-patient fees on this list range from ${fees}. Each doctor's card shows their fee.` : "Call the Booking Line to ask about fees." },
    ],
  };
}

export const hospitalListPosts: Post[] = hospitals.map((h) => {
  const list = sittingsAtHospital(h).map((x) => x.doctor);
  const mix = specialtyMix(list, "en", 3);
  return { slug: hospitalListSlug(h), date: PUBLISHED, icon: "hospital", tone: "teal", related: mix.map((m) => m.slug), bn: hospitalCopy(h, list, "bn"), en: hospitalCopy(h, list, "en") };
});

// ---------- Open on Friday ----------

export const FRIDAY_SLUG = "doctors-open-on-friday-khulna";

function fridayCopy(list: Doctor[], lang: Lang): PostCopy {
  const count = list.length;
  const mix = specialtyMix(list, lang);
  const phone = lang === "bn" ? bnDigits(site.phoneDisplay) : site.phoneDisplay;
  const cover = { src: `/blog/${FRIDAY_SLUG}.svg` };
  if (lang === "bn") {
    return {
      title: `শুক্রবার খোলা খুলনার ডাক্তার (${bnDigits(YEAR)}): ${n(count, lang)} জন বিশেষজ্ঞ যাঁরা শুক্রবার বসেন`,
      excerpt: "খুলনার বেশিরভাগ চেম্বার শুক্রবার বন্ধ থাকে। যে বিশেষজ্ঞরা শুক্রবার রোগী দেখেন, তাঁদের চেম্বার ও সময়।",
      answer: `খুলনার বেশিরভাগ চেম্বার শুক্রবার বন্ধ থাকে, তবে আমাদের ডিরেক্টরির ${n(count, lang)} জন বিশেষজ্ঞ শুক্রবার রোগী দেখেন — ${join(mix.map((m) => m.label), lang)}। নিচে তাঁদের শুক্রবারের চেম্বার ও সময় দেওয়া হলো। শুক্রবারের সিরিয়াল দ্রুত শেষ হয়, তাই আগেভাগে বুকিং লাইন ${phone} নম্বরে কল করুন।`,
      cover: { ...cover, alt: "ক্যালেন্ডারে শুক্রবার চিহ্নিত — খুলনায় শুক্রবার খোলা ডাক্তার" },
      body: [
        { p: "শুক্রবার ছুটির দিনে অনেকেই ডাক্তার দেখাতে চান, কিন্তু বেশিরভাগ চেম্বার বন্ধ থাকে। নিচের ডাক্তাররা শুক্রবার বসেন — কার্ডে শুক্রবারের চেম্বার ও সময় দেওয়া আছে।" },
        { h: "শুক্রবার যাঁরা রোগী দেখেন", doctors: { day: "fri" } },
        { h: "শুক্রবার জরুরি প্রয়োজনে", p: "হঠাৎ অসুস্থতা বা জরুরি অবস্থায় চেম্বারের অপেক্ষা না করে খুলনা মেডিকেল কলেজ হাসপাতাল বা অন্য হাসপাতালের ২৪ ঘণ্টা জরুরি বিভাগে যান। জরুরি নম্বরগুলো প্রতিটি পেজের নিচে আছে, আর অ্যাম্বুলেন্সের জন্য বুকিং লাইনে যেকোনো সময় কল করুন।" },
        { h: "তালিকাটি কীভাবে সাজানো", p: "ডাক্তারদের পদমর্যাদা অনুযায়ী সাজানো হয়েছে; এটি মানের রেটিং নয়। সময়সূচি বদলাতে পারে, তাই যাওয়ার আগে নিশ্চিত করে নিন।" },
      ],
      faq: [
        { q: "শুক্রবার খুলনায় কোন ডাক্তার বসেন?", a: `আমাদের ডিরেক্টরির ${n(count, lang)} জন বিশেষজ্ঞ শুক্রবার রোগী দেখেন: ${join(mix.map((m) => m.label), lang)}। এই পেজে তাঁদের চেম্বার ও সময় দেওয়া আছে।` },
        { q: "শুক্রবারের সিরিয়াল কি আগে থেকে নেওয়া যায়?", a: `হ্যাঁ। বুকিং লাইন ${phone} নম্বরে আগের দিন বা সপ্তাহের মধ্যেই কল করে শুক্রবারের সিরিয়াল নিন।` },
        { q: "শুক্রবার আমার প্রয়োজনীয় বিশেষজ্ঞ না পেলে কী করব?", a: "জরুরি না হলে পরের দিনের সিরিয়াল নিন। জরুরি হলে হাসপাতালের ২৪ ঘণ্টা জরুরি বিভাগে যান।" },
      ],
    };
  }
  return {
    title: `Doctors Open on Friday in Khulna (${YEAR}): ${count} Specialists Who Sit on Friday`,
    excerpt: "Most chambers in Khulna close on Friday. These specialists see patients on Friday — with their chambers and hours.",
    answer: `Most chambers in Khulna close on Friday, but ${count} specialists in our directory see patients on Friday: ${join(mix.map((m) => `${m.label}s`), lang)}. Their Friday chambers and hours are below. Friday serials fill quickly, so call the Booking Line on ${phone} early.`,
    cover: { ...cover, alt: "A calendar with Friday highlighted — doctors open on Friday in Khulna" },
    body: [
      { p: "Friday is the day many people are free to see a doctor, but most chambers are closed. The doctors below sit on Friday; each card shows their Friday chamber and hours." },
      { h: "Doctors who see patients on Friday", doctors: { day: "fri" } },
      { h: "In an emergency on Friday", p: "For a sudden illness or emergency, don't wait for a chamber — go to the 24-hour emergency department at Khulna Medical College Hospital or another hospital. Emergency numbers are at the bottom of every page, and you can call the Booking Line for an ambulance any time." },
      { h: "How this list is ordered", p: "Doctors are listed by seniority; this is not a rating of quality. Schedules change, so please confirm before you visit." },
    ],
    faq: [
      { q: "Which doctors sit on Friday in Khulna?", a: `${count} specialists from our directory see patients on Friday: ${join(mix.map((m) => `${m.label}s`), lang)}. This page lists their chambers and hours.` },
      { q: "Can I book a Friday serial in advance?", a: `Yes. Call the Booking Line on ${phone} the day before or earlier in the week to book a Friday serial.` },
      { q: "What if the specialist I need doesn't sit on Friday?", a: "If it isn't urgent, book the next available day. If it is urgent, go to a hospital's 24-hour emergency department." },
    ],
  };
}

const fridayList = sittingsOnDay("fri").map((x) => x.doctor);
export const dayListPosts: Post[] = [
  { slug: FRIDAY_SLUG, date: PUBLISHED, icon: "clipboard", tone: "green", related: specialtyMix(fridayList, "en", 3).map((m) => m.slug), bn: fridayCopy(fridayList, "bn"), en: fridayCopy(fridayList, "en") },
];
