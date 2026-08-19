import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Section from "../components/Section";
import Reveal from "../components/Reveal";
import RugDivider from "../components/RugDivider";
import CafeMap from "../components/CafeMap";
import { community } from "../data/beyond";

export const metadata: Metadata = {
  title: "Beyond the Lab",
  description:
    "Community work at Columbia, and a map of some of Ella Yee's favorite cafés.",
};

export default function BeyondPage() {
  const [featured, ...rest] = community;

  return (
    <div className="py-16 md:py-20">
      <Section
        title="Café map"
        intro="Some of my favorite cafés I've visited, from New York to the Bay Area to Taiwan and Seoul."
      >
        <CafeMap />
      </Section>

      <RugDivider />

      <Section
        title="Community"
      >
        {/* Society of Women Engineers leads, with the EEE photo. */}
        <Reveal>
          <article className="overflow-hidden rounded-xl border border-line bg-raised">
            {featured.photo && (
              <figure>
                <div className="relative aspect-[3/2] w-full bg-accent-wash">
                  <Image
                    src={featured.photo.src}
                    alt={featured.photo.alt}
                    fill
                    sizes="(min-width: 768px) 720px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="label border-b border-line px-6 py-2.5 text-faint">
                  {featured.photo.caption}
                </figcaption>
              </figure>
            )}

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-display text-xl tracking-tight">
                  {featured.org}
                </h3>
                <span className="label text-accent">{featured.role}</span>
              </div>
              {featured.period && (
                <p className="label mt-1 text-faint">{featured.period}</p>
              )}
              {featured.points && (
                <ul className="mt-4 space-y-2">
                  {featured.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm leading-relaxed text-muted"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              )}
              {featured.previously && (
                <p className="label mt-4 border-t border-line pt-4 text-faint">
                  previously · {featured.previously}
                </p>
              )}
            </div>
          </article>
        </Reveal>

        <ul className="mt-5 divide-y divide-line rounded-xl border border-line bg-raised">
          {rest.map((item) => (
            <li key={item.org} className="px-6 py-5">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-display text-lg tracking-tight">
                  {item.org}
                </h3>
                <span className="label text-accent">{item.role}</span>
                {item.period && (
                  <span className="label text-faint">{item.period}</span>
                )}
              </div>
              {item.points && (
                <ul className="mt-2 space-y-1.5">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm leading-relaxed text-muted"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              )}
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label mt-3 inline-flex items-center gap-1 text-accent transition-colors hover:text-accent-soft"
                >
                  {item.linkLabel ?? "open"}
                  <ArrowUpRight size={13} />
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
