"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import Trajectory from "./Trajectory";
import { inArea, type Entry } from "../data/experience";
import { CLUSTERS, isClusterId } from "../data/clusters";
import { slug } from "../lib/slug";

const recency = (e: Entry) => e.track?.end ?? e.sortAt ?? 0;

export default function WorkList({ entries }: { entries: Entry[] }) {
  const [highlight, setHighlight] = useState<string | null>(null);
  const pending = useRef<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();

  const areaParam = params.get("area");
  const area = isClusterId(areaParam) ? areaParam : null;

  const ordered = useMemo(
    () => [...entries].sort((a, b) => recency(b) - recency(a)),
    [entries],
  );
  const shown = area ? ordered.filter((e) => inArea(e, area)) : ordered;

  const setArea = useCallback(
    (next: string | null) => {
      router.replace(next ? `/research?area=${next}` : "/research", {
        scroll: false,
      });
    },
    [router],
  );

  /** The card may not exist until the filter clears, so scrolling runs here. */
  useEffect(() => {
    if (!pending.current) return;
    const el = document.getElementById(pending.current);
    if (!el) return;
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    setHighlight(pending.current);
    pending.current = null;
    const t = setTimeout(() => setHighlight(null), 1800);
    return () => clearTimeout(t);
  }, [area]);

  const handleSelect = useCallback(
    (entry: Entry) => {
      const id = slug(entry.title);
      pending.current = id;
      if (area && !inArea(entry, area)) {
        setArea(null);
        return;
      }
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el || pending.current !== id) return;
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        setHighlight(id);
        pending.current = null;
        setTimeout(() => setHighlight(null), 1800);
      });
    },
    [area, setArea],
  );

  return (
    <>
      <Trajectory entries={ordered} onSelect={handleSelect} />

      {/* One filter axis — the same five areas as the embedding on the home page. */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setArea(null)}
          aria-pressed={area === null}
          className={`label rounded-full px-3 py-1.5 transition-colors ${
            area === null
              ? "bg-accent text-white"
              : "border border-line text-muted hover:border-accent/40 hover:text-accent"
          }`}
        >
          all · {ordered.length}
        </button>
        {CLUSTERS.map((c) => {
          const n = ordered.filter((e) => inArea(e, c.id)).length;
          if (!n) return null;
          const on = area === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setArea(on ? null : c.id)}
              aria-pressed={on}
              className={`label inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
                on ? "text-white" : "border border-line text-muted hover:border-accent/40"
              }`}
              style={on ? { background: c.hex } : undefined}
            >
              {!on && (
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: c.hex }}
                />
              )}
              {c.label} · {n}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {shown.map((entry, i) => {
          const id = slug(entry.title);
          return (
            <Reveal key={entry.title + entry.period} delay={i * 0.04}>
              <div
                id={id}
                className={`h-full scroll-mt-24 rounded-xl transition-shadow duration-500 ${
                  highlight === id ? "ring-2 ring-accent/50" : ""
                }`}
              >
                <ProjectCard entry={entry} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
