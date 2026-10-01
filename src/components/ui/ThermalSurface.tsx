"use client";

import { useEffect, useRef } from "react";

/**
 * Thermal hover surface — a heat field that blooms under the cursor.
 *
 * Ported from the "Hover Buttons — Part 5" reference implementation
 * (`.btn-heat` markup + the `HeatButton` class), adapted to this codebase:
 *
 * - The field is painted with a lime-family ramp (deep forest → moss → signal
 *   lime → chartreuse → white-hot) rather than the reference's literal infrared
 *   purple→red→orange. The reference mid-tones are reds and oranges, which sit
 *   opposite lime on the wheel and made the control look broken mid-hover. The
 *   ramp stays monotonic in luminance, so it still reads as rising heat.
 * - Diffusion/injection constants and the half-resolution grid (RES = 2) are
 *   unchanged, so the heat behaves as it does in the source.
 * - The original ran an unconditional requestAnimationFrame loop per button,
 *   forever. With ~30 buttons on a page that is real CPU spent on an effect
 *   nobody is looking at, so this loop is gated: it starts on hover/focus and
 *   stops as soon as the field has cooled below the idle threshold.
 * - Cleanup is explicit (the original leaked its ResizeObserver).
 * - `prefers-reduced-motion` disables the field entirely; the control still
 *   renders as a normal button, so nothing looks broken.
 */

/**
 * [stop, r, g, b, a] — the ramp the heat field is painted with.
 *
 * The reference used a literal infrared ramp (purple → red → orange → white).
 * With the accent moved to lime, that ramp fights the brand: the mid-tones are
 * saturated reds and oranges, which sit directly opposite lime on the wheel and
 * make the control look broken mid-hover.
 *
 * This ramp keeps the same perceptual job — cool/low-energy to hot/white-hot,
 * monotonic in luminance so the field still reads as rising heat — but travels
 * through the lime family instead: deep forest → moss → signal lime → chartreuse
 * → white-hot. The core animation is untouched; only the colourway changed.
 */
const STOPS: Array<readonly [number, number, number, number, number]> = [
  [0.0, 6, 20, 10, 0],
  [0.18, 22, 58, 26, 70],
  [0.4, 74, 132, 34, 150],
  [0.62, 150, 205, 46, 210],
  [0.82, 198, 239, 52, 240],
  [1.0, 250, 255, 224, 255],
];

/** Simulate at half resolution — the field is low-frequency, so this is free. */
const RES = 2;
/** Injection radius in grid cells. */
const RADIUS = 7;
/** Below this total energy the field is visually still; stop drawing. */
const IDLE_GATE = 0.5;
/** Touch taps have no hover, so the bloom is retired on a timer instead. */
const TOUCH_MS = 1400;

function buildPalette(): Uint8ClampedArray {
  const pal = new Uint8ClampedArray(256 * 4);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let a = STOPS[0]!;
    let b = STOPS[STOPS.length - 1]!;
    for (let k = 0; k < STOPS.length - 1; k++) {
      const lo = STOPS[k]!;
      const hi = STOPS[k + 1]!;
      if (t >= lo[0] && t <= hi[0]) {
        a = lo;
        b = hi;
        break;
      }
    }
    const f = (t - a[0]) / (b[0] - a[0] || 1);
    pal[i * 4] = a[1] + (b[1] - a[1]) * f;
    pal[i * 4 + 1] = a[2] + (b[2] - a[2]) * f;
    pal[i * 4 + 2] = a[3] + (b[3] - a[3]) * f;
    pal[i * 4 + 3] = a[4] + (b[4] - a[4]) * f;
  }
  return pal;
}

const PALETTE = buildPalette();

/**
 * Renders a decorative canvas as the first child of its parent control. All
 * pointer wiring is done imperatively against `parentElement`, which lets the
 * `Button` primitive itself stay a server component.
 */
