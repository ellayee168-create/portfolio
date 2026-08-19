// Regenerates app/data/worldMap.ts from world-atlas. See that file's header.
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";

const topo = JSON.parse(readFileSync("node_modules/world-atlas/land-110m.json", "utf8"));
const land = feature(topo, topo.objects.land);

const W = 1000;
const H = 500;
const px = (lon) => ((lon + 180) / 360) * W;
const py = (lat) => ((90 - lat) / 180) * H;
const r = (n) => Math.round(n * 10) / 10;

const rings = [];
for (const geom of land.features) {
  const polys =
    geom.geometry.type === "Polygon" ? [geom.geometry.coordinates] : geom.geometry.coordinates;
  for (const poly of polys)
    for (const ring of poly) {
      if (ring.length < 4) continue;
      let d = "";
      for (let i = 0; i < ring.length; i++) {
        const [lon, lat] = ring[i];
        d += (i ? "L" : "M") + r(px(lon)) + " " + r(py(lat));
      }
      rings.push(d + "Z");
    }
}

writeFileSync(
  "app/data/worldMap.ts",
  `// Generated from world-atlas land-110m. Do not edit by hand.
//
// To regenerate:
//   npm i -D world-atlas topojson-client
//   node scripts/gen-world-map.mjs
//   npm uninstall world-atlas topojson-client
//
// 110m is deliberate: land-50m is ~790 KB of path data and land-10m ~5 MB,
// which is not worth it for a map that tops out at regional zoom.
// Equirectangular projection into a ${W} x ${H} box.
export const MAP_W = ${W};
export const MAP_H = ${H};
export const project = (lon: number, lat: number): [number, number] => [
  ((lon + 180) / 360) * MAP_W,
  ((90 - lat) / 180) * MAP_H,
];
export const LAND = ${JSON.stringify(rings.join(" "))};
`,
);
console.log("rings:", rings.length);
