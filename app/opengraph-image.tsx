import { ImageResponse } from "next/og";
import { ASPECT, generateEmbedding } from "./lib/embedding";
import { CLUSTER_BY_ID } from "./data/clusters";
import { profile } from "./data/profile";

export const alt =
  "Ella Yee — Biomedical Engineering & Computer Science at Columbia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Deliberately no webfont: Satori needs the font bytes, and fetching Google
// Fonts at build time would make the build depend on the network.
export default function Image() {
  // Subsample — every point becomes a div, and the full field is overkill here.
  const points = generateEmbedding(20260818).filter((_, i) => i % 2 === 0);

  const PLOT = { left: 566, top: 143, width: 592, height: 592 / ASPECT };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#faf7f2",
          color: "#1f1a17",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {points.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: PLOT.left + (p.x / ASPECT) * PLOT.width,
              top: PLOT.top + p.y * PLOT.height,
              width: 5,
              height: 5,
              borderRadius: 5,
              background: CLUSTER_BY_ID[p.c].hex,
              opacity: 0.75,
            }}
          />
        ))}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 462,
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#9c918a",
              marginBottom: 22,
            }}
          >
            Columbia University
          </div>
          <div style={{ fontSize: 80, lineHeight: 1, letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 29,
              lineHeight: 1.3,
              color: "#6b615a",
              marginTop: 22,
            }}
          >
            Biomedical Engineering &amp; Computer Science
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 40,
              fontSize: 21,
              color: "#4a044e",
            }}
          >
            <div
              style={{
                width: 34,
                height: 3,
                background: "#4a044e",
                marginRight: 16,
              }}
            />
            computational biology · machine learning
          </div>
        </div>
      </div>
    ),
    size,
  );
}
