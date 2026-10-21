import type { Viewport } from "next";
import { RootShell } from "@/components/RootShell";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f9f8" },
    { media: "(prefers-color-scheme: dark)", color: "#061412" },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
