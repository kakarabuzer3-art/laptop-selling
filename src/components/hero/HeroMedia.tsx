import Image from "next/image";
import { heroImage } from "@/lib/content/media.generated";
import { product } from "@/lib/content/product";

/**
 * The single LCP candidate of the landing page.
 * - `priority` + fetchPriority=high → preload link in <head>
 * - manifest-supplied intrinsic dimensions + 8px blur placeholder → zero CLS
 * - explicit `sizes` keeps the chosen variant honest at every breakpoint
 * - served from public/ so next/image derives AVIF/WebP variants at the edge
 */
export function HeroMedia() {
  return (
    <figure className="hero__media relative mx-auto w-full max-w-[34rem] sm:max-w-[42rem] lg:max-w-none">
      <div className="relative">
        <div
          aria-hidden="true"
          className="contact-shadow absolute inset-x-[6%] -bottom-[6%] h-[22%]"
        />
        <Image
          src={heroImage.src}
          width={heroImage.width}
          height={heroImage.height}
          blurDataURL={heroImage.blurDataURL}
          placeholder="blur"
          alt={product.hero.media.alt}
          priority
          fetchPriority="high"
          quality={82}
          sizes="(min-width: 1536px) 50vw, (min-width: 1024px) 54vw, 92vw"
          className="relative h-auto w-full"
        />
      </div>
      <figcaption className="caption mt-5 text-center lg:text-right">
        {product.hero.media.caption}
      </figcaption>
    </figure>
  );
}
