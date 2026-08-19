export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-5xl px-6 ${className}`}>
      <header className="mb-8">
        {eyebrow && <p className="label mb-3 text-faint">{eyebrow}</p>}
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{intro}</p>
        )}
      </header>
      {children}
    </section>
  );
}
