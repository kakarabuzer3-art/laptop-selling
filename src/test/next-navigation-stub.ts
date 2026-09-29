/** Test-only stand-in for next/navigation (no router exists in unit tests). */
export function useRouter() {
  return {
    replace: () => {},
    push: () => {},
    prefetch: () => {},
    back: () => {},
  };
}

export function usePathname() {
  return "/";
}

export function useSearchParams() {
  return new URLSearchParams();
}
