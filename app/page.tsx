import Image from "next/image";
import Link from "next/link";


import { AnimatedSection } from "@/components/animated-section";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { FloralMark } from "@/components/floral-mark";
import { buttonVariants } from "@/components/ui/button";


import {
  packages,
  process,
  services,
  testimonials,
} from "@/lib/content";

import {
  ArrowDown,
  ArrowRight,
  Check,
  Quote,
  Sparkles,
} from "lucide-react";

const selectedPortfolioImages = [
  {
    src: "/B48A5887.jpg",
    alt: "Elegant MilanoFloral wedding celebration",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/DSC01981.jpg",
    alt: "Luxury wedding floral styling",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/HF_02137.jpg",
    alt: "Romantic wedding ceremony details",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/SM_01048.JPG",
    alt: "MilanoFloral reception decoration",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/THU02563.jpg",
    alt: "Beautiful outdoor wedding setup",
    className: "md:col-span-1 md:row-span-1",
  },
];

export default function HomePage() {
  return (
    <>
      {/* =========================================================
          FULL-SCREEN LANDING HERO
      ========================================================== */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        {/* Full-screen background image */}
        <Image
          src="/DSC01919.jpg"
          alt="MilanoFloral luxury wedding ceremony"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark image overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Directional gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />

        {/* Soft lower gradient */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Hero content */}
        <div className="container-shell relative z-10 w-full pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pt-40">
          <div className="max-w-4xl">
            <AnimatedSection>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/75 sm:text-sm">
                Wedding Planning · Floral Design · Event Styling
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className="display max-w-4xl text-balance text-6xl leading-[0.92] tracking-[-0.04em] text-white sm:text-7xl md:text-8xl lg:text-[7.5rem]">
                Celebrations,
                <span className="mt-2 block italic text-[#efd8d1]">
                  beautifully felt.
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="mt-8 max-w-2xl text-pretty text-base leading-8 text-white/80 sm:text-lg sm:leading-9">
                Luxury wedding planning, floral artistry and unforgettable
                event experiences thoughtfully designed around your story.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className={`${buttonVariants({
                    size: "lg",
                  })} group bg-white text-black hover:bg-[#ead8d2]`}
                >
                  Plan your wedding

                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/portfolio"
                  className={`${buttonVariants({
                    variant: "outline",
                    size: "lg",
                  })} border-white/60 bg-white/5 text-white backdrop-blur-md hover:border-white hover:bg-white hover:text-[#302a28]`}
                >
                  Explore our work
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/70 md:flex">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
            Discover
          </span>

          <a
            href="#intro"
            aria-label="Scroll to next section"
            className="text-white transition hover:text-white/70"
          >
            <ArrowDown
              className="h-8 w-6 animate-bounce"
              strokeWidth={1.3}
            />
          </a>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================== */}
      <section id="intro" className="section-space">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <AnimatedSection className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem]">
              <Image
                src="/SM_01048.JPG"
                alt="Elegant wedding table with florals and candles"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />  
            </div>

            <div className="absolute -bottom-8 -right-5 max-w-[230px] rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)] p-6 shadow-xl sm:-right-10">
              <p className="display text-4xl text-[var(--brand)]">
                10+
              </p>

              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                Years of thoughtful celebrations
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            <p className="eyebrow">Our philosophy</p>

            <h2 className="display mt-6 text-balance text-5xl leading-[1.02] sm:text-6xl">
              A beautiful event begins with how it should{" "}
              <em className="text-[var(--brand)]">feel.</em>
            </h2>

            <p className="mt-7 text-pretty leading-8 text-[var(--muted-foreground)]">
              We begin with your story, not a template. Then we shape every
              visual, logistical and emotional detail into one effortless
              experience—warm, refined and unmistakably yours.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Personal creative direction",
                "Calm end-to-end coordination",
                "Trusted supplier network",
                "Purposeful, photo-ready details",
              ].map((item) => (
                <p
                  key={item}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--brand-soft)]">
                    <Check className="size-3.5 text-[var(--brand-deep)]" />
                  </span>

                  {item}
                </p>
              ))}
            </div>

            <Link
              href="/about"
              className={`${buttonVariants({
                variant: "outline",
              })} mt-9`}
            >
              Meet MilanoFloral
              <ArrowRight className="size-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* =========================================================
          SERVICES
      ========================================================== */}
      <section className="section-space bg-white/45">
        <div className="container-shell">
          <SectionHeading
            eyebrow="What we create"
            title="Everything your celebration needs, held in one vision."
            description="From first decisions to final installations, our team keeps your event cohesive, considered and calm."
            align="center"
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard
                key={service.title}
                {...service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PORTFOLIO
      ========================================================== */}
      <section className="section-space">
        <div className="container-shell">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Selected celebrations"
              title="Details that linger long after the last dance."
              description="A glimpse into the weddings, floral installations and meaningful moments we have thoughtfully created."
            />

            <Link
              href="/portfolio"
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Explore portfolio
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[270px] md:grid-cols-4">
            {selectedPortfolioImages.map((image, index) => (
              <AnimatedSection
                key={image.src}
                delay={index * 0.08}
                className={image.className}
              >
                <Link
                  href="/portfolio"
                  className="group relative block h-full overflow-hidden rounded-[1.75rem] bg-[#eee6e1]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 100vw, 25vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    

                    <span className="grid size-10 translate-y-2 place-items-center rounded-full border border-white/35 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-8 flex justify-center lg:hidden">
            <Link
              href="/portfolio"
              className={buttonVariants({
                variant: "outline",
              })}
            >
              View full gallery
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROCESS
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#302a28] py-24 text-white sm:py-32">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        <div className="container-shell">
          <SectionHeading
            eyebrow="The experience"
            title="A clear, caring process from hello to celebration."
            description="You always know what comes next, while we quietly manage what happens behind the scenes."
            align="center"
            className="[&_.eyebrow]:text-[#e9cdc6] [&_p:last-child]:text-white/55"
          />

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <AnimatedSection
                key={item.step}
                delay={index * 0.08}
                className="relative text-center"
              >
                <p className="display text-6xl text-white/10">
                  {item.step}
                </p>

                <FloralMark className="mx-auto -mt-7 bg-[#302a28]" />

                <h3 className="display mt-5 text-3xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {item.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FIREWORK PACKAGES
      ========================================================== */}
      <section className="section-space">
        <div className="container-shell grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <AnimatedSection className="lg:sticky lg:top-28">
            <p className="eyebrow">Wedding fireworks</p>

            <h2 className="display mt-6 text-5xl leading-[1.02] sm:text-6xl">
              End the evening with a little more{" "}
              <em className="text-[var(--brand)]">magic.</em>
            </h2>

            <p className="mt-6 leading-8 text-[var(--muted-foreground)]">
              Venue-conscious pyrotechnic displays, timed around entrances,
              cake cutting or your final dance.
            </p>

            <Link
              href="/packages"
              className={`${buttonVariants()} mt-8`}
            >
              View all packages
              <Sparkles className="size-4" />
            </Link>
          </AnimatedSection>

          <div className="space-y-5">
            {packages.map((item, index) => (
              <AnimatedSection
                key={item.name}
                delay={index * 0.07}
                className={`rounded-[2rem] border p-7 sm:p-9 ${
                  item.featured
                    ? "border-[var(--brand)] bg-[var(--brand-soft)]"
                    : "bg-white/60"
                }`}
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-deep)]">
                      {item.name} package
                    </p>

                    <p className="display mt-2 text-4xl">
                      {item.price}

                      <span className="ml-1 text-base text-[var(--muted-foreground)]">
                        /-
                      </span>
                    </p>
                  </div>

                  <item.icon
                    className="size-9 text-[var(--brand)]"
                    strokeWidth={1.3}
                  />
                </div>

                <p className="mt-5 text-sm leading-7 text-[var(--muted-foreground)]">
                  {item.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS
      ========================================================== */}
      <section className="section-space bg-[var(--brand-soft)]">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Kind words"
            title="What our couples remember most."
            align="center"
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <AnimatedSection
                key={item.name}
                delay={index * 0.08}
                className="rounded-[2rem] border border-white/60 bg-white/55 p-8"
              >
                <Quote
                  className="size-8 text-[var(--brand)]"
                  strokeWidth={1.2}
                />

                <blockquote className="display mt-6 text-2xl leading-snug">
                  “{item.quote}”
                </blockquote>

                <p className="mt-7 text-sm font-semibold">
                  {item.name}
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                  {item.event}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CALL TO ACTION
      ========================================================== */}
      <section className="section-space">
        <div className="container-shell relative overflow-hidden rounded-[3rem] bg-[#b58378] px-7 py-16 text-center text-white sm:px-16 sm:py-24">
          <div className="absolute -left-24 -top-24 size-80 rounded-full border border-white/15" />

          <div className="absolute -bottom-32 -right-20 size-96 rounded-full border border-white/15" />

          <p className="relative text-xs font-bold uppercase tracking-[0.24em] text-white/65">
            Your story starts here
          </p>

          <h2 className="display relative mx-auto mt-6 max-w-3xl text-balance text-5xl leading-[1] sm:text-7xl">
            Let’s create a celebration that feels like you.
          </h2>

          <p className="relative mx-auto mt-6 max-w-xl leading-8 text-white/70">
            Share what you are dreaming of, even when it is only a feeling.
            We will help shape the rest.
          </p>

          <Link
            href="/contact"
            className={`${buttonVariants({
              size: "lg",
            })} relative mt-9 bg-white text-black hover:bg-[#302a28] hover:text-white`}
          >
            Plan with us
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}