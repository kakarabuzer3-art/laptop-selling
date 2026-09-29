"use client";

import { useEffect, useSyncExternalStore, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  catalog,
  configGroups,
  finishes,
  normalizeConfig,
  priceFor,
  describeConfig,
  type Config,
  type ModelSlug,
} from "@/lib/content/catalog";
import { colorways } from "@/lib/content/landing";
import { formatEUR } from "@/lib/content/product";
import { Button } from "@/components/ui/Button";

const STORE_KEY = "nv-config-v1";

const noopSubscribe = () => () => {};
function readSaved(): Config | null {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    return normalizeConfig(parsed as Record<string, string>);
  } catch {
    return null;
  }
}

function toParams(c: Config): string {
  return `model=${c.model}&mem=${c.mem}&ssd=${c.ssd}&fin=${c.fin}`;
}

const STEPS = [
  { id: "model", label: "Model" },
  { id: "mem", label: "Memory" },
  { id: "ssd", label: "Storage" },
  { id: "fin", label: "Finish" },
] as const;

/**
 * URL-state configurator island (~3 KB).
 * - the URL is the state: builds are shareable/bookmarkable, and the RSC
 *   renders the exact same config pre-hydration (normalizeConfig is shared)
 * - every mutation happens in an event handler (persist + router.replace),
 *   so there are zero effects and zero cascading renders
 * - saved-build resume pill via useSyncExternalStore (hydration-safe)
 * - reservation is simulated: no payment, 72 h hold, honest copy
 */
