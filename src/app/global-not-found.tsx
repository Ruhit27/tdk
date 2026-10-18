import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { NotFoundView } from "@/views/ContentViews";

export const metadata: Metadata = { title: "Page not found | Top Doctors Khulna" };

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <NotFoundView lang="en" />
    </RootShell>
  );
}
