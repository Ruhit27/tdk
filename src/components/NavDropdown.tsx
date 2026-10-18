"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronIcon } from "@/components/icons";

/**
 * Header dropdown that opens on hover or click and closes as soon as a link inside is chosen,
 * on Escape, or when the pointer/focus leaves — so it never lingers over the page you just opened.
 */
export function NavDropdown({ label, href, align = "left", panelClassName = "w-60", children }: { label: string; href?: string; align?: "left" | "right"; panelClassName?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // Small delay so moving the pointer from the trigger into the panel doesn't flicker it shut.
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => root.current && !root.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  useEffect(() => () => void (closeTimer.current && clearTimeout(closeTimer.current)), []);

  const trigger = "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 hover:bg-surface-2";
  const chevron = <ChevronIcon className={`size-3.5 opacity-60 transition ${open ? "rotate-180" : ""}`} />;

  return (
    <div
      ref={root}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      {href ? (
        <Link href={href} className={trigger} onClick={() => setOpen(false)} onFocus={show} aria-haspopup="true" aria-expanded={open}>
          {label} {chevron}
        </Link>
      ) : (
        <button type="button" className={trigger} onClick={() => setOpen((o) => !o)} aria-haspopup="true" aria-expanded={open}>
          {label} {chevron}
        </button>
      )}
      {open && (
        <div className={`absolute top-full z-50 pt-2 ${align === "right" ? "right-0" : "left-0"} ${panelClassName}`}>
          {/* Any link click inside closes the panel before the next page renders. */}
          <div className="card max-h-[min(70vh,32rem)] overflow-y-auto overscroll-contain p-2 shadow-xl" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
