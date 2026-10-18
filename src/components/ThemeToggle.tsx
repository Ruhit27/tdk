"use client";

import { MoonIcon, SunIcon } from "@/components/icons";

export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }
  return (
    <button onClick={toggle} aria-label={label} title={label} className="grid size-10 place-items-center rounded-full text-ink-2 hover:bg-surface-2">
      <SunIcon className="hidden size-5 dark:block" />
      <MoonIcon className="size-5 dark:hidden" />
    </button>
  );
}
