"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarHeart, Camera, Check, Flower2, MapPinned, PartyPopper, Sparkles } from "lucide-react";
import Link from "next/link";

const icons = { calendar: CalendarHeart, flower: Flower2, map: MapPinned, party: PartyPopper, sparkles: Sparkles, camera: Camera } as const;

export function ServiceCard({ icon, title, description, details, index = 0 }: { icon: string; title: string; description: string; details: string[]; index?: number }) {
  const Icon = icons[icon as keyof typeof icons] ?? Sparkles;
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65, delay: index * .07 }} whileHover={{ y: -7 }} className="group relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white/60 p-7 shadow-[0_28px_70px_-55px_rgba(68,50,45,.5)] backdrop-blur sm:p-8">
      <div className="absolute right-0 top-0 size-28 translate-x-1/3 -translate-y-1/3 rounded-full bg-[var(--brand-soft)] transition duration-500 group-hover:scale-150" />
      <div className="relative grid size-12 place-items-center rounded-full bg-[var(--brand-soft)] text-[var(--brand-deep)]"><Icon className="size-5" strokeWidth={1.5} /></div>
      <h3 className="display relative mt-7 text-3xl">{title}</h3>
      <p className="relative mt-3 leading-7 text-[var(--muted-foreground)]">{description}</p>
      <ul className="relative mt-6 space-y-2.5 text-sm">
        {details.map((detail) => <li key={detail} className="flex items-center gap-2.5"><Check className="size-3.5 text-[var(--brand)]" />{detail}</li>)}
      </ul>
      <Link href="/contact" className="relative mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[var(--brand-deep)]">Enquire <ArrowUpRight className="size-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
    </motion.article>
  );
}
