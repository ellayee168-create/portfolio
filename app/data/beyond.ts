export type CommunityEntry = {
  org: string;
  role: string;
  period?: string;
  previously?: string;
  points?: string[];
  href?: string;
  linkLabel?: string;
  /** Spotify show id — rendered as an embed so the cover art shows. */
  spotifyShow?: string;
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
      "As Treasurer, I manage all aspects of budgeting, reimbursements, and financial planning for Columbia University's SWE chapter.",
      "I was also a lead organizer of our 2026 Engineering Exploration Experience, a full-day event that brought 200+ female and nonbinary high school students to campus to explore STEM disciplines!",
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
      "As a member of CUSJ's Editorial Board, I contribute to reviewing 400+ annual submissions across various STEM disciplines. I've also had the opportunity to mentor high school students one-on-one and help strengthen their scientific writing skills.",
    ],
    href: "https://journals.library.columbia.edu/index.php/cusj/issue/view/1071",
    linkLabel: "check out the publication here",
  },
  {
    org: "Columbia University Biotech Society",
    role: "Cohost",
    points: [
      "I co-host BioWorks, Columbia's student-run podcast featuring leaders at the cutting edge of biotech, biomedical research, and medicine. The people I've met and conversations I've shared through this project make me feel even more excited about the future of biotech and computational biology.",
    ],
    href: "https://open.spotify.com/show/3NHurpbqtRjjwgDwkkozZd",
    linkLabel: "open in spotify",
    spotifyShow: "3NHurpbqtRjjwgDwkkozZd",
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
 * Pins sit at city coordinates, which are verifiable — not at each shop's
 * street address, which would be invented precision. Cafés in the same city
 * share a pin; zooming separates the Bay Area cities from each other.
 */
export type MetroId = "bay" | "nyc" | "taiwan" | "seoul";

export const metros = [
  { id: "bay", label: "Bay Area", cluster: "drug", lat: 37.5, lon: -122.1, zoom: 26 },
  { id: "nyc", label: "New York", cluster: "spatial", lat: 40.7, lon: -74.0, zoom: 26 },
  { id: "taiwan", label: "Taiwan", cluster: "immuno", lat: 24.0, lon: 120.9, zoom: 26 },
  { id: "seoul", label: "Seoul", cluster: "genomics", lat: 37.57, lon: 126.98, zoom: 26 },
] as const;

export type Cafe = {
  name: string;
  city: string;
  metro: MetroId;
  lat: number;
  lon: number;
  photo: string;
  note?: string;
};

/** TODO(ella): `note` is optional — a one-line verdict each would make this. */
export const cafes: Cafe[] = [
  // New York
  { name: "Sipsteria", city: "New York", metro: "nyc", lat: 40.7128, lon: -74.006, photo: "/cafes/sipsteria.jpg" },
  { name: "Floating Mountain Tea House", city: "New York", metro: "nyc", lat: 40.7128, lon: -74.006, photo: "/cafes/floating-mountain-tea-house.jpg" },
  { name: "Conwell Coffee Hall", city: "New York", metro: "nyc", lat: 40.7128, lon: -74.006, photo: "/cafes/conwell-coffee-hall.jpg" },
  { name: "tearoom by calmplex", city: "New York", metro: "nyc", lat: 40.7128, lon: -74.006, photo: "/cafes/tearoom-by-calmplex.jpg" },
  { name: "Silence Please", city: "New York", metro: "nyc", lat: 40.7128, lon: -74.006, photo: "/cafes/silence-please.jpg" },
  { name: "Loaf on Paper", city: "New York", metro: "nyc", lat: 40.7128, lon: -74.006, photo: "/cafes/loaf-on-paper.jpg" },

  // Bay Area
  { name: "Marigold Cafe", city: "San Francisco", metro: "bay", lat: 37.7749, lon: -122.4194, photo: "/cafes/marigold-cafe.jpg" },
  { name: "Hedge Coffee", city: "San Francisco", metro: "bay", lat: 37.7749, lon: -122.4194, photo: "/cafes/hedge-coffee.jpg" },
  { name: "Coffee & Water Lab", city: "San Jose", metro: "bay", lat: 37.3382, lon: -121.8863, photo: "/cafes/coffee-and-water-lab.jpg" },
  { name: "Bloomsgiving", city: "Mountain View", metro: "bay", lat: 37.3861, lon: -122.0839, photo: "/cafes/bloomsgiving.jpg" },
  { name: "Sue's Gallery Cafe", city: "Saratoga", metro: "bay", lat: 37.2638, lon: -122.023, photo: "/cafes/sue-s-gallery-cafe.jpg" },
  { name: "Living Room Coffee Craft", city: "Campbell", metro: "bay", lat: 37.2872, lon: -121.95, photo: "/cafes/living-room-coffee-craft.jpg" },

  // Taiwan
  { name: "Simple Kaffa", city: "Taipei", metro: "taiwan", lat: 25.033, lon: 121.5654, photo: "/cafes/simple-kaffa.jpg" },
  { name: "Curista Coffee", city: "Taipei", metro: "taiwan", lat: 25.033, lon: 121.5654, photo: "/cafes/curista-coffee.jpg" },
  { name: "Carpenter Coffee", city: "Tainan", metro: "taiwan", lat: 22.9997, lon: 120.227, photo: "/cafes/carpenter-coffee.jpg" },

  // Seoul
  { name: "Osulloc Tea House", city: "Seoul", metro: "seoul", lat: 37.5665, lon: 126.978, photo: "/cafes/osulloc-tea-house.jpg" },
  { name: "Cafe Onion", city: "Seoul", metro: "seoul", lat: 37.5665, lon: 126.978, photo: "/cafes/cafe-onion.jpg" },
  { name: "Gangjeongi Neomchineun House", city: "Seoul", metro: "seoul", lat: 37.5665, lon: 126.978, photo: "/cafes/gangjeongi-neomchineun-house.jpg" },
];
