import type { Metadata } from "next";
import Section from "../components/Section";
import Reveal from "../components/Reveal";
import RugDivider from "../components/RugDivider";
import CafeMap from "../components/CafeMap";
import { involvement, interests } from "../data/beyond";

export const metadata: Metadata = {
  title: "Beyond the Lab",
  description:
    "Dance, music, campus involvement, and an ongoing survey of New York cafés.",
};

export default function BeyondPage() {
  return (
    <div className="py-16 md:py-20">
      <Section
        eyebrow="Beyond"
        title="Beyond the lab"
        intro="The parts that don't fit on a résumé."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {interests.map((interest, i) => (
            <Reveal key={interest.title} delay={i * 0.06}>
              <article className="h-full rounded-xl border border-line bg-raised p-6">
                <h3 className="font-display text-xl tracking-tight">
                  {interest.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {interest.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <RugDivider />

      <Section
        eyebrow="Cafés"
        title="Café map"
        intro="Same idea as the embedding on the front page — points in a space, clustered by region. This one just happens to be the world."
      >
        <CafeMap />
      </Section>

      <RugDivider />

      <Section
        eyebrow="Involvement"
        title="Community"
        intro="Building community and amplifying underrepresented voices in STEM."
      >
        <ul className="divide-y divide-line rounded-xl border border-line bg-raised">
          {involvement.map((item) => (
            <li key={item.org} className="px-6 py-5">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-display text-lg tracking-tight">
                  {item.org}
                </h3>
                <span className="label text-accent">{item.role}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
