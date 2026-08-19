import type { ClusterId } from "./clusters";

export type LinkKind = "paper" | "poster" | "code" | "demo" | "site";

export type Entry = {
  title: string;
  org: string;
  role?: string;
  location?: string;
  period: string;
  category: "RESEARCH" | "INDUSTRY" | "PROJECT";
  /** Primary area — sets the card's colour and its place on the trajectory. */
  cluster: ClusterId;
  /** Further areas the work also belongs to, for filtering and counts. */
  alsoIn?: ClusterId[];
  description: string;
  /** Rendered inline after the description, so data files stay JSX-free. */
  inlineLinks?: { label: string; href: string }[];
  tags: string[];
  links?: { kind: LinkKind; href: string }[];
  figure?: { src: string; alt: string; caption: string };
  featured?: boolean;
  /**
   * Position on the pseudotime trajectory. `start`/`end` are decimal years;
   * `lane` is which lineage the work sits on before the two converge.
   */
  /** Used to order work when it sits off the trajectory. */
  sortAt?: number;
  /** Omitted for work that is not part of the computational-biology arc. */
  track?: {
    start: number;
    end: number;
    lane: "computational" | "wet" | "merged";
    /** Vertical nudge for work that runs concurrently with another project. */
    dy?: number;
  };
};

export const research: Entry[] = [
  {
    title: "Drug-Target Prioritization Across Transcriptomic, Docking & SAR Data",
    org: "ImmuneBridge",
    role: "Computational Biology Intern",
    location: "San Francisco, CA",
    period: "May – Aug 2026",
    category: "INDUSTRY",
    cluster: "drug",
    description:
      "Designed a computational pipeline for drug-target prioritization integrating transcriptomic analysis, molecular docking, and structure–activity relationship (SAR) data across 50+ proteins and 90+ compounds. Built an interactive dashboard to compare candidate targets and prioritize experimental validation, and created automation tooling for company-wide workflows.",
    track: { start: 2026.35, end: 2026.65, lane: "merged", dy: -9 },
    tags: ["Python", "Drug Discovery", "Molecular Docking", "SAR", "Data Visualization"],
    featured: true,
  },
  {
    title: "Spatial Dynamics & Phenotypic Plasticity in Human GvHD",
    org: "Columbia Engineering · Azizi Lab",
    role: "Research Intern",
    location: "New York, NY",
    period: "Sept 2025 – Present",
    category: "RESEARCH",
    cluster: "spatial",
    alsoIn: ["genomics", "immuno"],
    description:
      "Building Python pipelines for clustering, visualization, and trajectory analysis of scRNA-seq and spatial transcriptomics. Applying deep generative models to identify spatial and cellular dynamics in human graft-versus-host disease, and integrating transcriptomic, histological, and clinical data across patient samples to characterize plasma cell states.",
    inlineLinks: [
      { label: "Starfysh", href: "https://github.com/azizilab/starfysh" },
      { label: "Decipher", href: "https://github.com/azizilab/decipher" },
    ],
    track: { start: 2025.7, end: 2026.7, lane: "merged" },
    tags: ["Python", "Deep Generative Models", "Spatial Transcriptomics", "scRNA-seq"],
    figure: {
      src: "/decipher_training.gif",
      alt: "Decipher latent space reorganising over training epochs",
      caption: "Decipher latent space over training — Azizi Lab",
    },
    featured: true,
  },
  {
    title: "Transcriptomic & Immunohistological Analysis of GEM Cancer Models",
    org: "Columbia University Irving Medical Center · Abate-Shen Lab",
    role: "Research Fellow (SURF Program) & Intern",
    location: "New York, NY",
    period: "Sept 2024 – Aug 2025",
    category: "RESEARCH",
    cluster: "genomics",
    description:
      "Conducted differential expression analysis in R on RNA-seq datasets from genetically-engineered mouse models of advanced bladder cancer, alongside immunohistological analysis of metastatic lesions. Evaluated 20+ organ-on-a-chip platforms as ex vivo models, comparing engineering constraints and scalability.",
    figure: {
      src: "/figures/surf-ihc.jpg",
      alt: "Immunohistochemistry panels across prostate tumour, spine, femur, lung and liver tissue, stained for H&E, GFP, AR, VIM and PanCK",
      caption: "IHC across primary tumor and metastatic sites — SURF 2025",
    },
    track: { start: 2024.7, end: 2025.65, lane: "merged" },
    tags: ["R", "Bulk RNA-seq", "Immunohistochemistry", "Translational Research"],
    links: [{ kind: "poster", href: "/SURF_2025_poster.pdf" }],
    featured: true,
  },
  {
    title: "CRISPR-Cas9 Gene Knockout for CAR-NK Cancer Immunotherapy",
    org: "Stanford Cancer Institute · Sunwoo Lab",
    role: "Research Intern",
    location: "Stanford, CA",
    period: "June 2023 – Aug 2024",
    category: "RESEARCH",
    cluster: "immuno",
    description:
      "Designed CRISPR-Cas9 gene knockouts using lentiviral transduction and quantified gene expression by qPCR. Performed molecular cloning, DNA purification, and PCR to evaluate constructs for CAR-NK immunotherapy, contributing to research on NK–macrophage interactions in the tumor microenvironment.",
    track: { start: 2023.45, end: 2024.65, lane: "wet" },
    tags: ["CRISPR-Cas9", "qRT-PCR", "Molecular Cloning", "Western Blotting"],
  },
  {
    title: "Identification of Ultra-conserved Genomic Elements",
    org: "UC Davis Young Scholars Program · Korf Lab",
    role: "Research Scholar",
    location: "Davis, CA",
    period: "June – July 2022",
    category: "RESEARCH",
    cluster: "genomics",
    description:
      "Selected for a 6-week residential research program at the UC Davis Genome Center (<12% acceptance rate). Developed Python/Unix algorithms to identify ultraconserved genomic elements (UCEs) across 4 plant species using JBrowse and NIH BLAST; received the “Summer Slam” award for best oral presentation.",
    figure: {
      src: "/figures/uce-identity.jpg",
      alt: "Six histograms of percent sequence identity for each plant species compared with A. thaliana",
      caption: "Percent identity across six plant genomes — Korf Lab",
    },
    track: { start: 2022.45, end: 2022.58, lane: "computational" },
    tags: ["Python", "Unix", "Genomics", "BLAST"],
    links: [{ kind: "poster", href: "/YSP_2022.pdf" }],
  },
];

