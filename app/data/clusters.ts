/**
 * The five clusters are the spine of the site's visual system: the same id
 * colours a hero cluster, a project card rule, and a coursework pill.
 *
 * `href` makes the hero embedding navigation rather than decoration — each
 * cluster opens the research page filtered to that area.
 */
export const CLUSTERS = [
  {
    id: "spatial",
    label: "spatial transcriptomics",
    hex: "#6d2a64",
    href: "/research?area=spatial",
    n: 82,
  },
  {
    id: "genomics",
    label: "genomics & transcriptomics",
    hex: "#c64b76",
    href: "/research?area=genomics",
    n: 74,
  },
  {
    id: "drug",
    label: "drug discovery",
    hex: "#a87a22",
    href: "/research?area=drug",
    n: 61,
  },
  {
    id: "immuno",
    label: "immunology",
    hex: "#10756d",
    href: "/research?area=immuno",
    n: 58,
  },
  {
    id: "imaging",
    label: "imaging & ml",
    hex: "#465c87",
    href: "/research?area=imaging",
    n: 66,
  },
] as const;

export type ClusterId = (typeof CLUSTERS)[number]["id"];

export const CLUSTER_BY_ID: Record<ClusterId, (typeof CLUSTERS)[number]> =
  Object.fromEntries(CLUSTERS.map((c) => [c.id, c])) as Record<
    ClusterId,
    (typeof CLUSTERS)[number]
  >;

export function isClusterId(value: string | null): value is ClusterId {
  return CLUSTERS.some((c) => c.id === value);
}
