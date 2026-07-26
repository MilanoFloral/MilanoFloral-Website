import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Leaf, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "About", description: "Meet MilanoFloral and founder Dilukshi Dias." };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our story" title="Designed with intention. Delivered with heart." description="MilanoFloral brings planning discipline and floral artistry together so your celebration feels effortless, personal and beautifully complete." />
      <section className="section-space pt-0">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <AnimatedSection className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem]">
              <Image
                src="/20251010_140957.jpg"
                alt="Wedding planner arranging flowers"
                width={1000}
                height={1250}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={.1}>
            <p className="eyebrow">Meet the founder</p>
            <h2 className="display mt-6 text-5xl sm:text-6xl">Dilukshi Dias</h2>
            <p className="mt-2 text-xs font-bold uppercase tracking-[.2em] text-[var(--brand-deep)]">Founder & Creative Director</p>
            <div className="mt-7 space-y-5 leading-8 text-[var(--muted-foreground)]">
              <p>Dilukshi founded MilanoFloral around a simple belief: a wedding should not only look beautiful—it should feel calm, meaningful and true to the people at its centre.</p>
              <p>Her approach combines creative instinct with careful production. Every floral recipe, table detail, supplier conversation and timeline decision contributes to one complete guest experience.</p>
            </div>
            <Link href="/contact" className={`${buttonVariants()} mt-8`}>Start a conversation <ArrowRight className="size-4" /></Link>
          </AnimatedSection>
        </div>
      </section>
      <section className="section-space bg-white/45">
        <div className="container-shell">
          <SectionHeading eyebrow="What guides us" title="Beauty is in the feeling—and the follow-through." align="center" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              { icon: HeartHandshake, title: "Personal care", text: "We listen closely, communicate clearly and protect the joy of the process." },
              { icon: Leaf, title: "Considered beauty", text: "Every design choice has a purpose, from palette and proportion to guest flow." },
              { icon: Sparkles, title: "Quiet excellence", text: "Detailed plans and experienced hands make the final experience feel effortless." }
            ].map((item, index) => <AnimatedSection key={item.title} delay={index * .08} className="rounded-[2rem] border bg-[var(--background)] p-8 text-center"><item.icon className="mx-auto size-7 text-[var(--brand)]" strokeWidth={1.4} /><h3 className="display mt-5 text-3xl">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{item.text}</p></AnimatedSection>)}
          </div>
        </div>
      </section>
    </>
  );
}
