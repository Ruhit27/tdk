// One factory per route; `app/(en)` and `app/(bn)/bn` re-export them with a fixed language,
// so both language trees stay identical and fully static.
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { specialties, specialtyBySlug } from "@/data/specialties";
import { postBySlug, posts, shareImage } from "@/content/blog";
import { aboutPage, contactPage, servicePages } from "@/content/pages";
import { dictionaries, fill } from "@/lib/dictionary";
import { cityName, designations, doctorBySlug, doctorCity, doctorName, doctors, doctorsInSpecialty, money, shortChamber, specialtyOf, type Designation } from "@/lib/doctors";
import { bnDigits } from "@/lib/bangla";
import type { Lang } from "@/lib/site";
import { pageMeta } from "@/lib/meta";
import type { FacilityKind } from "@/data/facilities";
import { HomeView } from "@/views/HomeView";
import { DoctorsView } from "@/views/DoctorsView";
import { DoctorView } from "@/views/DoctorView";
import { DesignationView, SpecialtiesView, SpecialtyView } from "@/views/ListingViews";
import { FacilityView } from "@/views/FacilityView";
import { AboutView, BlogIndexView, BlogPostView, ContactView, NotFoundView, ServiceView } from "@/views/ContentViews";

type SlugProps = { params: Promise<{ slug: string }> };

// Reading `params` must sit under <Suspense> so the page frame renders instantly on client navigation.
async function AwaitSlug({ params, children }: SlugProps & { children: (slug: string) => React.ReactNode }) {
  return children((await params).slug);
}
const withSlug = (render: (slug: string) => React.ReactNode) =>
  function Page({ params }: SlugProps) {
    return (
      <Suspense fallback={<div className="min-h-dvh" />}>
        <AwaitSlug params={params}>{render}</AwaitSlug>
      </Suspense>
    );
  };
const num = (n: number, lang: Lang) => (lang === "bn" ? bnDigits(n) : String(n));

export const home = (lang: Lang) => ({
  Page: () => <HomeView lang={lang} />,
  metadata: pageMeta(lang, "/", null, fill(dictionaries[lang].hero.body, { count: num(doctors.length, lang), specialties: num(specialties.length, lang) })),
});

export const doctorsIndex = (lang: Lang) => ({
  Page: () => <DoctorsView lang={lang} />,
  metadata: pageMeta(
    lang,
    "/doctors",
    dictionaries[lang].allDoctors,
    lang === "bn"
      ? `খুলনার ${num(doctors.length, lang)} জন ডাক্তারকে নাম, বিভাগ, রোগ, চেম্বার বা দিন দিয়ে খুঁজুন। ফি ও সময়সূচি দেখে এক কলে সিরিয়াল নিন।`
      : `Search all ${doctors.length} doctors in Khulna by name, specialty, disease, chamber or day. See fees and visiting hours, then book a serial in one call.`,
  ),
});

export const doctorPage = (lang: Lang) => ({
  generateStaticParams: () => doctors.map((d) => ({ slug: d.slug })),
  generateMetadata: async ({ params }: SlugProps) => {
    const d = doctorBySlug.get((await params).slug);
    if (!d) return {};
    const sp = specialtyOf(d);
    const name = doctorName(d, lang);
    const spName = lang === "bn" ? sp.bnPerson : sp.enPerson;
    const chamber = d.chambers[0]?.name ? shortChamber(d.chambers[0].name, lang) : "";
    const city = cityName(doctorCity(d), lang);
    // Booking facts first: the description is clipped at ~158 characters.
    const desc =
      lang === "bn"
        ? `${name}, ${spName} — ${city} (${d.degrees})। চেম্বার: ${chamber}। ফি ${money(d.fees.new, lang)}। কল করে সিরিয়াল নিন।`
        : `${name}, ${spName} in ${city} (${d.degrees}). Chamber: ${chamber}. Fee ${money(d.fees.new, lang)}. Call to book a serial.`;
    return pageMeta(lang, `/doctors/${d.slug}`, `${name} — ${spName}`, desc, null, { ownCard: true });
  },
  Page: withSlug((slug) => {
    const d = doctorBySlug.get(slug);
    if (!d) notFound();
    return <DoctorView doctor={d} lang={lang} />;
  }),
});

export const specialtiesIndex = (lang: Lang) => ({
  Page: () => <SpecialtiesView lang={lang} />,
  metadata: pageMeta(
    lang,
    "/specialties",
    dictionaries[lang].nav.specialties,
    lang === "bn"
      ? `খুলনার ${num(specialties.length, lang)}টি বিভাগের বিশেষজ্ঞ ডাক্তার — হৃদরোগ, শিশু, গাইনি, চর্ম, নাক-কান-গলা ও আরও। বিভাগ বেছে চেম্বার, সময়সূচি ও ফি দেখুন।`
      : `Specialist doctors in Khulna across ${specialties.length} specialties — cardiology, child health, gynecology, skin, ENT and more. Pick one to see chambers, hours and fees.`,
  ),
});

