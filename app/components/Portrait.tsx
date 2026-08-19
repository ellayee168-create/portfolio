import Image from "next/image";

/**
 * The monogram sits behind the image, so a missing or broken file degrades to
 * something intentional rather than a broken-image icon.
 */
export default function Portrait() {
  return (
    <div className="relative">
      <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-accent/25" />
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-accent-wash">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-display text-6xl text-accent/30"
        >
          EY
        </span>
        <Image
          src="/ella.jpg"
          alt="Ella Yee"
          fill
          priority
          sizes="(min-width: 768px) 320px, 60vw"
          className="relative object-cover"
        />
      </div>
    </div>
  );
}
