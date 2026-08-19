"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { cafes, metros, type Cafe, type MetroId } from "../data/beyond";
import { LAND, MAP_H, MAP_W, project } from "../data/worldMap";
import { CLUSTER_BY_ID, type ClusterId } from "../data/clusters";

type Box = { x: number; y: number; w: number; h: number };

/** Trimmed to inhabited latitudes — no reason to show Antarctica. */
const HOME: Box = { x: 0, y: 40, w: MAP_W, h: 320 };
// The 110m coastline turns polygonal past roughly this zoom, so the map stops
// here rather than pretending to street-level detail it does not have.
const MIN_W = 20;

const metroHex = (cluster: string) => CLUSTER_BY_ID[cluster as ClusterId].hex;

/** Cafés grouped by city, since a city is one point on a map. */
function useCities() {
  return useMemo(() => {
    const by = new Map<string, { city: string; metro: MetroId; lat: number; lon: number; list: Cafe[] }>();
    for (const cafe of cafes) {
      const key = `${cafe.city}|${cafe.metro}`;
      const found = by.get(key);
      if (found) found.list.push(cafe);
      else by.set(key, { city: cafe.city, metro: cafe.metro, lat: cafe.lat, lon: cafe.lon, list: [cafe] });
    }
    return [...by.values()];
  }, []);
}

type Pin = {
  key: string;
  label: string;
  lat: number;
  lon: number;
  metro: MetroId;
  count: number;
};

/**
 * Nudges labels apart when their pins sit close together — at region zoom the
 * South Bay cities are only a few map units apart and would otherwise stack.
 */
function placeLabels(pins: Pin[], scale: number): (Pin & { labelDy: number })[] {
  const placed: { x: number; y: number; dy: number }[] = [];
  return pins
    .map((p) => ({ p, xy: project(p.lon, p.lat) }))
    .sort((a, b) => a.xy[1] - b.xy[1])
    .map(({ p, xy }) => {
      const [x, y] = xy;
      let dy = 0;
      // gap and proximity are in screen units, so they hold at any zoom
      const gap = 13 / scale;
      const near = 90 / scale;
      for (const q of placed) {
        if (Math.abs(q.x - x) > near) continue;
        if (Math.abs(y - q.y - (dy - q.dy) * -1) < gap) dy += gap * scale;
      }
      placed.push({ x, y, dy });
      return { ...p, labelDy: dy };
    });
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
        <h3 className="font-display text-base leading-snug tracking-tight">{cafe.name}</h3>
        <p className="label mt-1.5 flex items-center gap-1.5 text-faint">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: metroHex(metro.cluster) }} />
          {cafe.city}
        </p>
        {cafe.note && <p className="mt-2 text-sm leading-relaxed text-muted">{cafe.note}</p>}
      </div>
    </article>
  );
}

