import { CLUSTERS, type ClusterId } from "../data/clusters";
import { research, projects } from "../data/experience";

/**
 * The plot is wider than it is tall, so points live in [0, ASPECT] x [0, 1]
 * and are drawn at a single uniform scale. Clusters keep their shape instead
 * of being stretched to fill the box.
 */
export const ASPECT = 1.75;

const BRIDGE_COUNT = 26;

/** How many projects actually sit in each area. */
const ENTRIES = [...research, ...projects];
export const projectCount = (id: ClusterId) =>
  ENTRIES.filter((e) => e.cluster === id).length;

/**
 * Point count is proportional to real work, so a denser cluster means more
 * projects rather than an arbitrary number picked to look nice.
 */
const pointsFor = (id: ClusterId) => 42 + 40 * projectCount(id);

export type Point = {
  x: number; // 0..ASPECT
  y: number; // 0..1
  r: number;
  c: ClusterId;
  phase: number;
};

/** Small, fast, deterministic PRNG. Same seed -> same embedding, every load. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rand: () => number) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Anchors spread across the wide box; the seed jitters them, never places them. */
const ANCHORS: Record<ClusterId, [number, number]> = {
  spatial: [0.42, 0.30],
  genomics: [1.02, 0.20],
  drug: [1.45, 0.58],
  immuno: [0.70, 0.78],
  imaging: [0.17, 0.64],
};

export function generateEmbedding(seed: number): Point[] {
  const rand = mulberry32(seed);
  const points: Point[] = [];

  for (const cluster of CLUSTERS) {
    const [ax, ay] = ANCHORS[cluster.id];
    const cx = ax + (rand() - 0.5) * 0.14;
    const cy = ay + (rand() - 0.5) * 0.11;

    const sx = 0.055 + rand() * 0.05;
    const sy = 0.035 + rand() * 0.04;
    const theta = rand() * Math.PI;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);

    const n = pointsFor(cluster.id);
    for (let i = 0; i < n; i++) {
      const gx = gaussian(rand) * sx;
      const gy = gaussian(rand) * sy;
      points.push({
        x: Math.min(ASPECT - 0.03, Math.max(0.03, cx + gx * cos - gy * sin)),
        y: Math.min(0.97, Math.max(0.03, cy + gx * sin + gy * cos)),
        r: 0.6 + rand() * 0.8,
        c: cluster.id,
        phase: rand() * Math.PI * 2,
      });
    }
  }

  // Fixed number of bridge points so the re-cluster transition can pair by index.
  let bridges = 0;
  while (bridges < BRIDGE_COUNT) {
    const a = CLUSTERS[Math.floor(rand() * CLUSTERS.length)];
    const b = CLUSTERS[Math.floor(rand() * CLUSTERS.length)];
    if (a.id === b.id) continue;
    const [ax, ay] = ANCHORS[a.id];
    const [bx, by] = ANCHORS[b.id];
    const t = 0.25 + rand() * 0.5;
    points.push({
      x: ax + (bx - ax) * t + (rand() - 0.5) * 0.06,
      y: ay + (by - ay) * t + (rand() - 0.5) * 0.05,
      r: 0.5 + rand() * 0.4,
      c: a.id,
      phase: rand() * Math.PI * 2,
    });
    bridges++;
  }

  return points;
}

/**
 * k-nearest-neighbour edges within each cluster. A UMAP is a neighbour graph
 * before it is a scatter plot, so revealing the edges on hover shows what the
 * picture is actually made of.
 */
export function neighbourEdges(points: Point[], k = 2): [number, number][] {
  const edges: [number, number][] = [];
  const seen = new Set<string>();

  for (let i = 0; i < points.length; i++) {
    const best: { j: number; d: number }[] = [];
    for (let j = 0; j < points.length; j++) {
      if (i === j || points[j].c !== points[i].c) continue;
      const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
      if (best.length < k) {
        best.push({ j, d });
        best.sort((a, b) => a.d - b.d);
      } else if (d < best[k - 1].d) {
        best[k - 1] = { j, d };
        best.sort((a, b) => a.d - b.d);
      }
    }
    for (const { j } of best) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([i, j]);
    }
  }
  return edges;
}

/**
 * The 1D marginal of the same space, used by the section dividers — derived
 * from the embedding itself, so the dividers really are a projection of it.
 */
export function marginalRug(seed: number, n = 64): { x: number; c: ClusterId }[] {
  const points = generateEmbedding(seed);
  const rand = mulberry32(seed ^ 0x9e3779b9);
  const picked: { x: number; c: ClusterId }[] = [];
  for (let i = 0; i < n; i++) {
    const p = points[Math.floor(rand() * points.length)];
    picked.push({ x: p.x / ASPECT, c: p.c });
  }
  return picked.sort((a, b) => a.x - b.x);
}
