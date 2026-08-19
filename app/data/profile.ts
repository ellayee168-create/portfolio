export const profile = {
  name: "Ella Yee",
  title: "Biomedical Engineering & Computer Science at Columbia",
  tagline:
    "Junior & Egleston Scholar at Columbia University. Passionate about leveraging computation and technology to advance medical innovation 💡",
  email: "ella.yee@columbia.edu",
  socials: [
    { label: "Email", href: "mailto:ella.yee@columbia.edu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ella-yee-b5455732b/" },
    { label: "GitHub", href: "https://github.com/ellayee168-create" },
    { label: "Resume", href: "/resume.pdf" },
  ],
  about: [
    "Hi! I'm Ella, a junior at Columbia University studying Biomedical Engineering (Bioinformatics & ML Concentration) and minoring in Computer Science. I'm fascinated by how computational tools can be applied across disciplines to address real-world problems and improve people's lives.",
    "My love for computational biology is rooted in my desire to help patients and advance human health. As an undergraduate researcher at Columbia's Azizi Lab, I use deep generative modeling to study spatial dynamics and phenotypic plasticity in human graft-versus-host disease. This past summer I interned at ImmuneBridge in San Francisco, where I built a drug-target prioritization pipeline that integrates transcriptomic, molecular docking, and chemical structure–activity data.",
    "Outside the lab, I'm Treasurer of Columbia Society of Women Engineers, serve on the editorial board of the Columbia Undergraduate Science Journal, and love exploring the NYC cafe scene.",
  ],
  skills: [
    { group: "Languages", items: ["Python", "R", "Java", "Bash/Unix", "C"] },
    {
      group: "Libraries & Tools",
      items: ["PyTorch", "scikit-learn", "NumPy", "SciPy", "Scanpy", "AnnData", "DESeq2", "edgeR", "Git"],
    },
    {
      group: "Computational Biology",
      items: ["bulk RNA-seq", "scRNA-seq", "spatial transcriptomics", "cell trajectory analysis"],
    },
    {
      group: "Experimental",
      items: ["PCR", "molecular cloning", "DNA purification", "electrophoresis", "immunohistochemistry", "histology"],
    },
  ],
} as const;
