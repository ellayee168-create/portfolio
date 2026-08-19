export const involvement = [
  {
    org: "Society of Women Engineers",
    role: "Treasurer",
    detail: "Columbia section — budgeting, sponsorship, and event funding.",
  },
  {
    org: "Columbia Undergraduate Science Journal",
    role: "Board Member",
    detail: "Peer review and editorial for undergraduate research.",
  },
  {
    org: "Claude Builder Club",
    role: "Member",
    detail: "Building with AI tooling alongside other Columbia students.",
  },
];

export const interests = [
  {
    title: "Dancing",
    body: "A long-running constant — the thing I do when I need to be somewhere other than a terminal.",
  },
  {
    title: "Music",
    body: "Playlists for every mode of work: reading papers, debugging pipelines, and the long tail of writing.",
  },
  {
    title: "Cafés",
    body: "An ongoing survey of where in the world is actually good to sit and work — New York, the Bay Area, Taiwan, Seoul. Map below.",
  },
];

/**
 * Café map.
 *
 * Metros are plotted by real coordinates on an equirectangular chart in
 * components/CafeMap.tsx. Cafés in the same metro share a pin — on a world
 * map four New York cafés would sit on top of each other.
 *
 * TODO(ella): `note` is blank on purpose — a one-line verdict each would make
 * this section. Add them here; cards render fine without.
 */
export type MetroId = "bay" | "nyc" | "taiwan" | "seoul";

export const metros = [
  { id: "bay", label: "Bay Area", lat: 37.4, lon: -122.1, cluster: "drug" },
  { id: "nyc", label: "New York", lat: 40.73, lon: -73.99, cluster: "spatial" },
  { id: "taiwan", label: "Taiwan", lat: 24.0, lon: 120.9, cluster: "immuno" },
  { id: "seoul", label: "Seoul", lat: 37.57, lon: 126.98, cluster: "genomics" },
] as const;

export type Cafe = {
  name: string;
  city: string;
  metro: MetroId;
  photo: string;
  note?: string;
};

export const cafes: Cafe[] = [
  { name: "Sipsteria", city: "New York", metro: "nyc", photo: "/cafes/sipsteria.jpg" },
  { name: "Floating Mountain Tea House", city: "New York", metro: "nyc", photo: "/cafes/floating-mountain-tea-house.jpg" },
  { name: "Conwell Coffee Hall", city: "New York", metro: "nyc", photo: "/cafes/conwell-coffee-hall.jpg" },
  { name: "tearoom by calmplex", city: "New York", metro: "nyc", photo: "/cafes/tearoom-by-calmplex.jpg" },
  { name: "Marigold Cafe", city: "San Francisco", metro: "bay", photo: "/cafes/marigold-cafe.jpg" },
  { name: "Coffee & Water Lab", city: "San Jose", metro: "bay", photo: "/cafes/coffee-and-water-lab.jpg" },
  { name: "Bloomsgiving", city: "Mountain View", metro: "bay", photo: "/cafes/bloomsgiving.jpg" },
  { name: "Sue's Gallery Cafe", city: "Saratoga", metro: "bay", photo: "/cafes/sue-s-gallery-cafe.jpg" },
  { name: "Simple Kaffa", city: "Taipei", metro: "taiwan", photo: "/cafes/simple-kaffa.jpg" },
  { name: "Carpenter Coffee", city: "Tainan", metro: "taiwan", photo: "/cafes/carpenter-coffee.jpg" },
  { name: "Osulloc Tea House", city: "Seoul", metro: "seoul", photo: "/cafes/osulloc-tea-house.jpg" },
];