export const projects: Entry[] = [
  {
    title: "Cancer Genes Associated With Circadian Regulator ARNTL2",
    org: "NewMind Discovery",
    role: "Independent Researcher",
    period: "Aug 2023 – May 2024",
    category: "PROJECT",
    cluster: "genomics",
    description:
      "Designed a computational pipeline in R to evaluate ARNTL2-regulated genes associated with cancer, integrating multiple RNA-seq datasets. Presented at the Regeneron International Science & Engineering Fair and Science Talent Search.",
    figure: {
      src: "/figures/arntl2-rnascope.jpg",
      alt: "RNAscope fluorescence panels showing ARNTL2 in green, HMMR in red, DAPI in blue, and the merged image",
      caption: "RNAscope colocalization of ARNTL2 and HMMR — ISEF 2024",
    },
    track: { start: 2023.6, end: 2024.4, lane: "computational" },
    tags: ["R", "Machine Learning", "RNA-seq Analysis"],
    links: [{ kind: "poster", href: "/ISEF_2024.pdf" }],
    featured: true,
  },
  {
    title: "Neural Patterns of Autism Through Multi-Phase fMRI Analysis",
    org: "Independent Project",
    period: "Aug 2021 – May 2022",
    category: "PROJECT",
    cluster: "imaging",
    description:
      "Conducted deep learning analysis of resting-state fMRI scans to identify brain regions and coactivations associated with autism spectrum disorder. Published and presented at the IEEE Conference on Bioinformatics & Computational Biology.",
    track: { start: 2021.6, end: 2022.4, lane: "computational" },
    tags: ["Python", "Deep Learning", "fMRI", "Statistical Analysis"],
    links: [{ kind: "paper", href: "https://doi.org/10.1109/ICBCB57893.2023.10246705" }],
  },
  {
    title: "Stage-Optimized Image Processing for ML Diagnosis of Diabetic Retinopathy",
    org: "Independent Project",
    period: "Aug 2020 – May 2021",
    category: "PROJECT",
    cluster: "imaging",
    description:
      "Developed a machine-learning diagnostic aid for diabetic retinopathy with stage-specific image preprocessing, reducing missed diagnoses of early-stage DR by 80%. Presented at the Regeneron International Science & Engineering Fair.",
    figure: {
      src: "/figures/dr-processing.jpg",
      alt: "Grid of retinal fundus images across five diabetic retinopathy stages under four image processing methods",
      caption: "Processing methods across DR stages — ISEF 2021",
    },
    track: { start: 2020.6, end: 2021.4, lane: "computational" },
    tags: ["Python", "Deep Learning", "Image Classification"],
    links: [{ kind: "poster", href: "/ISEF_2021.pdf" }],
  },
  {
    title: "A-B-C-D Neural Network",
    org: "School Project",
    period: "Jan 2022 – May 2022",
    sortAt: 2022.4,
    category: "PROJECT",
    cluster: "imaging",
    description:
      "Programmed a multi-layer perceptron from scratch in Java with configurable input and output nodes. Implemented the backpropagation algorithm and evaluated the model on an image classification task.",
    tags: ["Java", "Deep Learning", "Backpropagation"],
    links: [{ kind: "code", href: "https://github.com/ellayee168-create/ABCD-Net" }],
  },
];

/** An entry counts under its primary area and any it also belongs to. */
export const inArea = (entry: Entry, id: ClusterId) =>
  entry.cluster === id || !!entry.alsoIn?.includes(id);

export const featured = [...research, ...projects].filter((e) => e.featured);
