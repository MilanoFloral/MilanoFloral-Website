import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, align = "left", className }: { eyebrow: string; title: string; description?: string; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", align === "center" && "justify-center before:hidden")}>{eyebrow}</p>
      <h2 className="display mt-5 text-balance text-4xl leading-[1.04] sm:text-6xl">{title}</h2>
      {description && <p className="mt-5 text-pretty leading-8 text-[var(--muted-foreground)]">{description}</p>}
    </div>
  );
}
