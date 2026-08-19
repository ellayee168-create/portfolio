"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { generateEmbedding } from "../lib/embedding";
import { CLUSTERS, CLUSTER_BY_ID, type ClusterId } from "../data/clusters";
import { useEmbedding } from "./EmbeddingContext";

type Rendered = {
  fromX: number; fromY: number;
  toX: number; toY: number;
  curX: number; curY: number;
  r: number; phase: number; c: ClusterId;
};

const TRANSITION_MS = 900;
const HOVER_RADIUS = 0.075; // normalised units

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Umap() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Rendered[]>([]);
  const progressRef = useRef(1);
  const activeRef = useRef<ClusterId | null>(null);
  /** Set by the canvas effect so pointer handlers can repaint on demand. */
  const renderRef = useRef<((now: number) => void) | null>(null);
  const [active, setActive] = useState<ClusterId | null>(null);
  const { seed, generation } = useEmbedding();
  const router = useRouter();

  // Prefetch on hover so a cluster click feels immediate.
  useEffect(() => {
    if (active) router.prefetch(CLUSTER_BY_ID[active].href);
  }, [active, router]);

  // Seed change -> retarget every point and replay the transition.
  useEffect(() => {
    const next = generateEmbedding(seed);
    const prev = pointsRef.current;
    pointsRef.current = next.map((p, i) => {
      const old = prev[i];
      return {
        fromX: old ? old.curX : p.x,
        fromY: old ? old.curY : p.y,
        toX: p.x,
        toY: p.y,
        curX: old ? old.curX : p.x,
        curY: old ? old.curY : p.y,
        r: p.r,
        phase: p.phase,
        c: p.c,
      };
    });
    progressRef.current = prev.length ? 0 : 1;
  }, [seed, generation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let size = canvas.getBoundingClientRect().width;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      size = rect.width;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderRef.current?.(performance.now());
    };

    const render = (now: number) => {
      const dt = now - last;
      last = now;
      const t = now / 1000;

      if (progressRef.current < 1) {
        progressRef.current = Math.min(1, progressRef.current + dt / TRANSITION_MS);
      }
      const k = easeOutCubic(progressRef.current);

      ctx.clearRect(0, 0, size, size);

      const activeId = activeRef.current;
      for (const p of pointsRef.current) {
        const bx = p.fromX + (p.toX - p.fromX) * k;
        const by = p.fromY + (p.toY - p.fromY) * k;
        const drift = reduce ? 0 : 0.0045;
        p.curX = bx + Math.sin(t * 0.35 + p.phase) * drift;
        p.curY = by + Math.cos(t * 0.28 + p.phase * 1.3) * drift;

        const dim = activeId !== null && p.c !== activeId;
        ctx.globalAlpha = dim ? 0.12 : activeId === p.c ? 0.95 : 0.62;
        ctx.fillStyle = CLUSTER_BY_ID[p.c].hex;
        ctx.beginPath();
        ctx.arc(p.curX * size, p.curY * size, p.r * (size / 190), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    renderRef.current = render;
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const loop = (now: number) => {
      render(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      renderRef.current = null;
    };
  }, []);

  /**
   * Hover is resolved here rather than inside the animation loop, so it stays
   * responsive even when rAF is throttled (background tab, reduced motion).
   */
  const handleMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    let nearest: ClusterId | null = null;
    let nearestDist = HOVER_RADIUS;
    for (const p of pointsRef.current) {
      const d = Math.hypot(p.curX - px, p.curY - py);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = p.c;
      }
    }

    if (nearest !== activeRef.current) {
      activeRef.current = nearest;
      setActive(nearest);
      renderRef.current?.(performance.now());
    }
  }, []);

  const handleClick = useCallback(() => {
    const id = activeRef.current;
    if (id) router.push(CLUSTER_BY_ID[id].href);
  }, [router]);

  const handleLeave = useCallback(() => {
    if (activeRef.current !== null) {
      activeRef.current = null;
      setActive(null);
      renderRef.current?.(performance.now());
    }
  }, []);

  const activeCluster = active ? CLUSTER_BY_ID[active] : null;

  return (
    <figure className="relative w-full">
      <canvas
        ref={canvasRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        onClick={handleClick}
        className={`aspect-square w-full touch-none ${
          active ? "cursor-pointer" : ""
        }`}
        role="img"
        aria-label="An interactive embedding of Ella's areas of work, clustered by field."
      />

      <figcaption className="label mt-3 flex min-h-5 items-center gap-2 text-faint">
        {activeCluster ? (
          <>
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: activeCluster.hex }}
            />
            <span className="text-ink">{activeCluster.label}</span>
            <span>· {activeCluster.n} points · click to open</span>
          </>
        ) : (
          <span>
            click a cluster to see that work · press{" "}
            <span className="text-accent">e</span> to re-run the embedding
          </span>
        )}
      </figcaption>

      {/* Static legend keeps the clusters readable without a pointer. */}
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {CLUSTERS.map((c) => (
          <li key={c.id}>
            <Link
              href={c.href}
              onMouseEnter={() => {
                activeRef.current = c.id;
                setActive(c.id);
                renderRef.current?.(performance.now());
              }}
              onMouseLeave={handleLeave}
              className="label flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: c.hex }}
              />
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </figure>
  );
}
