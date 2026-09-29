"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils/cn";

const STORAGE_KEY = "nv-consent-v1";
const CHANGE_EVENT = "nv:consent-changed";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

function readDecided(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return true; // storage unavailable → never trap the user in a banner
  }
}

function subscribe(cb: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, cb);
  return () => window.removeEventListener(CHANGE_EVENT, cb);
}

/**
 * GDPR consent island (~1.6 KB). No dark patterns:
 * - nothing pre-ticked, necessary cannot be switched off (it is the law)
 * - Reject all is as prominent as Accept all
 * - decision stored locally; `nv:consent` lets future analytics loaders
 *   subscribe instead of shipping tracking code now
 * - SSR + hydration render nothing (getServerSnapshot = decided), then the
 *   store syncs post-hydration — no mismatch, no effect-driven setState
 */
export function ConsentBanner() {
  const decided = useSyncExternalStore(subscribe, readDecided, () => true);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (decided) return null;

  const decide = (next: ConsentState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* private mode: consent simply won't persist — safe default */
    }
    window.dispatchEvent(new CustomEvent("nv:consent", { detail: next }));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  };

  const toggle =
    "relative h-6 w-11 shrink-0 border border-line bg-ink-800 transition-colors peer-checked:border-signal peer-checked:bg-signal/25 peer-focus-visible:outline-2 peer-focus-visible:outline-cobalt";
  const knob =
    "pointer-events-none absolute top-1 left-1 h-4 w-4 bg-fog-300 transition-transform peer-checked:translate-x-5 peer-checked:bg-signal";

  return (
    <div
      role="dialog"
      aria-label="Cookie and privacy consent"
      aria-modal="false"
      className="fixed inset-x-0 bottom-0 z-70 border-t border-line bg-ink-900/97 backdrop-blur-md"
    >
      <div className="container-x grid gap-6 py-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="caption">Privacy, in plain language</p>
          <p className="mt-2 max-w-[62ch] text-sm text-fog-300">
            Necessary cookies keep the site working — they cannot be switched
            off. Analytics and marketing are optional, stored on your device,
            and never sold. Change your mind any time from the footer.{" "}
            <Link
              href="/legal/privacy/"
              className="underline underline-offset-4 hover:text-fog-50"
            >
              Privacy policy
            </Link>
          </p>

          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            <label className="flex items-center gap-3 text-sm text-fog-200">
              <input
                type="checkbox"
                checked
                disabled
                className="peer sr-only"
                aria-label="Necessary cookies (always on)"
              />
              <span className={cn(toggle, "opacity-60")}>
                <span className={knob} />
              </span>
              Necessary
            </label>
            <label className="flex items-center gap-3 text-sm text-fog-200">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="peer sr-only"
                aria-label="Analytics cookies"
              />
              <span className={toggle}>
                <span className={knob} />
              </span>
              Analytics
            </label>
            <label className="flex items-center gap-3 text-sm text-fog-200">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="peer sr-only"
                aria-label="Marketing cookies"
              />
              <span className={toggle}>
                <span className={knob} />
              </span>
              Marketing
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() =>
              decide({
                necessary: true,
                analytics: true,
                marketing: true,
                decidedAt: new Date().toISOString(),
              })
            }
            className="chamfer h-12 bg-signal px-6 text-sm font-medium text-signal-ink transition-colors hover:bg-signal-strong"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() =>
              decide({
                necessary: true,
                analytics: false,
                marketing: false,
                decidedAt: new Date().toISOString(),
              })
            }
            className="h-12 border border-line px-6 text-sm text-fog-200 transition-colors hover:border-fog-500 hover:text-fog-50"
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={() =>
              decide({
                necessary: true,
                analytics,
                marketing,
                decidedAt: new Date().toISOString(),
              })
            }
            className="h-12 px-4 text-sm text-fog-300 underline underline-offset-4 hover:text-fog-50"
          >
            Save choices
          </button>
        </div>
      </div>
    </div>
  );
}
