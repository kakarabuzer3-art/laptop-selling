"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ComparisonMatrix } from "@/components/product/ComparisonMatrix";
import { Reveal } from "@/components/motion/Reveal";
import { isModelSlug } from "@/lib/content/catalog";

/**
 * `?model=` drives a highlight class on one column. Reading it on the client
 * (rather than awaiting `searchParams` on the server) is what lets this route be
 * prerendered to a plain .html file by `output: "export"`.
 */
function CompareMatrixIsland() {
  const params = useSearchParams();
  const model = params.get("model");
  const highlight = isModelSlug(model) ? model : undefined;
  return (
    <Reveal>
      <ComparisonMatrix highlight={highlight} />
    </Reveal>
  );
}

export function CompareMatrixClient() {
  return (
    <Suspense fallback={<MatrixSkeleton />}>
      <CompareMatrixIsland />
    </Suspense>
  );
}

/** Same scroll-container shape as the matrix, so nothing shifts on hydration. */
function MatrixSkeleton() {
  return (
    <div
      className="overflow-x-auto border border-line"
      role="region"
      aria-label="Specification comparison table, scrolls horizontally"
      aria-busy="true"
    >
      <p className="caption p-7">Loading comparison…</p>
    </div>
  );
}