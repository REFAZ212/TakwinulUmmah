interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">{eyebrow}</span>
      )}
      <h2 className="mt-2 font-display text-2xl font-bold text-deep lg:text-3xl">{title}</h2>
      {description && (
        <p className={`mt-3 text-sm text-ink-soft ${align === "center" ? "mx-auto max-w-lg" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
