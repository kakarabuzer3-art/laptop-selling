"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Configurator } from "@/components/product/Configurator";
import { normalizeConfig } from "@/lib/content/catalog";

/**
 * `output: "export"` cannot prerender a server component that awaits
 * `searchParams`, so the build state is resolved on the client instead. It goes
 * through the very same `normalizeConfig` the server used, so the island still
 * renders the exact build the URL describes rather than a default placeholder.
 */
function ConfigureIsland() {
  const params = useSearchParams();
  const flat: Record<string, string> = {};
  for (const [key, value] of params.entries()) flat[key] = value;
  const hadParams = Boolean(flat.model || flat.mem || flat.ssd || flat.fin);
  return <Configurator initial={normalizeConfig(flat)} hadParams={hadParams} />;
}

export function ConfigureClient() {
  return (
    <Suspense fallback={<ConfiguratorSkeleton />}>
      <ConfigureIsland />
    </Suspense>
  );
}

/** Mirrors the island's two-column layout so hydration causes no visible shift. */
function ConfiguratorSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-12" aria-busy="true" aria-live="polite">
      <div className="lg:col-span-7">
        <p className="caption">Loading configurator…</p>
      </div>
      <div className="lg:col-span-5">
        <div className="border border-line bg-ink-900 p-7">
          <p className="caption">Your build</p>
        </div>
      </div>
    </div>
  );
}