import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { aboutPage, contactPage, servicePages } from "@/content/pages";
import { dayListPosts, doctorListPosts, guides, hospitalListPosts, IMAGE_SIZE, imageSrc, priceListPosts, readingMinutes, shareImage, type Post } from "@/content/blog";
import { specialtyBySlug } from "@/data/specialties";
import { dayNames, doctorBySlug, doctorName, formatHours, placeName } from "@/lib/doctors";
import { resolveQuery, type DoctorQuery } from "@/lib/doctor-groups";
import { cardData } from "@/components/DoctorCard";
import { DoctorCardView } from "@/components/DoctorCardView";
import { dictionaries, fill } from "@/lib/dictionary";
import { bnDigits } from "@/lib/bangla";
import { href, site, whatsappLink, type Lang } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { FaqsSection } from "@/components/ui/faqs-1";
import { ArrowIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { AppIcon, IconTile, toneText } from "@/components/AppIcon";

function BookPanel({ lang, topic }: { lang: Lang; topic: string }) {
  const t = dictionaries[lang];
  return (
    <div className="card overflow-hidden">
      <div className="bg-brand p-5 text-brand-ink">
        <p className="text-sm opacity-90">{t.footer.bookingLine}</p>
        <p className="mt-1 text-2xl font-bold">{lang === "bn" ? bnDigits(site.phoneDisplay) : site.phoneDisplay}</p>
      </div>
      <div className="grid gap-2 p-5">
        <a href={`tel:${site.phoneTel}`} className="btn btn-brand h-12">
          <PhoneIcon className="size-5" /> {t.doctor.call}
        </a>
        <a href={whatsappLink(fill(t.whatsapp.service, { service: topic }))} target="_blank" rel="noopener" className="btn btn-wa h-12">
          <WhatsAppIcon className="size-5" /> {t.doctor.whatsapp}
        </a>
      </div>
    </div>
  );
}

export function ServiceView({ page, lang }: { page: keyof typeof servicePages; lang: Lang }) {
  const t = dictionaries[lang];
  const c = servicePages[page][lang];
  const steps = lang === "bn" ? "যেভাবে কাজ করে" : "How it works";
  const includes = lang === "bn" ? "যা যা পাবেন" : "What's included";
  return (
    <>
      <PageHeader lang={lang} icon={c.icon} tone={c.tone} title={c.title} body={c.lead} crumbs={[{ label: t.nav.services }, { label: c.title }]} />
      <div className="container-x mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <section className="card p-5 sm:p-6">
            <h2 className="text-lg font-bold">{includes}</h2>
            <ul className="mt-4 space-y-3">
              {c.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" />
                  {p}
                </li>
              ))}
            </ul>
          </section>
          <section className="card p-5 sm:p-6">
            <h2 className="text-lg font-bold">{steps}</h2>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {c.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3 rounded-xl bg-surface-2 p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-brand-ink">{lang === "bn" ? bnDigits(i + 1) : i + 1}</span>
                  <span className="text-sm">{s}</span>
                </li>
              ))}
            </ol>
          </section>
          {c.note && <p className="flex items-start gap-2 rounded-xl border border-amber-300/50 bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200"><TriangleAlert className="mt-px size-4 shrink-0" aria-hidden />
              {c.note}</p>}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <BookPanel lang={lang} topic={c.waTopic} />
        </aside>
      </div>
    </>
  );
}

