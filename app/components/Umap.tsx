"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ASPECT,
  generateEmbedding,
  neighbourEdges,
  projectCount,
} from "../lib/embedding";
import { CLUSTERS, CLUSTER_BY_ID, type ClusterId } from "../data/clusters";
import { useEmbedding } from "./EmbeddingContext";

type Rendered = {
  fromX: number; fromY: number;
  toX: number; toY: number;
  curX: number; curY: number;
  r: number; phase: number; c: ClusterId;
};

const TRANSITION_MS = 900;
const HOVER_RADIUS = 0.085;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Umap() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Rendered[]>([]);
  const edgesRef = useRef<[number, number][]>([]);
  const progressRef = useRef(1);
  const activeRef = useRef<ClusterId | null>(null);
  const renderRef = useRef<((now: number) => void) | null>(null);
  const [active, setActive] = useState<ClusterId | null>(null);
  const { seed, generation } = useEmbedding();
  const router = useRouter();

  useEffect(() => {
    if (active) router.prefetch(CLUSTER_BY_ID[active].href);
  }, [active, router]);

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
    edgesRef.current = neighbourEdges(next, 2);
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
    let h = canvas.getBoundingClientRect().height;
    let w = canvas.getBoundingClientRect().width;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
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

      ctx.clearRect(0, 0, w, h);

      // Uniform scale, centred: clusters keep their shape at any box size.
      const s = Math.min(h, w / ASPECT);
      const ox = (w - s * ASPECT) / 2;
      const oy = (h - s) / 2;
      const px = (x: number) => ox + x * s;
      const py = (y: number) => oy + y * s;

      const pts = pointsRef.current;
      const activeId = activeRef.current;

      for (const p of pts) {
        const bx = p.fromX + (p.toX - p.fromX) * k;
        const by = p.fromY + (p.toY - p.fromY) * k;
        const drift = reduce ? 0 : 0.005;
        p.curX = bx + Math.sin(t * 0.35 + p.phase) * drift;
        p.curY = by + Math.cos(t * 0.28 + p.phase * 1.3) * drift;
      }

      // A UMAP is a neighbour graph first; hovering shows the edges behind it.
      if (activeId && progressRef.current === 1) {
        ctx.strokeStyle = CLUSTER_BY_ID[activeId].hex;
        ctx.globalAlpha = 0.16;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        for (const [i, j] of edgesRef.current) {
          const a = pts[i];
          const b = pts[j];
          if (!a || !b || a.c !== activeId) continue;
          ctx.moveTo(px(a.curX), py(a.curY));
          ctx.lineTo(px(b.curX), py(b.curY));
        }
        ctx.stroke();
      }

      for (const p of pts) {
        const dim = activeId !== null && p.c !== activeId;
        ctx.globalAlpha = dim ? 0.1 : activeId === p.c ? 0.95 : 0.6;
        ctx.fillStyle = CLUSTER_BY_ID[p.c].hex;
        ctx.beginPath();
        ctx.arc(px(p.curX), py(p.curY), p.r * (s / 210), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Label the hovered cluster in place, at its centroid.
      if (activeId) {
        let sx = 0;
        let sy = 0;
        let n = 0;
        for (const p of pts) {
          if (p.c !== activeId) continue;
          sx += p.curX;
          sy += p.curY;
          n++;
        }
        if (n) {
          const label = CLUSTER_BY_ID[activeId].label;
          ctx.font = `600 ${Math.max(11, s * 0.035)}px ui-monospace, monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const cx = px(sx / n);
          const cy = py(sy / n);
          const tw = ctx.measureText(label).width;
          ctx.fillStyle = "rgba(250,247,242,0.88)";
          ctx.beginPath();
          ctx.roundRect(cx - tw / 2 - 8, cy - 12, tw + 16, 24, 12);
          ctx.fill();
          ctx.fillStyle = CLUSTER_BY_ID[activeId].hex;
          ctx.fillText(label, cx, cy);
        }
      }
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

  /** Resolved here, not in the animation loop, so hover survives rAF throttling. */
  const handleMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const s = Math.min(rect.height, rect.width / ASPECT);
    const ox = (rect.width - s * ASPECT) / 2;
    const oy = (rect.height - s) / 2;
    const mx = (e.clientX - rect.left - ox) / s;
    const my = (e.clientY - rect.top - oy) / s;

    let nearest: ClusterId | null = null;
    let nearestDist = HOVER_RADIUS;
    for (const p of pointsRef.current) {
      const d = Math.hypot(p.curX - mx, p.curY - my);
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

  const handleLeave = useCallback(() => {
    if (activeRef.current !== null) {
      activeRef.current = null;
      setActive(null);
      renderRef.current?.(performance.now());
    }
  }, []);

  const handleClick = useCallback(() => {
    const id = activeRef.current;
    if (id) router.push(CLUSTER_BY_ID[id].href);
  }, [router]);

  const setCluster = (id: ClusterId | null) => {
    activeRef.current = id;
    setActive(id);
    renderRef.current?.(performance.now());
  };

  const activeCluster = active ? CLUSTER_BY_ID[active] : null;

  return (
    <figure className="w-full">
      <canvas
        ref={canvasRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        onClick={handleClick}
        className={`aspect-[7/4] w-full touch-none ${active ? "cursor-pointer" : ""}`}
        role="img"
        aria-label="An interactive embedding of Ella's areas of work, clustered by field."
      />

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
        {CLUSTERS.map((c) => {
          const n = projectCount(c.id);
          return (
            <Link
              key={c.id}
              href={c.href}
              onMouseEnter={() => setCluster(c.id)}
              onMouseLeave={() => setCluster(null)}
              className={`label flex items-center gap-1.5 transition-colors ${
                active === c.id ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: c.hex }}
              />
              {c.label}
              <span className="text-faint">
                {n} {n === 1 ? "project" : "projects"}
              </span>
            </Link>
          );
        })}
      </div>

      <figcaption className="label mt-3 min-h-5 text-faint">
        {activeCluster ? (
          <span>
            {activeCluster.label} · click to open{" "}
            {projectCount(activeCluster.id) === 1 ? "the project" : "these projects"}
          </span>
        ) : (
          <span>
            hover a cluster to see its neighbour graph · press{" "}
            <span className="text-accent">e</span> to re-run the embedding
          </span>
        )}
      </figcaption>
    </figure>
  );
}