export function Configurator({
  initial,
  hadParams,
}: {
  initial: Config;
  hadParams: boolean;
}) {
  const router = useRouter();
  const [config, setConfig] = useState<Config>(initial);
  const [touched, setTouched] = useState<ReadonlySet<string>>(new Set());
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [reference, setReference] = useState("");
  const timer = useRef<number | undefined>(undefined);
  const saved = useSyncExternalStore(noopSubscribe, readSaved, () => null);

  // Clear a pending reservation timer if the island unmounts (cleanup only).
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const price = priceFor(config);
  const savedDiffers =
    saved !== null && !hadParams && toParams(saved) !== toParams(config);

  const update = (patch: Partial<Config>, stepId: string) => {
    const next = normalizeConfig({ ...config, ...patch });
    setConfig(next);
    setTouched((prev) => new Set(prev).add(stepId));
    setStatus("idle");
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* private mode: URL still carries the build */
    }
    router.replace(`/configure/?${toParams(next)}`, { scroll: false });
  };

  const reserve = () => {
    setStatus("loading");
    timer.current = window.setTimeout(() => {
      setReference(`NV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
      setStatus("done");
    }, 900);
  };

  const progress = Math.min(100, 25 + touched.size * 18.75 + (status === "done" ? 25 : 0));

  const radioCard =
    "opt relative block cursor-pointer border border-line bg-ink-950 p-4 transition-colors hover:border-fog-500 " +
    "has-[:checked]:border-signal has-[:checked]:bg-ink-900 " +
    "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-cobalt has-[:focus-visible]:outline-offset-2";

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      <form
        className="lg:col-span-7"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Configure your NORDVÄRK"
      >
        {savedDiffers && saved ? (
          <button
            type="button"
            onClick={() => update(saved, "resume")}
            className="caption mb-8 inline-flex items-center gap-2 border border-line px-4 py-2.5 text-fog-200 transition-colors hover:border-signal hover:text-signal"
          >
            <span className="text-signal" aria-hidden="true">
              ↺
            </span>
            Resume your saved build — {describeConfig(saved).join(" · ")}
          </button>
        ) : null}

        <div className="mb-10" aria-hidden="true">
          <div className="h-px w-full bg-line">
            <div
              className="h-px bg-signal transition-[width] duration-500 ease-out motion-reduce:transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="caption mt-2.5">
            Step {Math.min(4, touched.size + 1)} of 4 · progress saves automatically
          </p>
        </div>

        <fieldset>
          <legend className="caption">01 — Model</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {catalog.map((variant) => (
              <label key={variant.slug} className={radioCard}>
                <input
                  type="radio"
                  name="model"
                  className="sr-only"
                  checked={config.model === variant.slug}
                  onChange={() => update({ model: variant.slug as ModelSlug }, "model")}
                />
                <span className="font-display block text-lg font-semibold text-fog-50">
                  {variant.name}
                </span>
                <span className="caption mt-1 block">from {formatEUR(variant.basePrice)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="caption">02 — Memory</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {configGroups.memory[config.model].map((option) => (
              <label key={option.id} className={radioCard}>
                <input
                  type="radio"
                  name="mem"
                  className="sr-only"
                  checked={config.mem === option.id}
                  onChange={() => update({ mem: option.id }, "mem")}
                />
                <span className="flex items-baseline justify-between gap-3 text-sm text-fog-50">
                  {option.label}
                  <span className="caption">
                    {option.delta ? `+${formatEUR(option.delta)}` : "included"}
                  </span>
                </span>
                {option.hint ? <span className="caption mt-1.5 block">{option.hint}</span> : null}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="caption">03 — Storage</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {configGroups.storage[config.model].map((option) => (
              <label key={option.id} className={radioCard}>
                <input
                  type="radio"
                  name="ssd"
                  className="sr-only"
                  checked={config.ssd === option.id}
                  onChange={() => update({ ssd: option.id }, "ssd")}
                />
                <span className="flex items-baseline justify-between gap-3 text-sm text-fog-50">
                  {option.label}
                  <span className="caption">
                    {option.delta ? `+${formatEUR(option.delta)}` : "included"}
                  </span>
                </span>
                {option.hint ? <span className="caption mt-1.5 block">{option.hint}</span> : null}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="caption">04 — Finish · no surcharge</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {finishes.map((finish) => {
              const cw = colorways.find((c) => c.id === finish.id);
              return (
                <label key={finish.id} className={radioCard}>
                  <input
                    type="radio"
                    name="fin"
                    className="sr-only"
                    checked={config.fin === finish.id}
                    onChange={() => update({ fin: finish.id }, "fin")}
                  />
                  <span className="flex items-center gap-3 text-sm text-fog-50">
                    <span
                      aria-hidden="true"
                      className="h-5 w-5 rounded-full border border-white/25"
                      style={{ background: cw?.hex }}
                    />
                    {finish.label}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </form>

      <aside className="lg:col-span-5" aria-label="Build summary">
        <div className="border border-line bg-ink-900 p-7 lg:sticky lg:top-24">
          <p className="caption">Your build</p>
          <dl className="mt-5 space-y-2.5 text-sm">
            {describeConfig(config).map((line) => (
              <div key={line} className="flex gap-3">
                <dt className="sr-only">Configuration</dt>
                <dd className="text-fog-200">{line}</dd>
              </div>
            ))}
          </dl>
          <p
            aria-live="polite"
            className="font-display mt-6 border-t border-line pt-6 text-3xl font-semibold tracking-tight text-fog-50"
          >
            {formatEUR(price)}
            <span className="caption ml-2 font-normal">incl. VAT</span>
          </p>

          {status === "done" ? (
            <div role="status" className="fade-up mt-6 border border-signal/60 bg-signal/10 p-5">
              <p className="caption text-signal">Reserved · {reference}</p>
              <p className="mt-2 text-sm text-fog-200">
                No payment taken. This configuration and price are held for 72
                hours — our Malmö team confirms stock by email within one
                working day.
              </p>
            </div>
          ) : (
            <Button
              onClick={reserve}
              disabled={status === "loading"}
              busy={status === "loading"}
              size="lg"
              className="mt-6 w-full"
            >
              {status === "loading" ? "Reserving…" : `Reserve this build — ${formatEUR(price)}`}
            </Button>
          )}

          <ul className="mt-5 space-y-1.5">
            {["Free EU delivery, duty paid", "14-day returns, prepaid label", "2-year legal guarantee + 3-year warranty", "Ships in 3–5 working days"].map(
              (item) => (
                <li key={item} className="caption">
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
}
