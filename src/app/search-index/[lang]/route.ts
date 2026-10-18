import { buildSearchPayload } from "@/lib/search-index";
import { langs, type Lang } from "@/lib/site";

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l: Lang = lang === "bn" ? "bn" : "en";
  return Response.json(buildSearchPayload(l), {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
