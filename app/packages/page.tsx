import type { Metadata } from "next";
import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AnimatedSection } from "@/components/animated-section";
import { buttonVariants } from "@/components/ui/button";
import { packages } from "@/lib/content";

export const metadata: Metadata = { title: "Wedding Firework Packages", description: "MilanoFloral wedding firework packages in Sri Lanka." };

export default function PackagesPage() {
  return (
    <>
      <PageHero eyebrow="Wedding fireworks" title="A sparkling finale, planned with elegance." description="Choose a starting package and we will refine timing, effects and venue suitability around your celebration." />
      <section className="section-space pt-0"><div className="container-shell grid gap-6 lg:grid-cols-3">{packages.map((item, index) => <AnimatedSection key={item.name} delay={index * .08} className={`relative flex flex-col rounded-[2.25rem] border p-8 sm:p-10 ${item.featured ? "border-[var(--brand)] bg-[var(--brand-soft)] shadow-xl" : "bg-white/65"}`}>{item.featured && <span className="absolute right-7 top-7 rounded-full bg-[var(--brand-deep)] px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-white">Most popular</span>}<item.icon className="size-9 text-[var(--brand)]" strokeWidth={1.3} /><p className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-[var(--brand-deep)]">{item.name}</p><h2 className="display mt-2 text-5xl">{item.price}</h2><p className="mt-5 text-sm leading-7 text-[var(--muted-foreground)]">{item.description}</p><ul className="mt-7 flex-1 space-y-3">{item.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm"><span className="mt-0.5 grid size-5 place-items-center rounded-full bg-white"><Check className="size-3 text-[var(--brand-deep)]" /></span>{feature}</li>)}</ul><Link href={`/contact?package=${item.name}`} className={`${buttonVariants({ variant: item.featured ? "default" : "outline" })} mt-9`}>Enquire about {item.name}</Link></AnimatedSection>)}</div><div className="container-shell mt-12 flex items-start gap-4 rounded-[1.5rem] border bg-white/60 p-6"><ShieldCheck className="mt-1 size-6 shrink-0 text-[var(--brand)]" /><div><p className="font-semibold">Venue suitability comes first</p><p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">Final effects, duration and availability are confirmed after a venue and safety review. Package inclusions may be adjusted to suit local permissions and conditions.</p></div></div></section>
    </>
  );
}
