import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Section from "../components/Section";
import Reveal from "../components/Reveal";
import RugDivider from "../components/RugDivider";
import { publications, awards } from "../data/awards";

export const metadata: Metadata = {
  title: "Awards & Publications",
  description:
    "Peer-reviewed publications, research fellowships, and competition awards.",
};

export default function AwardsPage() {
  return (
    <div className="py-16 md:py-20">
      <Section
        title="Publications"
        intro="Peer-reviewed work presented at bioinformatics and computational biology conferences."
      >
        <ol className="space-y-4">
          {publications.map((pub, i) => (
            <Reveal key={pub.title} delay={i * 0.06}>
              <li className="rounded-xl border border-line bg-raised p-6">
                <p className="label mb-3 text-accent">{pub.venue}</p>
                <h3 className="font-display text-lg leading-snug tracking-tight">
                  {pub.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{pub.note}</p>
                {pub.href && (
                  <a
                    href={pub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label mt-4 inline-flex items-center gap-1 text-accent transition-colors hover:text-accent-soft"
                  >
                    doi: {pub.doi}
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <RugDivider />

      <Section title="Awards & honors">
        <ul className="divide-y divide-line rounded-xl border border-line bg-raised">
          {awards.map((award) => (
            <li
              key={award.name}
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-6 py-4"
            >
              <span className="font-display text-lg tracking-tight">
                {award.name}
              </span>
              <span className="min-w-0 grow text-sm text-muted">
                {award.detail}
              </span>
              <span className="label shrink-0 text-faint">{award.year}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
