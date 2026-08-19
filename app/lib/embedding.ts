import { CLUSTERS, type ClusterId } from "../data/clusters";

const BRIDGE_COUNT = 22;

export type Point = {
  x: number; // normalised 0..1
  y: number;
  r: number; // radius multiplier 0.6..1.4
  c: ClusterId;
  /** per-point phase so drift is not synchronised */
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

/** Box-Muller, so blobs look sampled rather than scattered uniformly. */
function gaussian(rand: () => number) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/**
 * Base cluster anchors, spread so no seed collapses two clusters on top of
 * each other. The seed jitters them; it does not place them from scratch.
 */
const ANCHORS: Record<ClusterId, [number, number]> = {
  spatial: [0.28, 0.3],
  genomics: [0.66, 0.22],
  drug: [0.78, 0.62],
  immuno: [0.42, 0.72],
  imaging: [0.14, 0.6],
};

/**
 * Generates a UMAP-ish embedding: anisotropic, slightly rotated blobs, plus a
 * few stragglers bridging neighbouring clusters so it reads as a real
 * projection rather than five tidy circles.
 */
export function generateEmbedding(seed: number): Point[] {
  const rand = mulberry32(seed);
  const points: Point[] = [];

  for (const cluster of CLUSTERS) {
    const [ax, ay] = ANCHORS[cluster.id];
    const cx = ax + (rand() - 0.5) * 0.12;
    const cy = ay + (rand() - 0.5) * 0.12;

    // Elongate and rotate each blob a little.
    const sx = 0.05 + rand() * 0.05;
    const sy = 0.03 + rand() * 0.04;
    const theta = rand() * Math.PI;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);

    for (let i = 0; i < cluster.n; i++) {
      const gx = gaussian(rand) * sx;
      const gy = gaussian(rand) * sy;
      const x = cx + gx * cos - gy * sin;
      const y = cy + gx * sin + gy * cos;

      points.push({
        x: Math.min(0.98, Math.max(0.02, x)),
        y: Math.min(0.98, Math.max(0.02, y)),
        r: 0.6 + rand() * 0.8,
        c: cluster.id,
        phase: rand() * Math.PI * 2,
      });
    }
  }

  // A fixed number of bridge points between distinct clusters. The count is
  // constant across seeds so the re-cluster transition can pair points by index.
  let bridges = 0;
  while (bridges < BRIDGE_COUNT) {
    const a = CLUSTERS[Math.floor(rand() * CLUSTERS.length)];
    const b = CLUSTERS[Math.floor(rand() * CLUSTERS.length)];
    if (a.id === b.id) continue;
    const [ax, ay] = ANCHORS[a.id];
    const [bx, by] = ANCHORS[b.id];
    const t = 0.25 + rand() * 0.5;
    points.push({
      x: ax + (bx - ax) * t + (rand() - 0.5) * 0.05,
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
 * The 1D marginal of the same space, used by the section dividers. Derived
 * from the embedding itself so the dividers really are a projection of the
 * hero rather than a lookalike.
 */
export function marginalRug(seed: number, n = 90): { x: number; c: ClusterId }[] {
  const points = generateEmbedding(seed);
  const rand = mulberry32(seed ^ 0x9e3779b9);
  const picked: { x: number; c: ClusterId }[] = [];
  for (let i = 0; i < n; i++) {
    const p = points[Math.floor(rand() * points.length)];
    picked.push({ x: p.x, c: p.c });
  }
  return picked.sort((a, b) => a.x - b.x);
}
