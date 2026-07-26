import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { process, services } from "@/lib/content";

export const metadata: Metadata = { title: "Services", description: "Wedding planning, floral design, destination events, event management and wedding fireworks." };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our services" title="One creative direction. Every detail connected." description="Choose full planning, styling, production or one focused service. We tailor the scope around what you need most." />
      <section className="section-space pt-0"><div className="container-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map((service, index) => <ServiceCard key={service.title} {...service} index={index} />)}</div></section>
      <section className="section-space bg-white/45"><div className="container-shell"><SectionHeading eyebrow="How we work" title="A process designed to keep you inspired—not overwhelmed." align="center" /><div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{process.map((item) => <div key={item.step} className="rounded-[2rem] border bg-[var(--background)] p-7"><p className="display text-5xl text-[var(--brand-muted)]">{item.step}</p><h3 className="display mt-4 text-3xl">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{item.description}</p></div>)}</div><div className="mt-12 text-center"><Link href="/contact" className={buttonVariants({ size: "lg" })}>Request a tailored proposal <ArrowRight className="size-4" /></Link></div></div></section>
    </>
  );
}
