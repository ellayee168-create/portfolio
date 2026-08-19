import { Mail, Linkedin, Github, FileText } from "lucide-react";
import { profile } from "../data/profile";

const ICONS = { Email: Mail, LinkedIn: Linkedin, GitHub: Github, "Résumé": FileText };

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6">
      <p className="label mb-3 text-faint">05 / Contact</p>
      <h2 className="font-display text-3xl tracking-tight md:text-4xl">
        Let&apos;s connect
      </h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        I&apos;m looking for summer 2027 opportunities in computational biology,
        biotech, and cancer research — and always happy to talk about
        single-cell data, generative models, or where to find good coffee near
        campus.
      </p>

      <ul className="mt-8 flex flex-wrap gap-3">
        {profile.socials.map((social) => {
          const Icon = ICONS[social.label as keyof typeof ICONS] ?? Mail;
          const external = social.href.startsWith("http");
          const primary = social.label === "Email";
          return (
            <li key={social.href}>
              <a
                href={social.href}
                target={external || social.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm transition-colors ${
                  primary
                    ? "bg-accent text-white hover:bg-accent-soft"
                    : "border border-line bg-raised text-ink hover:border-accent/40 hover:text-accent"
                }`}
              >
                <Icon size={16} />
                {primary ? profile.email : social.label}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
