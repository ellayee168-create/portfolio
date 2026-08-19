"use client";

import { useState } from "react";
import { Dna, Laptop } from "lucide-react";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import type { Entry } from "../data/experience";

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
