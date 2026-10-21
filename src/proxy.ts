import { NextResponse, type NextRequest } from "next/server";
import { specialties } from "@/data/specialties";
import { posts } from "@/content/blog";
import { designations, doctors } from "@/lib/doctors";

// Slug pages read `params` under <Suspense>, so a `notFound()` there arrives after the 200 has been sent
// (a "soft 404"). Unknown slugs are turned away here, before rendering, so they get a real 404.
const known: Record<string, Set<string>> = {
  doctors: new Set(doctors.map((d) => d.slug)),
  specialties: new Set(specialties.map((s) => s.slug)),
  designations: new Set(designations.map((d) => d.slug)),
  blog: new Set(posts.map((p) => p.slug)),
};

export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.replace(/^\/bn(?=\/)/, "").split("/");
  if (known[section]?.has(decodeURIComponent(slug))) return NextResponse.next();
  // Rewriting to a path no route matches renders the global not-found page. The explicit status matters
  // on Vercel, which otherwise serves the prerendered /404 page with a 200.
  return NextResponse.rewrite(new URL("/_not-found-slug", request.url), { status: 404 });
}

// Slugs never contain a dot; excluding dotted segments keeps static files like /blog/cover.svg out of the proxy.
export const config = {
  matcher: ["/(doctors|specialties|designations|blog)/:slug([^/.]+)", "/bn/(doctors|specialties|designations|blog)/:slug([^/.]+)"],
};
