import { Button } from "@/components/ui/Button";
import { catalog, comparisonRows, type ModelSlug } from "@/lib/content/catalog";
import { cn } from "@/lib/utils/cn";

/**
 * Feature matrix: real <table>, sticky feature column for horizontal scroll on
 * small screens, highlighted column for the recommended or queried model.
 */
export function ComparisonMatrix({ highlight }: { highlight?: ModelSlug }) {
  const rows = comparisonRows();

  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Specification comparison table, scrolls horizontally">
      <table className="matrix w-full min-w-[54rem] border-collapse text-left">
        <caption className="caption sr-only">
          Feature-by-feature comparison of NORDVÄRK N1, N1 Pro and N1 Studio
        </caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="matrix__pin caption py-6 pr-6 font-normal">
              Feature
            </th>
            {catalog.map((variant) => (
              <th
                key={variant.slug}
                scope="col"
                className={cn(
                  "w-[23%] py-6 pr-6 align-top",
                  variant.slug === highlight && "matrix__hl",
                )}
              >
                <span className="font-display block text-2xl font-semibold tracking-tight text-fog-50">
                  {variant.name}
                </span>
                {variant.highlighted ? (
                  <span className="caption mt-1 block text-signal">Most chosen</span>
                ) : null}
                <span className="caption mt-2 block">from €{variant.basePrice.toLocaleString("en-IE")}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-line">
              <th scope="row" className="matrix__pin caption py-4 pr-6 align-top font-normal">
                {row.label}
              </th>
              {row.values.map((value, i) => (
                <td
                  key={catalog[i]?.slug ?? i}
                  className={cn(
                    "py-4 pr-6 align-top text-sm text-fog-200",
                    catalog[i]?.slug === highlight && "matrix__hl",
                  )}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-line">
            <th scope="row" className="matrix__pin caption py-6 pr-6 font-normal">
              Choose
            </th>
            {catalog.map((variant) => (
              <td
                key={variant.slug}
                className={cn("py-6 pr-6", variant.slug === highlight && "matrix__hl")}
              >
                <Button
                  href={`/configure/?model=${variant.slug}`}
                  variant={variant.highlighted ? "signal" : "outline"}
                >
                  {`Configure ${variant.name}`}
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
