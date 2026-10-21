// Share images (og:image) for the routes people actually send on WhatsApp and Facebook.
// Each route's `opengraph-image.tsx` re-exports one of these factories, like `src/routes.tsx` does for pages.
// Cards are English on both language trees: the image renderer can't shape Bangla conjuncts.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { specialties, specialtyBySlug } from "@/data/specialties";
import { badgeSvg, brandColors, lockupSvg, svgDataUri } from "@/lib/brand";
import { designations, doctorBySlug, doctors, doctorsInSpecialty, specialtyOf } from "@/lib/doctors";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type SlugProps = { params: Promise<{ slug: string }> };

const c = brandColors.light;
// Read at module load so prerendering isn't cut short by file I/O (Cache Components).
const [extraBold, semiBold] = await Promise.all(["ExtraBold", "SemiBold"].map((w) => readFile(join(process.cwd(), `src/fonts/PlusJakartaSans-${w}.ttf`))));
const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/** Satori can't decode WebP, so doctor photos are converted on the way in. */
async function photoUri(photo: string) {
  "use cache";
  const png = await sharp(join(process.cwd(), "public", photo)).resize(360, 360).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

async function card({ eyebrow, title, subtitle, photo }: { eyebrow: string; title: string; subtitle: string; photo?: string | null }) {
  const art = photo ? await photoUri(photo) : svgDataUri(badgeSvg());
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f5f9f8", fontFamily: "Jakarta", color: c.ink }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "56px 72px 40px", gap: 56 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse markup, not a page */}
            <img src={svgDataUri(lockupSvg(c))} width={330} height={68} alt="" />
            <div style={{ marginTop: 56, fontSize: 30, fontWeight: 600, color: c.leaf }}>{eyebrow}</div>
            <div style={{ marginTop: 12, fontSize: title.length > 26 ? 58 : 68, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5 }}>{title}</div>
            <div style={{ marginTop: 20, fontSize: 28, fontWeight: 600, color: "#4a615d", lineHeight: 1.35 }}>{subtitle}</div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse markup, not a page */}
          <img src={art} width={320} height={320} alt="" style={{ borderRadius: photo ? 160 : 72, border: photo ? `10px solid ${c.leaf}` : "none" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 92, padding: "0 72px", background: c.leaf, color: "#fff", fontSize: 30, fontWeight: 600 }}>
          <span>Book a serial: {site.phoneDisplay}</span>
          <span style={{ opacity: 0.85 }}>{new URL(site.url).host}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: extraBold, weight: 800, style: "normal" },
        { name: "Jakarta", data: semiBold, weight: 600, style: "normal" },
      ],
    },
  );
}

export const defaultOg = () => ({
  Image: () =>
    card({
      eyebrow: "Doctor directory for Khulna",
      title: "Find the right specialist in Khulna",
      subtitle: `${doctors.length} doctors across ${specialties.length} specialties — chambers, visiting hours and fees.`,
    }),
});

export const doctorOg = () => ({
  alt: `Doctor profile — ${site.nameEn}`,
  generateStaticParams: () => doctors.map((d) => ({ slug: d.slug })),
  Image: async ({ params }: SlugProps) => {
    const d = doctorBySlug.get((await params).slug)!;
    const designation = designations.find((x) => x.slug === d.designation)?.en;
    return card({
      eyebrow: specialtyOf(d).enPerson,
      title: d.name,
      subtitle: clip([d.degrees, designation].filter(Boolean).join(" · "), 110),
      photo: d.photo,
    });
  },
});

export const specialtyOg = () => ({
  alt: `Specialty doctor list — ${site.nameEn}`,
  generateStaticParams: () => specialties.map((s) => ({ slug: s.slug })),
  Image: async ({ params }: SlugProps) => {
    const s = specialtyBySlug.get((await params).slug)!;
    const n = doctorsInSpecialty(s.slug).length;
    return card({
      eyebrow: `${n} ${n === 1 ? "doctor" : "doctors"} listed`,
      title: `${s.enPerson}s in Khulna`,
      subtitle: "Compare chambers, visiting hours and fees, then call to book your serial.",
    });
  },
});
