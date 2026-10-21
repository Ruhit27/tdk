import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { NotFoundView } from "@/views/ContentViews";
import { dictionaries } from "@/lib/dictionary";

const t = dictionaries.bn;
export const metadata: Metadata = { title: `${t.notFound.title} | ${t.siteName}` };

export default function GlobalNotFound() {
  return (
    <RootShell lang="bn">
      <NotFoundView lang="bn" />
    </RootShell>
  );
}
