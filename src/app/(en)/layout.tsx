import type { Viewport } from "next";
import { RootShell } from "@/components/RootShell";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6fbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#071514" },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
