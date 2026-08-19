import type { ClusterId } from "./clusters";

export type CourseKind = "cs" | "math" | "bio" | "eng" | "phys" | "core";

/**
 * Course kinds reuse the cluster palette so the whole site reads as one system.
 * Core/humanities courses stay neutral so the technical work carries the colour.
 */
export const COURSE_KIND: Record<
  CourseKind,
  { label: string; cluster: ClusterId | null }
> = {
  cs: { label: "cs", cluster: "imaging" },
  math: { label: "math", cluster: "drug" },
  bio: { label: "bio", cluster: "immuno" },
  eng: { label: "eng", cluster: "spatial" },
  phys: { label: "phys", cluster: "genomics" },
  core: { label: "core", cluster: null },
};

export const school = {
  name: "Columbia University in the City of New York",
  degree: "B.S. Biomedical Engineering, Minor in Computer Science",
  location: "New York, NY",
  period: "Sept 2024 – May 2028",
  gpa: "4.2 / 4.0",
  honors: [
    "Egleston Scholar — top 1% of engineering applicants",
    "SURF Fellow",
    "Dean's List",
  ],
};

export type Semester = {
  term: string;
  current?: boolean;
  deansList?: boolean;
  courses: { code: string; title: string; kind: CourseKind }[];
};

/** Newest first. Zero-credit discussion/recitation sections are omitted. */
export const semesters: Semester[] = [
  {
    term: "Fall 2026",
    current: true,
    courses: [
      { code: "BMEN 3010", title: "Biomedical Engineering I", kind: "eng" },
      { code: "BMEN 3810", title: "Biomedical Engineering Lab I", kind: "eng" },
      { code: "BMEN 4001", title: "Quantitative Physiology I", kind: "bio" },
      { code: "BMEN 4110", title: "Biostatistics for Engineers", kind: "math" },
      { code: "COMS 4705", title: "Natural Language Processing", kind: "cs" },
    ],
  },
  {
    term: "Spring 2026",
    deansList: true,
    courses: [
      { code: "COMS 4701", title: "Artificial Intelligence", kind: "cs" },
      { code: "COMS 3157", title: "Advanced Programming", kind: "cs" },
      { code: "COMS 3203", title: "Discrete Mathematics", kind: "math" },
      { code: "BIOL 2006", title: "Intro Biology II: Cell Biology, Development & Physiology", kind: "bio" },
      { code: "BMEN 3998", title: "Projects in Biomedical Engineering", kind: "eng" },
      { code: "RELI 2405", title: "Chinese Religious Traditions", kind: "core" },
    ],
  },
  {
    term: "Fall 2025",
    courses: [
      { code: "COMS 3134", title: "Data Structures in Java", kind: "cs" },
      { code: "BIOL 2005", title: "Intro Biology I: Biochemistry, Genetics & Molecular Biology", kind: "bio" },
      { code: "ELEN 1201", title: "Introduction to Electrical Engineering", kind: "eng" },
      { code: "BMEN 3899", title: "Research Training", kind: "eng" },
      { code: "BMEN 3998", title: "Projects in Biomedical Engineering", kind: "eng" },
      { code: "PHYS 1403", title: "Introduction to Classical & Quantum Waves", kind: "phys" },
      { code: "ASCE 1367", title: "Introduction to East Asian Civilizations: Vietnam", kind: "core" },
    ],
  },
  {
    term: "Spring 2025",
    deansList: true,
    courses: [
      { code: "APMA 2101", title: "Introduction to Applied Mathematics", kind: "math" },
      { code: "ENGI 1102", title: "The Art of Engineering", kind: "eng" },
      { code: "PHYS 1402", title: "Electricity, Magnetism & Optics", kind: "phys" },
      { code: "CHEM 1507", title: "Intensive General Chemistry Lab", kind: "phys" },
      { code: "ECON 1105", title: "Principles of Economics", kind: "core" },
    ],
  },
  {
    term: "Fall 2024",
    deansList: true,
    courses: [
      { code: "ENGI 1006", title: "Introduction to Computing for Engineers & Applied Scientists", kind: "cs" },
      { code: "APMA 2000", title: "Multivariable Calculus for Engineers & Applied Scientists", kind: "math" },
      { code: "PHYS 1401", title: "Introduction to Mechanics & Thermodynamics", kind: "phys" },
      { code: "CHEM 1604", title: "Second-Term General Chemistry (Intensive)", kind: "phys" },
      { code: "ENGI 1002", title: "Egleston Scholar Engineering", kind: "eng" },
      { code: "ENGL 1010", title: "University Writing", kind: "core" },
    ],
  },
];
