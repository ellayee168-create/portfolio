import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Umap from "./components/Umap";
import Portrait from "./components/Portrait";
import Reveal from "./components/Reveal";
import RugDivider from "./components/RugDivider";
import Section from "./components/Section";
import ProjectCard from "./components/ProjectCard";
import Contact from "./components/Contact";
import { profile } from "./data/profile";
import { featured } from "./data/experience";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-8 md:pt-24">
        <div className="grid items-start gap-12 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-3 max-w-md text-balance text-lg text-muted md:text-xl">
              {profile.title}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm text-white transition-colors hover:bg-accent-soft"
              >
                Get in touch <ArrowRight size={16} />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-raised px-5 py-3 text-sm transition-colors hover:border-accent/40 hover:text-accent"
              >
                Résumé
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="mx-auto w-48 md:mx-0 md:w-64">
              <Portrait />
            </div>
            <div className="mx-auto w-full max-w-[400px] md:mx-0">
              <Umap />
            </div>
          </div>
        </div>

      </section>

      <RugDivider />

      {/* --------------------------------------------------------------- About */}
      <Reveal>
        <Section id="about" title="About">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4 leading-relaxed text-muted">
              {profile.about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <dl className="space-y-5">
              {profile.skills.map((group) => (
                <div key={group.group}>
                  <dt className="label mb-2 text-faint">{group.group}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="label rounded border border-line bg-raised px-2 py-1 text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      </Reveal>

      <RugDivider />

      {/* ------------------------------------------------------ Selected work */}
      <Reveal>
        <Section
          title="Selected work"
          intro="Recent work — the full list is on the research page."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {featured.map((entry, i) => (
              <Reveal key={entry.title} delay={i * 0.06}>
                <ProjectCard entry={entry} />
              </Reveal>
            ))}
          </div>

          <Link
            href="/research"
            className="label mt-8 inline-flex items-center gap-1.5 text-accent transition-colors hover:text-accent-soft"
          >
            All research & projects <ArrowRight size={14} />
          </Link>
        </Section>
      </Reveal>

      <RugDivider />

      {/* ------------------------------------------------------------- Contact */}
      <Reveal>
        <Contact />
      </Reveal>
    </>
  );
}
