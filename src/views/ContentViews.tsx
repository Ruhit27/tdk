import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { aboutPage, contactPage, servicePages } from "@/content/pages";
import { posts, type Post } from "@/content/blog";
import { specialtyBySlug } from "@/data/specialties";
import { dictionaries, fill } from "@/lib/dictionary";
import { bnDigits } from "@/lib/bangla";
import { href, site, whatsappLink, type Lang } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
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
        {posts.map((p) => (
          <Link key={p.slug} href={href(lang, `/blog/${p.slug}`)} className="card group flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
            <IconTile name={p.icon} tone={p.tone} className="size-12 rounded-2xl" iconClassName="size-6" />
            <h2 className="mt-4 font-semibold leading-snug">{p[lang].title}</h2>
            <p className="mt-2 flex-1 text-sm text-ink-2">{p[lang].excerpt}</p>
            <p className="mt-4 flex items-center justify-between text-xs text-ink-2">
              <span>
                {formatDate(p.date, lang)} · {fill(t.blog.minutes, { n: lang === "bn" ? bnDigits(p.minutes) : p.minutes })}
              </span>
              <ArrowIcon className="size-4 text-brand transition group-hover:translate-x-1" />
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

export function BlogPostView({ post, lang }: { post: Post; lang: Lang }) {
  const t = dictionaries[lang];
  const c = post[lang];
  return (
    <>
      <PageHeader lang={lang} icon={post.icon} tone={post.tone} title={c.title} body={c.excerpt} crumbs={[{ label: t.nav.blog, to: href(lang, "/blog") }, { label: c.title }]} />
      <div className="container-x mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <article className="prose-site max-w-2xl">
          <p className="!mt-0 text-xs">
            {formatDate(post.date, lang)} · {fill(t.blog.minutes, { n: lang === "bn" ? bnDigits(post.minutes) : post.minutes })}
          </p>
          {c.body.map((b, i) => (
            <section key={i}>
              {b.h && <h2>{b.h}</h2>}
              {b.p && <p>{b.p}</p>}
              {b.ul && (
                <ul>
                  {b.ul.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
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