export function ThermalSurface() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Offscreen logical-pixel buffer so per-pixel ImageData stays crisp.
    const buffer = document.createElement("canvas");
    const bufferCtx = buffer.getContext("2d");
    if (!bufferCtx) return;

    let w = 0;
    let h = 0;
    let gw = 0;
    let gh = 0;
    let heat = new Float32Array(0);
    let scratch = new Float32Array(0);
    let image: ImageData | null = null;

    const resize = () => {
      const cw = host.clientWidth;
      const ch = host.clientHeight;
      if (!cw || !ch) return;
      w = cw;
      h = ch;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buffer.width = cw;
      buffer.height = ch;
      gw = Math.ceil(cw / RES);
      gh = Math.ceil(ch / RES);
      heat = new Float32Array(gw * gh);
      scratch = new Float32Array(gw * gh);
      image = bufferCtx.createImageData(cw, ch);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let active = false;
    let cx = -999;
    let cy = -999;
    let raf = 0;
    let running = false;
    let touchTimer: number | undefined;

    const inject = () => {
      if (cx < -100 || cy < -100) return;
      const gx = cx / RES;
      const gy = cy / RES;
      for (let dy = -RADIUS; dy <= RADIUS; dy++) {
        for (let dx = -RADIUS; dx <= RADIUS; dx++) {
          const x = Math.round(gx + dx);
          const y = Math.round(gy + dy);
          if (x < 0 || x >= gw || y < 0 || y >= gh) continue;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > RADIUS) continue;
          const i = y * gw + x;
          const current = heat[i] ?? 0;
          heat[i] = Math.min(1.15, current + (1 - d / RADIUS) * 0.35);
        }
      }
    };

    const step = () => {
      raf = 0;
      if (!w || !image || heat.length === 0) {
        running = false;
        return;
      }

      if (active) inject();

      // Diffuse + cool. Cooling is slower while hot, exactly as in the source.
      const cool = active ? 0.988 : 0.965;
      let total = 0;
      for (let y = 0; y < gh; y++) {
        const row = y * gw;
        for (let x = 0; x < gw; x++) {
          const i = row + x;
          const l = x > 0 ? heat[i - 1]! : heat[i]!;
          const r = x < gw - 1 ? heat[i + 1]! : heat[i]!;
          const u = y > 0 ? heat[i - gw]! : heat[i]!;
          const d = y < gh - 1 ? heat[i + gw]! : heat[i]!;
          const v = (heat[i]! * 0.6 + (l + r + u + d) * 0.1) * cool;
          scratch[i] = v;
          total += v;
        }
      }
      const swap = heat;
      heat = scratch;
      scratch = swap;

      if (!active && total < IDLE_GATE) {
        ctx.clearRect(0, 0, w, h);
        running = false;
        return;
      }

      // Paint the coarse grid through the palette at full canvas resolution.
      const data = image.data;
      for (let y = 0; y < h; y++) {
        const grow = Math.min(gh - 1, (y / RES) | 0) * gw;
        const row = y * w;
        for (let x = 0; x < w; x++) {
          const gx = Math.min(gw - 1, (x / RES) | 0);
          let v = heat[grow + gx]!;
          if (v > 1) v = 1;
          const pi = ((v * 255) | 0) * 4;
          const j = (row + x) * 4;
          data[j] = PALETTE[pi]!;
          data[j + 1] = PALETTE[pi + 1]!;
          data[j + 2] = PALETTE[pi + 2]!;
          data[j + 3] = PALETTE[pi + 3]!;
        }
      }
      bufferCtx.putImageData(image, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(buffer, 0, 0);

      raf = requestAnimationFrame(step);
    };

    const run = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(step);
    };

    const activate = () => {
      active = true;
      host.classList.add("is-active");
      run();
    };
    const deactivate = () => {
      active = false;
      host.classList.remove("is-active");
      // Let the field cool out rather than cutting it dead.
      run();
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      cx = e.clientX - rect.left;
      cy = e.clientY - rect.top;
    };
    const onEnter = (e: PointerEvent) => {
      window.clearTimeout(touchTimer);
      onMove(e);
      activate();
    };
    const onLeave = () => {
      // Keep the field warm while the control still holds keyboard focus.
      if (host.ownerDocument?.activeElement === host) return;
      deactivate();
    };
    const onDown = (e: PointerEvent) => {
      onMove(e);
      activate();
      if (e.pointerType !== "mouse") {
        window.clearTimeout(touchTimer);
        touchTimer = window.setTimeout(deactivate, TOUCH_MS);
      }
    };
    const onFocus = () => activate();
    const onBlur = () => deactivate();

    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("focus", onFocus);
    host.addEventListener("blur", onBlur);

    return () => {
      window.clearTimeout(touchTimer);
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("focus", onFocus);
      host.removeEventListener("blur", onBlur);
      host.classList.remove("is-active");
    };
  }, []);

  return <canvas ref={canvasRef} className="btn-thermal__canvas" aria-hidden="true" />;
}
