"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cafes, metros, type Cafe, type MetroId } from "../data/beyond";
import { CLUSTER_BY_ID, type ClusterId } from "../data/clusters";

/**
 * Equirectangular chart framed to the span of Ella's cafés — Pacific-centred,
 * northern band. Not true-to-aspect: the window is stretched to 2:1 so the four
 * metros read clearly at portfolio size.
 */
const LON_MIN = -140;
const LON_MAX = 140;
const LAT_MIN = 10;
const LAT_MAX = 55;
const W = 200;
const H = 100;

const px = (lon: number) => ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W;
const py = (lat: number) => ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;

const LON_LINES = [-120, -60, 0, 60, 120];
const LAT_LINES = [20, 30, 40, 50];

function metroHex(cluster: string) {
  return CLUSTER_BY_ID[cluster as ClusterId].hex;
}

function CafeCard({ cafe }: { cafe: Cafe }) {
  const metro = metros.find((m) => m.id === cafe.metro)!;
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-raised">
      <div className="relative aspect-[4/5] w-full bg-accent-wash">
        <Image
          src={cafe.photo}
          alt={`${cafe.name}, ${cafe.city}`}
          fill
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-base leading-snug tracking-tight">
          {cafe.name}
        </h3>
        <p className="label mt-1.5 flex items-center gap-1.5 text-faint">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: metroHex(metro.cluster) }}
          />
          {cafe.city}
        </p>
        {cafe.note && (
          <p className="mt-2 text-sm leading-relaxed text-muted">{cafe.note}</p>
        )}
      </div>
    </article>
  );
}

export default function CafeMap() {
  const [filter, setFilter] = useState<MetroId | null>(null);
  const [hovered, setHovered] = useState<MetroId | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const cafe of cafes) c[cafe.metro] = (c[cafe.metro] ?? 0) + 1;
    return c;
  }, []);

  const shown = filter ? cafes.filter((c) => c.metro === filter) : cafes;
  const highlighted = hovered ?? filter;

  return (
    <div>
      {/* ------------------------------------------------------------- Chart */}
      <div className="overflow-hidden rounded-xl border border-line bg-raised p-4 sm:p-6">
        <svg
          viewBox={`-16 -6 ${W + 24} ${H + 20}`}
          className="h-auto w-full"
          role="group"
          aria-label="World map of cafés, grouped by region"
        >
          {/* graticule */}
          {LON_LINES.map((lon) => (
            <line
              key={`lon-${lon}`}
              x1={px(lon)} x2={px(lon)} y1={0} y2={H}
              className="stroke-line" strokeWidth={0.4}
            />
          ))}
          {LAT_LINES.map((lat) => (
            <line
              key={`lat-${lat}`}
              x1={0} x2={W} y1={py(lat)} y2={py(lat)}
              className="stroke-line" strokeWidth={0.4}
            />
          ))}
          <rect
            x={0} y={0} width={W} height={H}
            className="fill-none stroke-line" strokeWidth={0.7}
          />

          {/* axis ticks */}
          {LON_LINES.map((lon) => (
            <text
              key={`lonlabel-${lon}`}
              x={px(lon)} y={H + 8}
              textAnchor="middle"
              className="fill-faint font-mono"
              fontSize={3.6}
              letterSpacing={0.2}
            >
              {lon === 0 ? "0°" : `${Math.abs(lon)}°${lon < 0 ? "W" : "E"}`}
            </text>
          ))}
          {LAT_LINES.map((lat) => (
            <text
              key={`latlabel-${lat}`}
              x={-2} y={py(lat) + 1.3}
              textAnchor="end"
              className="fill-faint font-mono"
              fontSize={3.6}
              letterSpacing={0.2}
            >
              {lat}°N
            </text>
          ))}

          {/* metro pins */}
          {metros.map((metro) => {
            const x = px(metro.lon);
            const y = py(metro.lat);
            const hex = metroHex(metro.cluster);
            const on = highlighted === null || highlighted === metro.id;
            const n = counts[metro.id] ?? 0;
            return (
              <g
                key={metro.id}
                onMouseEnter={() => setHovered(metro.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setFilter(filter === metro.id ? null : metro.id)}
                className="cursor-pointer"
                style={{ opacity: on ? 1 : 0.28, transition: "opacity 180ms ease" }}
              >
                <circle cx={x} cy={y} r={7} className="fill-transparent" />
                <circle
                  cx={x} cy={y} r={2 + n * 0.5}
                  fill={hex} fillOpacity={0.22}
                />
                <circle cx={x} cy={y} r={1.8} fill={hex} />
                <text
                  x={x} y={y - 5}
                  textAnchor="middle"
                  fill={hex}
                  className="font-mono"
                  fontSize={4.2}
                  letterSpacing={0.25}
                >
                  {metro.label.toLowerCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ------------------------------------------------------------ Filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter(null)}
          aria-pressed={filter === null}
          className={`label rounded-full px-3 py-1.5 transition-colors ${
            filter === null
              ? "bg-accent text-white"
              : "border border-line text-muted hover:border-accent/40 hover:text-accent"
          }`}
        >
          all · {cafes.length}
        </button>
        {metros.map((metro) => {
          const on = filter === metro.id;
          return (
            <button
              key={metro.id}
              type="button"
              onClick={() => setFilter(on ? null : metro.id)}
              onMouseEnter={() => setHovered(metro.id)}
              onMouseLeave={() => setHovered(null)}
              aria-pressed={on}
              className={`label inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
                on
                  ? "text-white"
                  : "border border-line text-muted hover:border-accent/40"
              }`}
              style={on ? { background: metroHex(metro.cluster) } : undefined}
            >
              {!on && (
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: metroHex(metro.cluster) }}
                />
              )}
              {metro.label} · {counts[metro.id] ?? 0}
            </button>
          );
        })}
      </div>

      {/* -------------------------------------------------------------- Grid */}
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((cafe) => (
          <li key={cafe.name}>
            <CafeCard cafe={cafe} />
          </li>
        ))}
      </ul>
    </div>
  );
}
