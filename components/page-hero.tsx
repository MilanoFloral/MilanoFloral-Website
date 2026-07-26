import { Badge } from "@/components/ui/badge";

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-40 sm:pb-28 sm:pt-48">
      <div className="absolute -right-24 top-20 size-[28rem] rounded-full bg-[var(--brand-soft)] blur-3xl" />
      <div className="absolute -left-20 top-48 size-64 rounded-full border border-[var(--brand-muted)]" />
      <div className="container-shell relative max-w-5xl text-center">
        <Badge>{eyebrow}</Badge>
        <h1 className="display mx-auto mt-7 max-w-4xl text-balance text-5xl leading-[.98] sm:text-7xl lg:text-8xl">{title}</h1>
        <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">{description}</p>
      </div>
    </section>
  );
}
