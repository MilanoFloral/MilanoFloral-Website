"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 55]);

  return (
    <section ref={ref} className="noise relative min-h-[96svh] overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,223,218,.9),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(233,205,198,.7),transparent_30%)]" />
      <div className="container-shell relative grid min-h-[calc(96svh-6rem)] items-center gap-12 py-16 lg:grid-cols-[1.03fr_.97fr] lg:py-10">
        <motion.div style={{ y: textY }} className="relative z-10 max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="eyebrow">Wedding artistry · Sri Lanka</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .1, ease: [0.22, 1, 0.36, 1] }} className="display mt-7 text-balance text-6xl leading-[.9] sm:text-7xl lg:text-[6.8rem]">
            Celebrations,
            <span className="block italic text-[var(--brand)]">beautifully felt.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .35 }} className="mt-7 max-w-xl text-pretty text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
            MilanoFloral creates refined weddings through thoughtful planning, floral storytelling, immersive styling and unforgettable finishing moments.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .5 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={buttonVariants({ size: "lg" })}>Begin your story <ArrowUpRight className="size-4" /></Link>
            <Link href="/portfolio" className={buttonVariants({ variant: "outline", size: "lg" })}>View celebrations</Link>
          </motion.div>
          <div className="mt-12 flex items-center gap-8 text-xs uppercase tracking-[.18em] text-[var(--muted-foreground)]">
            <span>Planning</span><span className="size-1 rounded-full bg-[var(--brand)]" /><span>Florals</span><span className="size-1 rounded-full bg-[var(--brand)]" /><span>Events</span>
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[640px] lg:ml-auto">
          <motion.div style={{ y: imageY }} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: .15, ease: [0.22, 1, 0.36, 1] }} className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-t-[15rem] rounded-b-[2.5rem] shadow-[0_45px_110px_-45px_rgba(68,50,45,.55)]">
            <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90" alt="Elegant outdoor wedding ceremony designed with white florals" fill priority sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
          </motion.div>
          <motion.div initial={{ opacity: 0, rotate: -8, scale: .85 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: .8, delay: .65 }} className="absolute -left-2 bottom-16 grid size-36 place-items-center rounded-full border border-white/70 bg-[rgba(248,244,239,.86)] p-5 text-center shadow-xl backdrop-blur sm:size-44">
            <Sparkles className="mx-auto size-5 text-[var(--brand)]" />
            <p className="display mt-2 text-xl leading-tight">Made with meaning</p>
            <p className="mt-1 text-[10px] uppercase tracking-[.18em] text-[var(--muted-foreground)]">Since every love is different</p>
          </motion.div>
          <div className="absolute -right-2 top-10 h-[72%] w-[88%] rounded-t-[15rem] rounded-b-[2.5rem] border border-[var(--brand-muted)] -z-10" />
        </div>
      </div>
      <a href="#intro" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[.2em] text-[var(--muted-foreground)] md:flex">Discover <ArrowDown className="size-4 animate-bounce" /></a>
    </section>
  );
}
