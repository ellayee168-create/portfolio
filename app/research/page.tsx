import type { Metadata } from "next";
import Section from "../components/Section";
import ExperienceTabs from "../components/ExperienceTabs";
import { research, projects } from "../data/experience";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research, industry, and independent computational biology projects by Ella Yee.",
};

export default function ResearchPage() {
  return (
    <div className="py-16 md:py-20">
      <Section
        eyebrow="Research"
        title="Research & projects"
        intro="Lab work, an industry internship, and the independent projects that got me here — from ultraconserved elements in plant genomes to drug-target prioritization across 50+ proteins."
      >
        <ExperienceTabs research={research} projects={projects} />
      </Section>
    </div>
  );
}
