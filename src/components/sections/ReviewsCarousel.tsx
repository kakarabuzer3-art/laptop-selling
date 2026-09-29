import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "./SectionHead";
import { reviews } from "@/lib/content/landing";
import { product } from "@/lib/content/product";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5"
          fill={star <= rating ? "var(--color-signal)" : "none"}
          stroke={star <= rating ? "var(--color-signal)" : "var(--color-fog-500)"}
          strokeWidth="1"
        >
          <path d="M8 1.5l1.9 4 4.4.5-3.3 3 .9 4.3L8 11.1l-3.9 2.2.9-4.3-3.3-3 4.4-.5z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * §13 — native scroll-snap carousel: drag, swipe, wheel and keyboard all work
 * with zero JS and zero trapped focus. Order is never algorithmically changed.
 */
export function ReviewsCarousel() {
  return (
    <section aria-labelledby="reviews-title" className="py-24 md:py-32">
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <div id="reviews-title">
          <SectionHead index="07" kicker="Owners" title="Verified, unedited." />
        </div>
        <Reveal delay={120}>
          <p className="font-display text-2xl font-semibold text-fog-50">
            {product.rating.value.toFixed(1)}
            <span className="caption ml-2 font-normal">
              / 5 · {product.rating.count.toLocaleString("en-IE")} verified owners
            </span>
          </p>
        </Reveal>
      </div>

      <div className="container-x mt-12">
        <ul
          aria-label="Customer reviews — scroll horizontally to read all"
          tabIndex={0}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {reviews.map((review) => (
            <li
              key={review.name}
              className="w-[85vw] max-w-[26rem] shrink-0 snap-center border border-line bg-ink-900 p-7"
            >
              <Stars rating={review.rating} />
              <blockquote className="mt-5 leading-relaxed text-fog-200">
                {"“"}
                {review.quote}
                {"”"}
              </blockquote>
              <footer className="caption mt-6">
                {review.name} · {review.role} · verified purchase
              </footer>
            </li>
          ))}
        </ul>
        <p className="caption mt-3">Scroll or swipe — we never reorder or filter negative reviews.</p>
      </div>
    </section>
  );
}
