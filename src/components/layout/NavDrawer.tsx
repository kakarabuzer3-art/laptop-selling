"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils/cn";

type NavLink = { label: string; href: string };

/**
 * Accessible mobile navigation drawer (~1.4 KB).
 * - real focus trap + Esc + focus restore, body scroll lock
 * - links stagger in via CSS (animation gated on [data-open])
 * - renders nothing interactive until mounted, so SSR stays clean
 */
export function NavDrawer({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previous = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previous?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-12 w-12 items-center justify-center border border-line text-fog-200 transition-colors hover:border-fog-500 hover:text-fog-50 md:hidden"
      >
        <svg aria-hidden="true" viewBox="0 0 20 14" className="h-3.5 w-5" fill="none">
          {open ? (
            <path d="M1 1l18 12M19 1L1 13" stroke="currentColor" strokeWidth="1.5" />
          ) : (
            <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.5" />
          )}
        </svg>
      </button>

      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        data-open={open || undefined}
        hidden={!open}
        className={cn(
          "fixed inset-0 z-60 flex flex-col bg-ink-950/97 backdrop-blur-md md:hidden",
        )}
      >
        <div className="container-x flex h-22 items-center justify-between">
          <span className="font-display text-lg font-semibold text-fog-50">
            NORDVÄRK<span className="text-signal">.</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-12 w-12 items-center justify-center border border-line text-fog-200"
          >
            <svg aria-hidden="true" viewBox="0 0 20 14" className="h-3.5 w-5" fill="none">
              <path d="M1 1l18 12M19 1L1 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="container-x mt-6 flex-1">
          <ul className="space-y-2">
            {links.map((link, i) => (
              <li key={link.href} className="drawer-item" style={{ "--i": i } as CSSProperties}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display block py-3 text-4xl font-semibold tracking-tight text-fog-50 transition-colors hover:text-signal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-x pb-10">
          <Link
            href="/configure/"
            onClick={() => setOpen(false)}
            className="chamfer flex h-14 items-center justify-center bg-signal text-base font-medium text-signal-ink"
          >
            Configure yours — from €1,499
          </Link>
          <p className="caption mt-4">Free EU delivery · 14-day returns</p>
        </div>
      </div>
    </>
  );
}