export const specialtyPage = (lang: Lang) => ({
  generateStaticParams: () => specialties.map((s) => ({ slug: s.slug })),
  generateMetadata: async ({ params }: SlugProps) => {
    const s = specialtyBySlug.get((await params).slug);
    if (!s) return {};
    const n = num(doctorsInSpecialty(s.slug).length, lang);
    return lang === "bn"
      ? pageMeta(lang, `/specialties/${s.slug}`, `খুলনার ${s.bnPerson}: চেম্বার, সময়সূচি ও সিরিয়াল`, `খুলনার ${n} জন ${s.bnPerson}ের চেম্বার, বসার দিন ও ভিজিট ফি। পছন্দের ডাক্তার বেছে বুকিং লাইনে কল বা হোয়াটসঅ্যাপ করে সিরিয়াল নিন।`, null, { ownCard: true })
      : pageMeta(lang, `/specialties/${s.slug}`, `${s.enPerson} in Khulna: Chamber List, Schedule & Serial`, `All ${n} ${s.enPerson.toLowerCase()}s in Khulna with chamber, visiting days and fee. Pick one and call or WhatsApp the Booking Line to get a serial.`, null, { ownCard: true });
  },
  Page: withSlug((slug) => {
    const s = specialtyBySlug.get(slug);
    if (!s) notFound();
    return <SpecialtyView specialty={s} lang={lang} />;
  }),
});

export const designationPage = (lang: Lang) => ({
  generateStaticParams: () => designations.map((d) => ({ slug: d.slug })),
  generateMetadata: async ({ params }: SlugProps) => {
    const { slug } = await params;
    const d = designations.find((x) => x.slug === slug);
    if (!d) return {};
    const list = doctors.filter((x) => x.designation === d.slug);
    const k = num(new Set(list.map((x) => x.specialty)).size, lang);
    return pageMeta(
      lang,
      `/designations/${d.slug}`,
      lang === "bn" ? `খুলনার ${d.bn} পদমর্যাদার ডাক্তার` : `${d.en}s in Khulna: Doctor List`,
      lang === "bn"
        ? `খুলনার ${num(list.length, lang)} জন ${d.bn}, ${k}টি বিভাগে — প্রত্যেকের চেম্বার, সময়সূচি ও ফি দেখুন, তারপর কল করে সিরিয়াল নিন।`
        : `${list.length} ${d.en.toLowerCase()}s practising in Khulna across ${k} specialties — see each doctor's chamber, visiting hours and fee, then call to book a serial.`,
    );
  },
  Page: withSlug((slug) => {
    if (!designations.some((x) => x.slug === slug)) notFound();
    return <DesignationView slug={slug as Designation} lang={lang} />;
  }),
});

export const facilityPage = (lang: Lang, kind: FacilityKind, path: string) => {
  const f = dictionaries[lang].facilities;
  const copy = { hospital: [f.hospitalsTitle, f.hospitalsBody], diagnostic: [f.diagnosticsTitle, f.diagnosticsBody], "blood-bank": [f.bloodTitle, f.bloodBody], pharmacy: [f.pharmacyTitle, f.pharmacyBody] }[kind];
  // The on-page lead is short; the description adds the booking line so it reads as a full snippet.
  const more = lang === "bn" ? " খুলনায় ঠিকানা ও ফোন নম্বর দেখুন, অথবা বুকিং লাইনে কল বা হোয়াটসঅ্যাপ করুন — আমরা সাহায্য করব।" : " See addresses and phone numbers in Khulna, or call or WhatsApp our Booking Line and we'll help.";
  return { Page: () => <FacilityView kind={kind} lang={lang} />, metadata: pageMeta(lang, path, copy[0], copy[1] + more) };
};

export const servicePage = (lang: Lang, page: keyof typeof servicePages) => ({
  Page: () => <ServiceView page={page} lang={lang} />,
  metadata: pageMeta(lang, `/${page}`, servicePages[page][lang].title, servicePages[page][lang].lead),
});

export const aboutRoute = (lang: Lang) => ({
  Page: () => <AboutView lang={lang} />,
  metadata: pageMeta(lang, "/about", aboutPage[lang].title, aboutPage[lang].body[0]),
});

export const contactRoute = (lang: Lang) => ({
  Page: () => <ContactView lang={lang} />,
  metadata: pageMeta(lang, "/contact", contactPage[lang].title, contactPage[lang].body),
});

export const blogIndex = (lang: Lang) => ({
  Page: () => <BlogIndexView lang={lang} />,
  metadata: pageMeta(
    lang,
    "/blog",
    dictionaries[lang].blog.title,
    lang === "bn"
      ? `${dictionaries[lang].blog.body} কোন ডাক্তার দেখাবেন, খুলনার সেরা বিশেষজ্ঞদের তালিকা, হাসপাতালের ডাক্তার তালিকা ও টেস্টের দাম।`
      : `${dictionaries[lang].blog.body} Which doctor to see, the best specialists in Khulna, hospital doctor lists and test prices.`,
  ),
});

export const blogPost = (lang: Lang) => ({
  generateStaticParams: () => posts.map((p) => ({ slug: p.slug })),
  generateMetadata: async ({ params }: SlugProps) => {
    const p = postBySlug.get((await params).slug);
    if (!p) return {};
    const c = p[lang];
    return pageMeta(lang, `/blog/${p.slug}`, c.title, c.excerpt, shareImage(p), { article: { published: p.date, modified: p.updated ?? p.date } });
  },
  Page: withSlug((slug) => {
    const p = postBySlug.get(slug);
    if (!p) notFound();
    return <BlogPostView post={p} lang={lang} />;
  }),
});

export const notFoundRoute = (lang: Lang) =>
  function NotFound() {
    return <NotFoundView lang={lang} />;
  };
