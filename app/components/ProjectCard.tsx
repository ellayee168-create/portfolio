import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Entry } from "../data/experience";
import { CLUSTER_BY_ID } from "../data/clusters";

const LINK_LABEL: Record<string, string> = {
  paper: "paper",
  poster: "poster",
  code: "code",
  demo: "demo",
  site: "site",
};

export default function ProjectCard({ entry }: { entry: Entry }) {
  const cluster = CLUSTER_BY_ID[entry.cluster];

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-raised p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-line/60 hover:shadow-[0_8px_28px_-18px_rgba(31,26,23,0.4)]">
      {/* Cluster rule — the card's tie back to the hero embedding. */}
      <span
        aria-hidden="true"
        className="absolute left-6 right-6 top-0 h-px"
        style={{ background: cluster.hex, opacity: 0.5 }}
      />

      <div className="mb-3 flex items-center gap-2">
        <span
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: cluster.hex }}
        />
        <span className="label text-faint">{entry.category}</span>
      </div>

      <h3 className="font-display text-xl leading-snug tracking-tight">
        {entry.title}
      </h3>

      <p className="mt-2 text-sm text-muted">
        {entry.org}
        {entry.role && <span className="text-faint"> · {entry.role}</span>}
      </p>
      <p className="label mt-1 text-faint">
        {entry.period}
        {entry.location && ` · ${entry.location}`}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        {entry.description}
        {entry.inlineLinks && (
          <span className="text-muted">
            {" "}
            Tools:{" "}
            {entry.inlineLinks.map((link, i) => (
              <span key={link.href}>
                {i > 0 && ", "}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2 hover:text-accent-soft"
                >
                  {link.label}
                </a>
              </span>
            ))}
            .
          </span>
        )}
      </p>

      {entry.figure && (
        <figure className="mt-5 overflow-hidden rounded-lg border border-line bg-paper">
          <Image
            src={entry.figure.src}
            alt={entry.figure.alt}
            width={480}
            height={480}
            unoptimized
            className="h-40 w-full object-cover"
          />
          <figcaption className="label border-t border-line px-3 py-2 text-faint">
            {entry.figure.caption}
          </figcaption>
        </figure>
      )}

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {entry.tags.map((tag) => (
          <li
            key={tag}
            className="label rounded border border-line px-2 py-1 text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      {entry.links && entry.links.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-4 border-t border-line pt-4">
          {entry.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label inline-flex items-center gap-1 text-accent transition-colors hover:text-accent-soft"
              >
                {LINK_LABEL[link.kind] ?? link.kind}
                <ArrowUpRight size={13} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
