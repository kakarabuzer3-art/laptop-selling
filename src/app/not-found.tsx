import Link from "next/link";
import { product } from "@/lib/content/product";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-svh flex-col items-start justify-center py-32">
      <p className="caption">Error 404 · Page not in the spec sheet</p>
      <h1 className="display-hero mt-6">
        <span className="line">
          <span>Nothing</span>
        </span>
        <span className="line">
          <span className="text-signal">here.</span>
        </span>
      </h1>
      <p className="lead mt-6">
        The page you asked for is not on the drawing. The machine, however, is.
      </p>
      <Link
        href="/"
        className="chamfer mt-10 inline-flex h-14 items-center bg-signal px-8 text-base font-medium text-signal-ink transition-colors hover:bg-signal-strong"
      >
        Back to the N1
      </Link>
      <p className="caption mt-8">{`Looking for the ${product.name}? It starts on the homepage.`}</p>
    </section>
  );
}
