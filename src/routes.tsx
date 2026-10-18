// One factory per route; `app/(en)` and `app/(bn)/bn` re-export them with a fixed language,
// so both language trees stay identical and fully static.
import { notFound } from "next/navigation";
import { specialties, specialtyBySlug } from "@/data/specialties";
import { postBySlug, posts, shareImage } from "@/content/blog";
import { aboutPage, contactPage, servicePages } from "@/content/pages";
import { dictionaries, fill } from "@/lib/dictionary";
import { designations, diseaseName, doctorBySlug, doctorName, doctors, doctorsInSpecialty, money, placeName, specialtyOf, type Designation } from "@/lib/doctors";
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
const num = (n: number, lang: Lang) => (lang === "bn" ? bnDigits(n) : String(n));

export const home = (lang: Lang) => ({
  Page: () => <HomeView lang={lang} />,
  metadata: pageMeta(lang, "/", null, fill(dictionaries[lang].hero.body, { count: num(doctors.length, lang), specialties: num(specialties.length, lang) })),
});

export const doctorsIndex = (lang: Lang) => ({
  Page: () => <DoctorsView lang={lang} />,
  metadata: pageMeta(lang, "/doctors", dictionaries[lang].allDoctors, fill(dictionaries[lang].hero.body, { count: num(doctors.length, lang), specialties: num(specialties.length, lang) })),
});

export const doctorPage = (lang: Lang) => ({
  generateStaticParams: () => doctors.map((d) => ({ slug: d.slug })),
  generateMetadata: async ({ params }: SlugProps) => {
    const d = doctorBySlug.get((await params).slug);
    if (!d) return {};
    const sp = specialtyOf(d);
    const name = doctorName(d, lang);
    const spName = lang === "bn" ? sp.bnPerson : sp.enPerson;
    const chamber = d.chambers[0]?.name ? placeName(d.chambers[0].name, lang) : "";
    const desc =
      lang === "bn"
        ? `${name}, ${spName} (${d.degrees})। চেম্বার: ${chamber}। ফি ${money(d.fees.new, lang)}। ${d.diseases.slice(0, 3).map((x) => diseaseName(x, lang)).join(", ")}। সিরিয়াল নিতে কল করুন।`
        : `${name}, ${spName} in Khulna (${d.degrees}). Chamber: ${chamber}. Fee ${money(d.fees.new, lang)}. Treats ${d.diseases.slice(0, 3).join(", ")}. Call to book a serial.`;
    return pageMeta(lang, `/doctors/${d.slug}`, `${name} — ${spName}`, desc, d.photo);
  },
  Page: async ({ params }: SlugProps) => {
    const d = doctorBySlug.get((await params).slug);
    if (!d) notFound();
    return <DoctorView doctor={d} lang={lang} />;
  },
});

export const specialtiesIndex = (lang: Lang) => ({
  Page: () => <SpecialtiesView lang={lang} />,
  metadata: pageMeta(lang, "/specialties", dictionaries[lang].nav.specialties, dictionaries[lang].browseSpecialties),
});

export const specialtyPage = (lang: Lang) => ({
  generateStaticParams: () => specialties.map((s) => ({ slug: s.slug })),
  generateMetadata: async ({ params }: SlugProps) => {
    const s = specialtyBySlug.get((await params).slug);
    if (!s) return {};
    const n = num(doctorsInSpecialty(s.slug).length, lang);
    return lang === "bn"
      ? pageMeta(lang, `/specialties/${s.slug}`, `খুলনার ${s.bnPerson}`, `খুলনার ${n} জন ${s.bnPerson} — চেম্বার, সময়সূচি ও ফি দেখুন এবং কল করে সিরিয়াল নিন।`)
      : pageMeta(lang, `/specialties/${s.slug}`, `${s.enPerson}s in Khulna: Chambers & Visiting Hours`, `${n} ${s.enPerson.toLowerCase()}s in Khulna — compare chambers, visiting hours and fees, then call to book your serial.`);
  },
  Page: async ({ params }: SlugProps) => {
    const s = specialtyBySlug.get((await params).slug);
    if (!s) notFound();
    return <SpecialtyView specialty={s} lang={lang} />;
  },
});

export const designationPage = (lang: Lang) => ({
  generateStaticParams: () => designations.map((d) => ({ slug: d.slug })),
  generateMetadata: async ({ params }: SlugProps) => {
    const { slug } = await params;
    const d = designations.find((x) => x.slug === slug);
    if (!d) return {};
    return pageMeta(lang, `/designations/${d.slug}`, lang === "bn" ? d.bn : `${d.en}s`, lang === "bn" ? `খুলনার ${d.bn} পদমর্যাদার ডাক্তারদের তালিকা।` : `Doctors in Khulna with the designation ${d.en}.`);
  },
  Page: async ({ params }: SlugProps) => {
    const slug = (await params).slug as Designation;
    if (!designations.some((x) => x.slug === slug)) notFound();
    return <DesignationView slug={slug} lang={lang} />;
  },
});

export const facilityPage = (lang: Lang, kind: FacilityKind, path: string) => {
  const f = dictionaries[lang].facilities;
  const copy = { hospital: [f.hospitalsTitle, f.hospitalsBody], diagnostic: [f.diagnosticsTitle, f.diagnosticsBody], "blood-bank": [f.bloodTitle, f.bloodBody], pharmacy: [f.pharmacyTitle, f.pharmacyBody] }[kind];
  return { Page: () => <FacilityView kind={kind} lang={lang} />, metadata: pageMeta(lang, path, copy[0], copy[1]) };
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
  metadata: pageMeta(lang, "/blog", dictionaries[lang].blog.title, dictionaries[lang].blog.body),
});

export const blogPost = (lang: Lang) => ({
  generateStaticParams: () => posts.map((p) => ({ slug: p.slug })),
  generateMetadata: async ({ params }: SlugProps) => {
    const p = postBySlug.get((await params).slug);
    if (!p) return {};
    const c = p[lang];
    return pageMeta(lang, `/blog/${p.slug}`, c.title, c.excerpt, shareImage(p), { article: { published: p.date, modified: p.updated ?? p.date } });
  },
  Page: async ({ params }: SlugProps) => {
    const p = postBySlug.get((await params).slug);
    if (!p) notFound();
    return <BlogPostView post={p} lang={lang} />;
  },
});

export const notFoundRoute = (lang: Lang) =>
  function NotFound() {
    return <NotFoundView lang={lang} />;
  };
