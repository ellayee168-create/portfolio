"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dna, Laptop, X } from "lucide-react";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import Trajectory from "./Trajectory";
import type { Entry } from "../data/experience";
import { CLUSTER_BY_ID, isClusterId } from "../data/clusters";
import { slug } from "../lib/slug";

const TABS = [
  { id: "research", label: "Research & Industry", Icon: Dna },
  { id: "projects", label: "Independent Projects", Icon: Laptop },
] as const;

export default function ExperienceTabs({
  research,
  projects,
}: {
  research: Entry[];
  projects: Entry[];
}) {
  const [tab, setTab] = useState<"research" | "projects">("research");
  const [highlight, setHighlight] = useState<string | null>(null);
  const pending = useRef<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();

  const areaParam = params.get("area");
  const area = isClusterId(areaParam) ? areaParam : null;

  /**
   * Scrolling has to wait until the target card is actually mounted — picking a
   * project from the trajectory can change the tab or clear the area filter
   * first, so the scroll runs from an effect rather than the click handler.
   */
  useEffect(() => {
    if (!pending.current) return;
    const el = document.getElementById(pending.current);
    if (!el) return;
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    setHighlight(pending.current);
    pending.current = null;
    const t = setTimeout(() => setHighlight(null), 1800);
    return () => clearTimeout(t);
  }, [tab, area]);

  const handleSelect = useCallback(
    (entry: Entry) => {
      const id = slug(entry.title);
      pending.current = id;
      const inResearch = research.some((e) => e.title === entry.title);
      setTab(inResearch ? "research" : "projects");
      if (area && entry.cluster !== area) router.push("/research");
      else {
        // Same render pass won't have the card yet if the tab just changed.
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el && pending.current === id) {
            el.scrollIntoView({ block: "center", behavior: "smooth" });
            setHighlight(id);
            pending.current = null;
            setTimeout(() => setHighlight(null), 1800);
          }
        });
      }
    },
    [research, area, router],
  );

  const all = [...research, ...projects];

  const grid = (entries: Entry[]) => (
    <div className="grid gap-5 md:grid-cols-2">
      {entries.map((entry, i) => {
        const id = slug(entry.title);
        return (
          <Reveal key={entry.title + entry.period} delay={i * 0.05}>
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
  );

  return (
    <>
      <Trajectory entries={all} onSelect={handleSelect} />

      {area ? (
        <>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span
              className="label inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-white"
              style={{ background: CLUSTER_BY_ID[area].hex }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              {CLUSTER_BY_ID[area].label} ·{" "}
              {all.filter((e) => e.cluster === area).length}
            </span>
            <button
              type="button"
              onClick={() => router.push("/research")}
              className="label inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
            >
              <X size={13} /> show everything
            </button>
          </div>
          {grid(all.filter((e) => e.cluster === area))}
        </>
      ) : (
        <>
          <div role="tablist" className="mb-8 flex flex-wrap gap-2">
            {TABS.map(({ id, label, Icon }) => {
              const selected = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setTab(id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors ${
                    selected
                      ? "bg-accent text-white"
                      : "border border-line bg-raised text-muted hover:border-accent/40 hover:text-accent"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              );
            })}
          </div>
          {grid(tab === "research" ? research : projects)}
        </>
      )}
    </>
  );
}
