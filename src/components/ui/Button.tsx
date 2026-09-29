import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { ThermalSurface } from "@/components/ui/ThermalSurface";

export type ButtonVariant = "signal" | "outline" | "ghost" | "quiet";
export type ButtonSize = "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  /** Renders an <a> when present, a <button> otherwise. */
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Inline specificity inside the button, e.g. "from €1,499 incl. VAT". */
  hint?: string;
  arrow?: boolean;
  disabled?: boolean;
  /** Shown next to a disabled control — a disabled action must explain itself. */
  disabledReason?: string;
  className?: string;
  style?: CSSProperties;
  /** Only passable from a client component (the island re-renders the shell). */
  onClick?: () => void;
  /** Marks the control as mid-request, e.g. "Reserving…" → aria-busy. */
  busy?: boolean;
  "aria-label"?: string;
};

const base =
  "btn-thermal group/btn relative inline-flex items-center justify-center gap-3 font-medium " +
  "transition-[background-color,color,border-color,transform] duration-200 " +
  "ease-out select-none active:scale-[0.98] motion-reduce:active:scale-100";

const sizes: Record<ButtonSize, string> = {
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-7 text-base sm:px-8",
};

const variants: Record<ButtonVariant, string> = {
  // The only place --color-signal is allowed to live (Von Restorff isolation).
  signal: "chamfer bg-signal text-signal-ink hover:bg-signal-strong",
  outline:
    "border border-line text-fog-200 hover:border-fog-500 hover:text-fog-50",
  ghost:
    "text-fog-300 hover:text-fog-50 underline decoration-line underline-offset-8 " +
    "hover:decoration-signal transition-colors",
  quiet: "caption hover:text-fog-200",
};

/**
 * Server-safe button/link primitive implementing the variant ladder from
 * docs/00-architecture-blueprint.md §6, with the Thermal hover surface from
 * "Hover Buttons — Part 5" applied to every control.
 *
 * The control is a real `<a>`/`<button>` and is fully operable with JavaScript
 * disabled or blocked; the heat field is a progressive enhancement layered on
 * top by the <ThermalSurface /> canvas (see ADR 0003).
 */
export function Button({
  children,
  href,
  variant = "signal",
  size = "md",
  hint,
  arrow = false,
  disabled = false,
  disabledReason,
  className,
  style,
  onClick,
  busy,
  ...rest
}: ButtonProps) {
  const classes = cn(
    base,
    sizes[size],
    variants[variant],
    disabled && "pointer-events-none opacity-45",
    className,
  );

  const inner = (
    <>
      {/* Decorative heat field, wired to this element by ThermalSurface. */}
      <ThermalSurface />
      <span className="btn-thermal__label relative z-10 inline-flex items-center justify-center gap-3">
        <span>{children}</span>
        {hint ? (
          <span
            className={cn(
              "font-mono text-[0.72rem] tracking-[0.08em] whitespace-nowrap",
              variant === "signal" ? "opacity-75" : "text-fog-500",
            )}
          >
            {hint}
          </span>
        ) : null}
        {arrow ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 20 12"
            fill="none"
            className="h-3 w-5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/btn:translate-x-0"
          >
            <path
              d="M0 6h17M12 1l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        ) : null}
      </span>
    </>
  );

  const aria = rest["aria-label"] ? { "aria-label": rest["aria-label"] } : {};
  const isInternal = !!href && href.startsWith("/") && !href.startsWith("//");
  // Drives the canvas blend mode: heat must `screen` over the signal CTA so the
  // orange survives, but composite normally over dark/transparent variants.
  const dataVariant = { "data-variant": variant };

  return (
    <span className="inline-flex flex-col items-start gap-2 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-signal">
      {href && !disabled ? (
        isInternal ? (
          <Link href={href} className={classes} style={style} {...dataVariant} {...aria}>
            {inner}
          </Link>
        ) : (
          <a href={href} className={classes} style={style} {...dataVariant} {...aria}>
            {inner}
          </a>
        )
      ) : (
        <button
          type="button"
          className={classes}
          style={style}
          onClick={onClick}
          disabled={disabled}
          aria-disabled={disabled || undefined}
          aria-busy={busy || undefined}
          {...dataVariant}
          {...aria}
        >
          {inner}
        </button>
      )}
      {disabled && disabledReason ? (
        <span role="note" className="caption">
          {disabledReason}
        </span>
      ) : null}
    </span>
  );
}
