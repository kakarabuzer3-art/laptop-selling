import type { AnchorHTMLAttributes, ReactNode } from "react";

type StubProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children?: ReactNode;
  prefetch?: boolean;
};

/** Test-only stand-in for next/link: same anchor contract, no router needed. */
export default function LinkStub({ href, children, prefetch: _p, ...rest }: StubProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
