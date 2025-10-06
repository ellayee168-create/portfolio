"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Linkedin, FileText, ChevronRight, Laptop, Dna } from "lucide-react";

type Project = {
  title: string;
  org: string;
  period: string;
  description: React.ReactNode | string;
  tags: string[];
  pdf?: string;
  link?: string;
};

type ProjectSections = {
  research: Project[];
  computational: Project[];
};

export default function Portfolio() {
  const projects: ProjectSections = {
    research: [
      {
        title: "ML Analysis of GvHD Spatial Transcriptomics & Phenotypic Plasticity",
        org: "Columbia Engineering | Azizi Lab",
        period: "Sept 2025 - Present",
        description: (
          <>
            Leveraging deep generative modeling (
            <a
              href="https://github.com/azizilab/starfysh"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-fuchsia-900"
            >
              Starfysh
            </a>
            ,{" "}
            <a
              href="https://github.com/azizilab/decipher"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-fuchsia-900"
            >
              Decipher
            </a>
            ) to analyze epithelial cells in graft-versus-host disease (GvHD), a major complication
            of bone marrow & stem cell transplants.
          </>
        ),
        tags: ["Python", "Deep Learning", "Spatial Transcriptomics"],
      },
      {
        title: "Immunohistological Analysis of Prostate Cancer Bone Metastasis",
        org: "Columbia Summer Undergraduate Research Fellowship",
        period: "May 2025 - Aug 2025",
        description:
          "Conducted immunohistological analysis of metastatic lesions from genetically engineered mouse models. Led product research on 20+ biotech suppliers to evaluate ex vivo cancer models.",
        tags: ["Immunohistology", "Translational Research"],
        pdf: "SURF_2025.pdf",
      },
      {
        title: "Transcriptomic Analysis of Bladder Cancer Mouse Models in R",
        org: "Columbia Irving Medical Center | Abate-Shen Lab",
        period: "September 2024 - May 2025",
        description:
          "Developed computational pipelines in R to evaluate genetically-engineered mouse models of advanced bladder cancer.",
        tags: ["R", "Statistical Analysis", "RNA-seq Analysis"],
      },
      {
        title: "CRISPR-Cas9 Gene Knockout for CAR-NK Cancer Immunotherapy",
        org: "Stanford Cancer Institute | Sunwoo Lab",
        period: "June 2023 - August 2024",
        description:
          "Conducted independent project on CRISPR-Cas9 gene knockout via lentiviral transduction, contributed to research on CAR-NK immunotherapy & NK-macrophage interactions in the TME.",
        tags: ["qRT-PCR", "Western Blotting", "Statistical Analysis"],
      },
      {
        title: "Identification of Ultra-conserved Genomic Elements",
        org: "UC Davis Genome Center | Korf Lab",
        period: "June 2022 - July 2022",
        description:
          "Developed algorithms to identify ultraconserved genomic elements (UCEs) across 4 plant species through integration of Python, Unix, JBrowse, & NIH BLAST.",
        tags: ["Python", "Unix", "Genomics"],
        pdf: "YSP_2022.pdf",
      },
    ],
    computational: [
      {
        title: "Identification of Cancer Genes Associated With Circadian Regulator ARNTL2",
        org: "NewMind Discovery",
        period: "August 2023 - May 2024",
        description:
          "Designed computational pipeline in R to evaluate ARNTL2-regulated genes associated with cancer, integrating multiple RNA-seq datasets. Presented at Regeneron International Science & Engineering Fair, Science Talent Search.",
        tags: ["R", "Machine Learning", "RNA-Seq Analysis"],
        pdf: "ISEF_2024.pdf",
      },
      {
        title: "Identifying Neural Patterns of Autism Through Multi-Phase fMRI Analysis",
        org: "Independent Project",
        period: "August 2021 - May 2022",
        description:
          "Conducted deep learning analysis of fMRI scans to identify brain regions and coactivations associated with autism. Presented at IEEE Conference on Bioinformatics & Computational Biology.",
        tags: ["Python", "Deep Learning", "Statistical Analysis"],
        link: "https://ieeexplore.ieee.org/document/10246705",
      },
      {
        title: "Stage-Optimized Image Processing for ML-Driven Diagnosis of Diabetic Retinopathy",
        org: "Independent Project",
        period: "August 2020 - May 2021",
        description:
          "Developed ML-based diagnostic aid for diabetic retinopathy, reducing missed diagnosis of early-stage DR by 80%. Presented at Regeneron International Science & Engineering Fair.",
        tags: ["Python", "Deep Learning", "Image Classification"],
        pdf: "ISEF_2021.pdf",
      },
      {
        title: "A-B-C-D Neural Network",
        org: "School Project",
        period: "January 2022 - May 2022",
        description:
          "Programmed a multi-layer perceptron in Java, with customizable input and output nodes. Implemented backpropagation algorithm & evaluated model through image classification task.",
        tags: ["Java", "Deep Learning", "Image Processing"],
        link: "https://github.com/ellayee168-create/ABCD-Net",
      },
    ],
  };

  type SectionType = keyof typeof projects;
  const [activeSection, setActiveSection] = useState<SectionType>("research");

  return (
    <div className="min-h-screen bg-white font-sans text-black relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <a href="#about" className="text-black hover:text-fuchsia-900 text-sm transition-colors">
              About
            </a>
            <a href="#experience" className="text-black hover:text-fuchsia-900 text-sm transition-colors">
              Experience
            </a>
            <a href="#contact" className="text-black hover:text-fuchsia-900 text-sm transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-5xl font-semibold tracking-tight">
              Ella Yee <br />
              <span className="text-black/70">Biomedical Engineering & CS @Columbia</span>
            </h1>
            <p className="text-xl text-black/70 max-w-2xl leading-relaxed">
              Sophomore & Egleston Scholar @Columbia University. Passionate about AI, computational
              biology, & human-centered innovation.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-fuchsia-950/90 text-white px-6 py-3 rounded-lg hover:bg-fuchsia-900/90 transition-colors"
              >
                Let&apos;s Connect! <ChevronRight size={18} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg border border-black/10 hover:border-black/20 transition-colors"
              >
                <FileText size={18} /> Resume
              </a>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Image
              src="/decipher_training.gif"
              alt="Decipher"
              width={288}
              height={288}
              className="w-72 h-72 object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      <div className="h-0.5 bg-fuchsia-950/90 my-16"></div>

      {/* About Section */}
      <section id="about" className="py-10 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl p-8 md:p-12 shadow-sm relative">
          <div className="absolute top-0 left-0 w-full h-3 bg-fuchsia-950/10"></div>
          <div className="absolute bottom-0 left-0 w-full h-3 bg-fuchsia-950/10"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1 space-y-4 text-black/70 leading-relaxed">
              <h2 className="text-3xl font-semibold text-black mb-4 md:mb-6">About</h2>
              <p>
                Hi! I&apos;m Ella, a sophomore at Columbia Engineering studying Biomedical Engineering
                and Computer Science. I&apos;m fascinated by how computer science can be applied across
                disciplines to solve real-world challenges and improve people&apos;s lives.
              </p>
              <p>
                My pursuits in computational biology are driven by my desire to help patients and advance
                human health. As an undergraduate researcher at Azizi lab (Computational Cancer Biology
                Laboratory), I use deep generative modeling to investigate spatial transcriptomics and
                phenotypic plasticity in graft-versus-host disease.
              </p>
              <p>
                I&apos;m also dedicated to building community and amplifying underrepresented voices in
                STEM through Columbia Society of Women Engineers and Columbia Undergraduate Science Journal.
                In my free time, I love dancing, listening to music, and exploring NYC&apos;s cafe scene!
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-0.5 bg-fuchsia-950/90 my-16"></div>

      {/* Work Section */}
      <section id="experience" className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-black mb-8">Research & Projects</h2>

          {/* Toggle */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveSection("research")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeSection === "research"
                  ? "bg-fuchsia-950/90 text-white"
                  : "bg-white text-black border border-black/10 hover:border-black/20"
              }`}
            >
              <Dna className="inline-block w-4 h-4 mr-2" />
              Research Experience
            </button>
            <button
              onClick={() => setActiveSection("computational")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeSection === "computational"
                  ? "bg-fuchsia-950/90 text-white"
                  : "bg-white text-black border border-black/10 hover:border-black/20"
              }`}
            >
              <Laptop className="inline-block w-4 h-4 mr-2" />
              Computational Projects
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects[activeSection].map((project: Project, idx: number) => (
              <div key={idx} className="relative bg-white rounded-xl p-6 shadow-sm overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-fuchsia-950/10"></div>
                <div className="absolute bottom-0 left-0 w-full h-3 bg-fuchsia-950/10"></div>

                <div className="relative z-10">
                  <h3 className="font-semibold text-black text-lg mb-2">{project.title}</h3>
                  <div className="text-sm text-black/70 mb-1">{project.org}</div>
                  <div className="text-sm text-black/50 mb-3">{project.period}</div>
                  <p className="text-black/70 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-black/5 text-black/70 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-1 border-t border-black/25 pt-3">
                    {project.link && (
                      <a
                        href={project.link.startsWith("http") ? project.link : `https://${project.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fuchsia-900 font-semibold text-sm inline-flex items-center gap-1 hover:underline leading-none"
                      >
                        View Project <ChevronRight size={18} />
                      </a>
                    )}
                    {project.pdf && (
                      <a
                        href={project.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fuchsia-900 font-semibold text-sm inline-flex items-center gap-1 hover:underline"
                      >
                        View Project <ChevronRight size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-0.5 bg-fuchsia-950/90 my-16"></div>

      {/* Contact Section */}
      <section id="contact" className="py-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-black mb-4">Let&apos;s connect!</h2>
          <p className="text-black/70 mb-8 max-w-2xl mx-auto">
            Excited to contribute to summer 2026 projects in computational biology, biotech, & cancer
            research.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="mailto:ella.yee@columbia.edu"
              className="inline-flex items-center gap-2 bg-fuchsia-950/90 text-white px-6 py-3 rounded-lg hover:bg-fuchsia-900/90 transition-colors"
            >
              <Mail size={18} />
              ella.yee@columbia.edu
            </a>
            <a
              href="https://www.linkedin.com/in/ella-yee-b5455732b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg border border-fuchsia-950/90 hover:border-black/20 transition-colors"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
