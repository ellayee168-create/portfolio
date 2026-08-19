"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE = 'a, button, [role="tab"], input, textarea, select, canvas, summary';

/**
 * A point and its neighbourhood radius, following the pointer — the same idea
 * the rest of the site is built on. The dot tracks exactly; the ring lags,
 * which is what makes it feel like it has mass.
 *
 * Fine pointers only: on touch there is no cursor to replace, and on reduced
 * motion the ring stops lagging.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    document.documentElement.classList.add("custom-cursor");

    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
      }
      const target = e.target as Element | null;
      dot.dataset.hot = target?.closest?.(INTERACTIVE) ? "true" : "false";
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
    };

    const onDown = () => (dot.dataset.down = "true");
    const onUp = () => (dot.dataset.down = "false");

    const loop = () => {
      dot.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" data-hot="false" />;
}
