import Link from "next/link";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="label text-faint">
          © {new Date().getFullYear()} Ella Yee
        </p>
        <ul className="flex flex-wrap gap-5">
          {profile.socials.map((social) => (
            <li key={social.href}>
              <Link
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="label text-muted transition-colors hover:text-accent"
              >
                {social.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
