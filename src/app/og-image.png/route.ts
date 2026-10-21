import { defaultOg } from "@/lib/og";

// The share image for every page without its own (see `pageMeta`). A route rather than an
// `opengraph-image` file, because pages that set `openGraph` don't inherit a parent's image file.
export const GET = defaultOg().Image;
