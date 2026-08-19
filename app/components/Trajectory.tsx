"use client";

import { useState } from "react";
import type { Entry } from "../data/experience";
import { CLUSTER_BY_ID } from "../data/clusters";

/**
 * Pseudotime layout of the work: two lineages — computational and wet lab —
 * that run in parallel and converge at the Abate-Shen lab, where the analysis
 * and the bench work were the same project. Everything after sits on the
 * merged trunk.
 */
const T0 = 2020.35;
const T1 = 2026.9;
const W = 200;

const LANE_Y = { computational: 14, merged: 32, wet: 50 } as const;
const MERGE_T = 2024.7; // Abate-Shen — where the two lineages meet

const x = (t: number) => ((t - T0) / (T1 - T0)) * W;
const YEARS = [2021, 2022, 2023, 2024, 2025, 2026];

export default function Trajectory({
  entries,
  onSelect,
}: {
  entries: Entry[];
  onSelect: (entry: Entry) => void;
}) {
  const [hovered, setHovered] = useState<Entry | null>(null);

  const xm = x(MERGE_T);

  return (
    <figure className="mb-6">
      <div className="overflow-hidden rounded-xl border border-line bg-raised p-4 sm:p-6">
        <svg
          viewBox={`-4 0 ${W + 8} 66`}
          className="h-auto w-full"
          role="group"
          aria-label="Pseudotime trajectory of Ella's research, from independent projects to computational and wet-lab work converging"
        >
          {/* year gridlines */}
          {YEARS.map((y) => (
            <g key={y}>
              <line
                x1={x(y)} x2={x(y)} y1={4} y2={58}
                className="stroke-line" strokeWidth={0.4}
              />
              <text
                x={x(y)} y={64}
                textAnchor="middle"
                className="fill-faint font-mono"
                fontSize={3.2}
                letterSpacing={0.2}
              >
                {y}
              </text>
            </g>
          ))}

          {/* lineage spines */}
          <path
            d={`M ${x(2020.55)} ${LANE_Y.computational} L ${x(2024.5)} ${LANE_Y.computational} C ${xm - 4} ${LANE_Y.computational} ${xm - 4} ${LANE_Y.merged} ${xm} ${LANE_Y.merged}`}
            className="fill-none stroke-ink/15"
            strokeWidth={0.8}
          />
          <path
            d={`M ${x(2023.4)} ${LANE_Y.wet} L ${x(2024.5)} ${LANE_Y.wet} C ${xm - 4} ${LANE_Y.wet} ${xm - 4} ${LANE_Y.merged} ${xm} ${LANE_Y.merged}`}
            className="fill-none stroke-ink/15"
            strokeWidth={0.8}
          />
          <path
            d={`M ${xm} ${LANE_Y.merged} L ${x(T1 - 0.1)} ${LANE_Y.merged}`}
            className="fill-none stroke-ink/15"
            strokeWidth={0.8}
          />

          {/* spur to the concurrent industry stint */}
          <path
            d={`M ${x(2026.2)} ${LANE_Y.merged} C ${x(2026.32)} ${LANE_Y.merged} ${x(2026.28)} ${LANE_Y.merged - 9} ${x(2026.35)} ${LANE_Y.merged - 9}`}
            className="fill-none stroke-ink/15"
            strokeWidth={0.8}
          />

          {/* lane labels */}
          <text
            x={x(2020.5)} y={LANE_Y.computational - 4}
            className="fill-faint font-mono" fontSize={3} letterSpacing={0.2}
          >
            computational
          </text>
          <text
            x={x(2023.35)} y={LANE_Y.wet + 7}
            className="fill-faint font-mono" fontSize={3} letterSpacing={0.2}
          >
            wet lab
          </text>
          <text
            x={xm + 2} y={LANE_Y.merged - 5}
            className="fill-faint font-mono" fontSize={3} letterSpacing={0.2}
          >
            converged
          </text>

          {/* one capsule per project */}
          {entries.map((entry) => {
            if (!entry.track) return null;
            const { start, end, lane, dy = 0 } = entry.track;
            const y = LANE_Y[lane] + dy;
            const hex = CLUSTER_BY_ID[entry.cluster].hex;
            const on = hovered === null || hovered === entry;
            const x0 = x(start);
            const x1 = x(end);
            return (
              <g
                key={entry.title}
                onMouseEnter={() => setHovered(entry)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelect(entry)}
                className="cursor-pointer"
                style={{ opacity: on ? 1 : 0.25, transition: "opacity 160ms ease" }}
              >
                {/* generous invisible hit area */}
                <rect x={x0 - 2} y={y - 5} width={x1 - x0 + 4} height={10} fill="transparent" />
                <rect
                  x={x0} y={y - 1.6}
                  width={Math.max(x1 - x0, 1.6)} height={3.2}
                  rx={1.6}
                  fill={hex}
                  fillOpacity={hovered === entry ? 0.95 : 0.55}
                />
                <circle cx={x1} cy={y} r={hovered === entry ? 2.6 : 2} fill={hex} />
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption className="label mt-3 flex min-h-5 items-center gap-2 text-faint">
        {hovered ? (
          <>
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full"
              style={{ background: CLUSTER_BY_ID[hovered.cluster].hex }}
            />
            <span className="text-ink">{hovered.org}</span>
            <span>· {hovered.period}</span>
          </>
        ) : (
          <span>
            Each bar above represents an academic, industry, or independent
            project — click one to learn more!
          </span>
        )}
      </figcaption>
    </figure>
  );
}
