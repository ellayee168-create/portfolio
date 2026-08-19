"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dna, Laptop, X } from "lucide-react";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import type { Entry } from "../data/experience";
import { CLUSTER_BY_ID, isClusterId } from "../data/clusters";

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
  const router = useRouter();
  const params = useSearchParams();

  const areaParam = params.get("area");
  const area = isClusterId(areaParam) ? areaParam : null;

  // An area arrives from clicking a cluster in the hero embedding. It cuts
  // across both tabs, so it replaces them rather than filtering within one.
  if (area) {
    const cluster = CLUSTER_BY_ID[area];
    const matches = [...research, ...projects].filter((e) => e.cluster === area);

    return (
      <>
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span
            className="label inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-white"
            style={{ background: cluster.hex }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            {cluster.label} · {matches.length}
          </span>
          <button
            type="button"
            onClick={() => router.push("/research")}
            className="label inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
          >
            <X size={13} /> show everything
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {matches.map((entry, i) => (
            <Reveal key={entry.title + entry.period} delay={i * 0.05}>
              <ProjectCard entry={entry} />
            </Reveal>
          ))}
        </div>
      </>
    );
  }

  const entries = tab === "research" ? research : projects;

  return (
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
              aria-controls="entries"
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

      <div id="entries" role="tabpanel" className="grid gap-5 md:grid-cols-2">
        {entries.map((entry, i) => (
          <Reveal key={entry.title + entry.period} delay={i * 0.05}>
            <ProjectCard entry={entry} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
