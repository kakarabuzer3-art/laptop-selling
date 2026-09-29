/* eslint-disable @next/next/no-img-element -- intentional: this stub exists
   to emulate the <img> contract of next/image inside unit tests. */
import type { ImgHTMLAttributes } from "react";

type StaticImport = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

type StubProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string | StaticImport;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  quality?: number;
};

/**
 * Test-only stand-in for next/image: renders the same contract a real
 * <img> receives so SSR assertions can inspect alt/priority/sizes without
 * booting the Next image runtime.
 */
export default function ImageStub({
  src,
  alt,
  priority,
  fetchPriority,
  sizes,
  fill: _fill,
  quality: _quality,
  blurDataURL: _blur,
  placeholder: _placeholder,
  ...rest
}: StubProps & { blurDataURL?: string; placeholder?: string }) {
  const resolved = typeof src === "string" ? src : src.src;
  return (
    <img
      src={resolved}
      alt={alt}
      fetchPriority={fetchPriority ?? (priority ? "high" : undefined)}
      data-sizes={sizes}
      data-priority={priority ? "true" : undefined}
      {...rest}
    />
  );
}