export function AboutView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];
  const c = aboutPage[lang];
  return (
    <>
      <PageHeader lang={lang} title={c.title} crumbs={[{ label: t.nav.about }]} />
      <div className="container-x mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="prose-site max-w-2xl">
            {c.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {c.values.map((v) => (
              <div key={v.title} className="card p-5">
                <h2 className="font-semibold">{v.title}</h2>
                <p className="mt-2 text-sm text-ink-2">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
        <aside>
          <BookPanel lang={lang} topic={t.services.appointment.title} />
        </aside>
      </div>
    </>
  );
}

export function ContactView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];
  const c = contactPage[lang];
  return (
    <>
      <PageHeader lang={lang} title={c.title} body={c.body} crumbs={[{ label: t.nav.contact }]} />
      <div className="container-x mt-8 grid gap-6 md:grid-cols-2">
        <BookPanel lang={lang} topic={t.services.appointment.title} />
        <div className="card divide-y divide-line">
          {[
            [c.hours, c.hoursValue],
            [c.area, c.areaValue],
            [t.nav.services, [t.services.appointment.title, t.services.lab.title, t.services.admission.title, t.services.ambulance.title, t.services.india.title].join(" · ")],
          ].map(([k, v]) => (
            <div key={k} className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-2">{k}</p>
              <p className="mt-1">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka" });
}

export function BlogIndexView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];
  return (
    <>
      <PageHeader lang={lang} title={t.blog.title} body={t.blog.body} crumbs={[{ label: t.nav.blog }]} />
      <div className="container-x mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((p) => {
          const c = p[lang];
          return (
            <Link key={p.slug} href={href(lang, `/blog/${p.slug}`)} className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
              {/* Decorative here: the title below already says what the post is about. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc(c.cover.src)} alt="" {...IMAGE_SIZE} loading="lazy" className="aspect-video w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
              <h2 className="font-semibold leading-snug">{c.title}</h2>
              <p className="mt-2 flex-1 text-sm text-ink-2">{c.excerpt}</p>
              <p className="mt-4 flex items-center justify-between text-xs text-ink-2">
                <span>
                  {formatDate(p.date, lang)} · {fill(t.blog.minutes, { n: num(readingMinutes(c), lang) })}
                </span>
                <ArrowIcon className="size-4 text-brand transition group-hover:translate-x-1" />
              </p>
              </div>
            </Link>
          );
        })}
      </div>
      <PostLinks lang={lang} title={t.blog.hospitals} body={t.blog.hospitalsBody} list={[...dayListPosts, ...hospitalListPosts]} />
      <PostLinks lang={lang} title={t.blog.lists} body={t.blog.listsBody} list={doctorListPosts} />
      {priceListPosts.length > 0 && <PostLinks lang={lang} title={t.blog.prices} body={t.blog.pricesBody} list={priceListPosts} />}
    </>
  );
}

/** A compact section of Post links, for the generated lists. */
function PostLinks({ lang, title, body, list }: { lang: Lang; title: string; body: string; list: Post[] }) {
  return (
    <section className="container-x mt-14">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-1 text-ink-2">{body}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link key={p.slug} href={href(lang, `/blog/${p.slug}`)} className="card group flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-lg">
            <IconTile name={p.icon} tone={p.tone} />
            <span className="flex-1 text-sm font-semibold leading-snug">{p[lang].title}</span>
            <ArrowIcon className="size-4 shrink-0 text-brand transition group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Doctor cards for a Post's `doctors` block. For a Hospital or a day, the card shows that chamber and its own days or hours. */
function DoctorBlock({ query, lang }: { query: DoctorQuery; lang: Lang }) {
  const short = (d: string) => (lang === "bn" ? d.replace(/বার$/, "") : d.slice(0, 3));
  return (
    <div className="not-prose my-6 grid gap-5 sm:grid-cols-2">
      {resolveQuery(query).map(({ doctor, chamber }) => {
        const base = cardData(doctor, lang);
        const card = !chamber
          ? base
          : {
              ...base,
              chamber: placeName(chamber.name, lang),
              days:
                "day" in query
                  ? `${dayNames[lang][query.day]}: ${formatHours(chamber.schedule.find((s) => s.day === query.day)?.time ?? null, lang)}`
                  : chamber.schedule.filter((s) => s.time).map((s) => short(dayNames[lang][s.day])).join(", "),
            };
        return <DoctorCardView key={doctor.slug} d={card} lang={lang} />;
      })}
    </div>
  );
}

const num = (n: number, lang: Lang) => (lang === "bn" ? bnDigits(n) : String(n));

/** Article + FAQPage (PageHeader adds the BreadcrumbList), so search engines and AI answers can quote the Post and its FAQ. */
function postJsonLd(post: Post, lang: Lang) {
  const t = dictionaries[lang];
  const c = post[lang];
  const url = `${site.url}${href(lang, `/blog/${post.slug}`)}`;
  const org = { "@type": "Organization", name: t.siteName, url: `${site.url}${href(lang, "/")}` };
  const reviewer = post.reviewer ? doctorBySlug.get(post.reviewer) : undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: c.title,
        description: c.excerpt,
        inLanguage: lang === "bn" ? "bn-BD" : "en",
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author: org,
        publisher: org,
        mainEntityOfPage: url,
        image: `${site.url}${shareImage(post)}`,
        ...(reviewer ? { reviewedBy: { "@type": "Physician", name: reviewer.name, url: `${site.url}${href(lang, `/doctors/${reviewer.slug}`)}` } } : {}),
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
}

export function BlogPostView({ post, lang }: { post: Post; lang: Lang }) {
  const t = dictionaries[lang];
  const c = post[lang];
  const reviewer = post.reviewer ? doctorBySlug.get(post.reviewer) : undefined;
  return (
    <>
      <JsonLd data={postJsonLd(post, lang)} />
      <PageHeader lang={lang} icon={post.icon} tone={post.tone} title={c.title} body={c.excerpt} crumbs={[{ label: t.nav.blog, to: href(lang, "/blog") }, { label: c.title }]} />
      <div className="container-x mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <article className="prose-site max-w-2xl">
          <p className="!mt-0 text-xs">
            {fill(t.blog.by, { name: t.blog.team })} · <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            {post.updated && (
              <>
                {" "}· <time dateTime={post.updated}>{fill(t.blog.updated, { date: formatDate(post.updated, lang) })}</time>
              </>
            )}{" "}
            · {fill(t.blog.minutes, { n: num(readingMinutes(c), lang) })}
          </p>
          {reviewer && (
            <p className="text-xs">
              <Link href={href(lang, `/doctors/${reviewer.slug}`)}>{fill(t.blog.reviewed, { name: doctorName(reviewer, lang) })}</Link>
            </p>
          )}
          <aside className="rounded-2xl border border-line bg-brand-soft/60 p-5">
            <p className="!mt-0 text-xs font-semibold uppercase tracking-wider text-brand-strong">{t.blog.inShort}</p>
            <p className="!mt-2">{c.answer}</p>
          </aside>
          {/* Post illustrations are small SVG files, so a plain <img> is enough. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc(c.cover.src)} alt={c.cover.alt} {...IMAGE_SIZE} fetchPriority="high" className="mt-6 h-auto w-full rounded-2xl" />
          {c.body.map((b, i) => (
            <section key={i}>
              {b.h && <h2>{b.h}</h2>}
              {b.p && <p>{b.p}</p>}
              {b.doctors && <DoctorBlock query={b.doctors} lang={lang} />}
              {b.table && (
                <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-line">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-surface-2">
                      <tr>{b.table.head.map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {b.table.rows.map((r) => (
                        <tr key={r.join("|")} className="border-t border-line">{r.map((c, i) => <td key={i} className="px-4 py-3 text-ink-2">{c}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {b.ul && (
                <ul>
                  {b.ul.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {b.img && <img src={imageSrc(b.img.src)} alt={b.img.alt} {...IMAGE_SIZE} loading="lazy" className="my-6 h-auto w-full rounded-2xl" />}
            </section>
          ))}
          <FaqsSection
            className="mt-10"
            title={t.blog.faq}
            description={t.blog.faqBody}
            items={c.faq}
            footer={
              <>
                {t.blog.faqMore}{" "}
                <a href={`tel:${site.phoneTel}`} className="font-semibold text-brand-strong hover:underline">
                  {t.blog.faqCall}
                </a>
              </>
            }
          />
          <Link href={href(lang, "/blog")} className="mt-8 inline-flex items-center gap-1 font-semibold text-brand-strong">
            ← {t.blog.back}
          </Link>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <BookPanel lang={lang} topic={c.title} />
          {post.related.length > 0 && (
            <div className="card p-5">
              <h2 className="font-semibold">{t.browseSpecialties}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.related.map((s) => {
                  const sp = specialtyBySlug.get(s)!;
                  return (
                    <Link key={s} href={href(lang, `/specialties/${s}`)} className="chip border border-line !bg-surface hover:border-brand">
                      <AppIcon name={sp.icon} className={`size-4 ${toneText(sp.tone)}`} /> {lang === "bn" ? sp.bn : sp.en}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

export function NotFoundView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];
  return (
    <div className="container-x py-24 text-center">
      <span className="mx-auto grid size-20 place-items-center rounded-3xl bg-brand-soft text-brand-strong">
        <AppIcon name="stethoscope" className="size-10" />
      </span>
      <h1 className="mt-4 text-3xl font-bold">{t.notFound.title}</h1>
      <p className="mt-2 text-ink-2">{t.notFound.body}</p>
      <Link href={href(lang, "/")} className="btn btn-brand mt-6">
        {t.notFound.home}
      </Link>
    </div>
  );
}
