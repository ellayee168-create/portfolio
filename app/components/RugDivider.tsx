"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { marginalRug } from "../lib/embedding";
import { CLUSTER_BY_ID } from "../data/clusters";
import { useEmbedding } from "./EmbeddingContext";

/**
 * A rug plot of the hero embedding's 1D marginal, standing in for a rule.
 * Same seed as the hero, so pressing `e` re-runs these in step with it.
 */
export default function RugDivider({ className = "" }: { className?: string }) {
  const { seed, generation } = useEmbedding();
  const reduce = useReducedMotion();
  // Rounded at render: raw floats serialise differently on server and client
  // and trip hydration on an attribute this precise.
  const ticks = useMemo(
    () =>
      marginalRug(seed, 64).map((t) => ({
        ...t,
        pos: Number((t.x * 100).toFixed(3)),
      })),
    [seed],
  );

  return (
    <div
      className={`mx-auto my-8 max-w-5xl px-6 md:my-12 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 4"
        preserveAspectRatio="none"
        className="h-2.5 w-full overflow-visible opacity-45"
      >
        {ticks.map((tick, i) => (
          <motion.line
            key={`${generation}-${i}`}
            x1={tick.pos}
            x2={tick.pos}
            y1={0}
            y2={4}
            stroke={CLUSTER_BY_ID[tick.c].hex}
            strokeWidth={1}
            strokeOpacity={0.55}
            vectorEffect="non-scaling-stroke"
            initial={reduce ? false : { opacity: 0, scaleY: 0.2 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.004 }}
          />
        ))}
      </svg>
    </div>
  );
}