export default function CafeMap() {
  const cities = useCities();
  const [box, setBox] = useState<Box>(HOME);
  const [filter, setFilter] = useState<MetroId | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const drag = useRef<{ x: number; y: number; box: Box } | null>(null);

  const scale = MAP_W / box.w; // pins keep their pixel size as you zoom
  const clustered = box.w > 260;
  const shown = filter ? cafes.filter((c) => c.metro === filter) : cafes;

  const clamp = useCallback((b: Box): Box => {
    const w = Math.min(MAP_W, Math.max(MIN_W, b.w));
    const h = (w * HOME.h) / HOME.w;
    return {
      w,
      h,
      x: Math.min(MAP_W - w, Math.max(0, b.x)),
      y: Math.min(MAP_H - h, Math.max(0, b.y)),
    };
  }, []);

  /** Zoom about a point so the map moves under the cursor, not under the corner. */
  const zoomAt = useCallback(
    (factor: number, ax: number, ay: number) => {
      setBox((b) => {
        const w = Math.min(MAP_W, Math.max(MIN_W, b.w * factor));
        const k = w / b.w;
        return clamp({ x: ax - (ax - b.x) * k, y: ay - (ay - b.y) * k, w, h: b.h * k });
      });
    },
    [clamp],
  );

  const toMap = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    return {
      x: box.x + ((clientX - r.left) / r.width) * box.w,
      y: box.y + ((clientY - r.top) / r.height) * box.h,
    };
  }, [box]);

  const onWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    const p = toMap(e.clientX, e.clientY);
    if (!p) return;
    zoomAt(e.deltaY > 0 ? 1.18 : 1 / 1.18, p.x, p.y);
  };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, box };
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d) return;
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const dx = ((e.clientX - d.x) / r.width) * d.box.w;
    const dy = ((e.clientY - d.y) / r.height) * d.box.h;
    setBox(clamp({ ...d.box, x: d.box.x - dx, y: d.box.y - dy }));
  };

  const endDrag = () => {
    drag.current = null;
  };

  const flyTo = useCallback(
    (lon: number, lat: number, w: number) => {
      const [px, py] = project(lon, lat);
      const h = (w * HOME.h) / HOME.w;
      setBox(clamp({ x: px - w / 2, y: py - h / 2, w, h }));
    },
    [clamp],
  );

  /* Zoomed out, one pin per region; zoomed in, the cities separate.
     Labelling every Bay Area city at world scale is unreadable. */
  const pins = useMemo(() => {
    const base: Pin[] = clustered
      ? metros.map((m) => ({
          key: m.id,
          label: m.label,
          lat: m.lat,
          lon: m.lon,
          metro: m.id as MetroId,
          count: cafes.filter((c) => c.metro === m.id).length,
        }))
      : cities.map((c) => ({
          key: c.city,
          label: c.city,
          lat: c.lat,
          lon: c.lon,
          metro: c.metro,
          count: c.list.length,
        }));
    return placeLabels(base, scale);
  }, [clustered, cities, scale]);

  const hoveredPin = hovered
    ? clustered
      ? (() => {
          const m = metros.find((x) => x.id === hovered);
          return m ? { label: m.label, n: cafes.filter((c) => c.metro === m.id).length } : null;
        })()
      : (() => {
          const c = cities.find((x) => x.city === hovered);
          return c ? { label: c.city, n: c.list.length } : null;
        })()
    : null;

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-line bg-raised">
        <svg
          ref={svgRef}
          viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
          className="block h-auto w-full cursor-grab touch-none active:cursor-grabbing"
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          role="group"
          aria-label="World map of cafés Ella has visited. Scroll to zoom, drag to pan."
        >
          <path d={LAND} className="fill-accent/[0.07] stroke-line" strokeWidth={0.5 / scale} />

          {pins.map((pin) => {
            const [px, py] = project(pin.lon, pin.lat);
            const hex = metroHex(metros.find((m) => m.id === pin.metro)!.cluster);
            const dimmed = filter !== null && filter !== pin.metro;
            const isHovered = hovered === pin.key;
            const r = (3 + Math.min(pin.count, 6) * 0.6) / scale;
            return (
              <g
                key={pin.key}
                onMouseEnter={() => setHovered(pin.key)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  setFilter(pin.metro);
                  flyTo(pin.lon, pin.lat, clustered ? 26 : 20);
                }}
                className="cursor-pointer"
                style={{ opacity: dimmed ? 0.25 : 1, transition: "opacity 180ms ease" }}
              >
                <circle cx={px} cy={py} r={r * 2.6} fill={hex} fillOpacity={0.14} />
                <circle cx={px} cy={py} r={isHovered ? r * 1.3 : r} fill={hex} />
                <text
                  x={px}
                  y={py - r * 3 - pin.labelDy / scale}
                  textAnchor="middle"
                  fill={hex}
                  className="pointer-events-none font-mono"
                  fontSize={9 / scale}
                  letterSpacing={0.4 / scale}
                >
                  {pin.label.toLowerCase()}
                </text>
              </g>
            );
          })}
        </svg>

        {/* zoom controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-1">
          {[
            { Icon: Plus, label: "Zoom in", act: () => zoomAt(1 / 1.4, box.x + box.w / 2, box.y + box.h / 2) },
            { Icon: Minus, label: "Zoom out", act: () => zoomAt(1.4, box.x + box.w / 2, box.y + box.h / 2) },
            { Icon: RotateCcw, label: "Reset view", act: () => { setBox(HOME); setFilter(null); } },
          ].map(({ Icon, label, act }) => (
            <button
              key={label}
              type="button"
              onClick={act}
              aria-label={label}
              className="rounded-md border border-line bg-paper/90 p-1.5 text-muted backdrop-blur transition-colors hover:text-accent"
            >
              <Icon size={14} />
            </button>
          ))}
        </div>

      </div>

      {/* Below the map rather than over it: at phone width an overlay collides
          with the zoom controls. */}
      <p className="label mt-3 min-h-4 text-faint">
        {hoveredPin
          ? `${hoveredPin.label.toLowerCase()} · ${hoveredPin.n} ${hoveredPin.n === 1 ? "café" : "cafés"}`
          : "drag to pan · scroll or pinch to zoom · click a pin"}
      </p>

      {/* region filters double as fly-to shortcuts */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => { setFilter(null); setBox(HOME); }}
          aria-pressed={filter === null}
          className={`label rounded-full px-3 py-1.5 transition-colors ${
            filter === null ? "bg-accent text-white" : "border border-line text-muted hover:border-accent/40 hover:text-accent"
          }`}
        >
          all · {cafes.length}
        </button>
        {metros.map((m) => {
          const n = cafes.filter((c) => c.metro === m.id).length;
          const on = filter === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                if (on) { setFilter(null); setBox(HOME); }
                else { setFilter(m.id); flyTo(m.lon, m.lat, m.zoom); }
              }}
              aria-pressed={on}
              className={`label inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
                on ? "text-white" : "border border-line text-muted hover:border-accent/40"
              }`}
              style={on ? { background: metroHex(m.cluster) } : undefined}
            >
              {!on && <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: metroHex(m.cluster) }} />}
              {m.label} · {n}
            </button>
          );
        })}
      </div>

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
