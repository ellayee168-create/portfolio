import type { Metadata } from "next";
import Section from "../components/Section";
import Reveal from "../components/Reveal";
import { school, semesters, COURSE_KIND } from "../data/education";
import { CLUSTER_BY_ID } from "../data/clusters";

export const metadata: Metadata = {
  title: "Coursework",
  description:
    "Courses taken at Columbia Engineering by semester — biomedical engineering, computer science, and applied math.",
};

export default function CourseworkPage() {
  return (
    <div className="py-16 md:py-20">
      <Section
        eyebrow="Education"
        title="Coursework"
        intro="Courses at Columbia Engineering, by semester."
      >
        {/* -------------------------------------------------------- School */}
        <div className="mb-10 rounded-xl border border-line bg-raised p-6">
          <h3 className="font-display text-xl tracking-tight">{school.name}</h3>
          <p className="mt-1 text-sm text-muted">{school.degree}</p>
          <p className="label mt-1 text-faint">
            {school.period} · {school.location}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            <li className="label rounded border border-accent/30 bg-accent-wash px-2.5 py-1 text-accent">
              GPA {school.gpa}
            </li>
            {school.honors.map((honor) => (
              <li
                key={honor}
                className="label rounded border border-line px-2.5 py-1 text-muted"
              >
                {honor}
              </li>
            ))}
          </ul>
        </div>

        {/* ----------------------------------------------------- Semesters */}
        <div className="space-y-5">
          {semesters.map((semester, i) => (
            <Reveal key={semester.term} delay={i * 0.05}>
              <section className="overflow-hidden rounded-xl border border-line bg-raised">
                <header className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3">
                  <h3 className="font-display text-lg tracking-tight">
                    {semester.term}
                  </h3>
                  {semester.current && (
                    <span className="label rounded-full bg-accent px-2 py-0.5 text-white">
                      current
                    </span>
                  )}
                  <span className="grow" />
                  {semester.deansList && (
                    <span className="label text-faint">dean&apos;s list</span>
                  )}
                  {semester.gpa && (
                    <span className="label text-muted">
                      term gpa {semester.gpa}
                    </span>
                  )}
                </header>

                <ul className="divide-y divide-line">
                  {semester.courses.map((course) => {
                    const kind = COURSE_KIND[course.kind];
                    const hex = kind.cluster
                      ? CLUSTER_BY_ID[kind.cluster].hex
                      : undefined;
                    return (
                      <li
                        key={course.code + course.title}
                        className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3"
                      >
                        <span className="label w-24 shrink-0 text-faint">
                          {course.code}
                        </span>
                        <span className="min-w-0 grow text-sm">
                          {course.title}
                        </span>
                        <span
                          className="label rounded px-2 py-0.5"
                          style={
                            hex
                              ? { color: hex, background: `${hex}14` }
                              : undefined
                          }
                        >
                          <span className={hex ? "" : "text-faint"}>
                            {kind.label}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
