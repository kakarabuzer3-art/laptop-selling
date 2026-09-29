import Link from "next/link";

export type Crumb = { label: string; href?: string };

/** Hairline breadcrumb trail; pairs with BreadcrumbList JSON-LD on the page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-x pt-28 md:pt-32">
      <ol className="caption flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 ? (
              <span aria-hidden="true" className="text-fog-500">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-fog-200">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-fog-200">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
