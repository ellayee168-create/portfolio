export type CommunityEntry = {
  org: string;
  role: string;
  period?: string;
  previously?: string;
  points?: string[];
  href?: string;
  linkLabel?: string;
  photo?: { src: string; alt: string; caption: string };
};

export const community: CommunityEntry[] = [
  {
    org: "Columbia Society of Women Engineers",
    role: "Treasurer",
    period: "May 2026 – Present",
    previously:
      "Executive Committee 2025–26 · Organizational Committee 2024–25",
    points: [
      "Manage budgeting, reimbursements, and financial planning for Columbia's SWE chapter.",
      "Led the Engineering Exploration Experience, a full-day event bringing 200+ female and nonbinary high school students to campus to explore STEM.",
      "Built partnerships with faculty, industry leaders, corporate sponsors, student organizations, and local businesses.",
    ],
    photo: {
      src: "/community/swe-eee.jpg",
      alt: "Students on stage at the 2026 Engineering Exploration Experience at Columbia",
      caption: "Engineering Exploration Experience 2026",
    },
  },
  {
    org: "Columbia Undergraduate Science Journal",
    role: "Editorial Board Member",
    period: "Sept 2024 – Present",
    points: [
      "Review 400+ submissions a year across computer science, biology, environmental science, and mathematical modeling.",
      "Mentor high school students on writing up their research with clarity and rigor.",
    ],
  },
  {
    org: "Columbia University Biotech Society",
    role: "Podcast Initiative",
    points: [
      "BioWorks, Columbia's student-run podcast on life science business, policy, and research.",
    ],
    href: "https://open.spotify.com/show/3NHurpbqtRjjwgDwkkozZd",
    linkLabel: "listen",
  },
  {
    org: "Columbia Data Science Society",
    role: "Board Member",
  },
  {
    org: "Columbia China Dance",
    role: "Member",
  },
  {
    org: "Claude Builder Club",
    role: "Member",
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
