import type { Metadata } from "next";
import { Suspense } from "react";
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
        title="Research & projects"
        intro="Lab work, an industry internship, and the independent projects I started in high school."
      >
        <Suspense fallback={null}>
          <ExperienceTabs research={research} projects={projects} />
        </Suspense>
      </Section>
    </div>
  );
}
