"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type EmbeddingState = {
  /** Every point field on the page derives its layout from this. */
  seed: number;
  /** Bumped each time the embedding is re-run; drives the transition. */
  generation: number;
  reseed: () => void;
};

const BASE_SEED = 20260818;

const EmbeddingContext = createContext<EmbeddingState>({
  seed: BASE_SEED,
  generation: 0,
  reseed: () => {},
});

export function EmbeddingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState({ seed: BASE_SEED, generation: 0 });

  const reseed = useCallback(() => {
    setState((s) => ({
      seed: (s.seed * 1664525 + 1013904223) >>> 0,
      generation: s.generation + 1,
    }));
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "e" && event.key !== "E") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      // Never hijack typing in a field.
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      reseed();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reseed]);

  const value = useMemo(
    () => ({ seed: state.seed, generation: state.generation, reseed }),
    [state.seed, state.generation, reseed],
  );

  return (
    <EmbeddingContext.Provider value={value}>
      {children}
    </EmbeddingContext.Provider>
  );
}

export const useEmbedding = () => useContext(EmbeddingContext);
