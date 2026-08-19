/**
 * The five clusters are the spine of the site's visual system: the same id
 * colours a hero cluster, a project card rule, and a coursework pill.
 */
export const CLUSTERS = [
  {
    id: "spatial",
    label: "spatial transcriptomics",
    color: "var(--color-c-plum)",
    hex: "#6d2a64",
    n: 82,
  },
  {
    id: "genomics",
    label: "genomics & transcriptomics",
    color: "var(--color-c-rose)",
    hex: "#c64b76",
    n: 74,
  },
  {
    id: "drug",
    label: "drug discovery",
    color: "var(--color-c-ochre)",
    hex: "#a87a22",
    n: 61,
  },
  {
    id: "immuno",
    label: "immunology",
    color: "var(--color-c-teal)",
    hex: "#10756d",
    n: 58,
  },
  {
    id: "imaging",
    label: "imaging & ml",
    color: "var(--color-c-slate)",
    hex: "#465c87",
    n: 66,
  },
] as const;

export type ClusterId = (typeof CLUSTERS)[number]["id"];

export const CLUSTER_BY_ID: Record<ClusterId, (typeof CLUSTERS)[number]> =
  Object.fromEntries(CLUSTERS.map((c) => [c.id, c])) as Record<
    ClusterId,
    (typeof CLUSTERS)[number]
  >;
