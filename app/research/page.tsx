import type { Metadata } from "next";
import { Suspense } from "react";
import Section from "../components/Section";
import WorkList from "../components/WorkList";
import { research, projects } from "../data/experience";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research, industry, and independent computational biology projects by Ella Yee.",
};

export default function ResearchPage() {
  return (
    <div className="py-10 md:py-14">
      <Section
        title="Research & projects"
      >
        <Suspense fallback={null}>
          <WorkList entries={[...research, ...projects]} />
        </Suspense>
      </Section>
    </div>
  );
}
