"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PortfolioGrid({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? portfolio.slice(0, limit) : portfolio;
  return (
    <div className="grid auto-rows-[280px] gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <motion.article key={item.title} initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: .7, delay: index * .06 }} className={cn("group relative overflow-hidden rounded-[2rem]", item.size === "large" && "md:row-span-2")}>
          <Image src={item.image} alt={`${item.title} — ${item.category}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-80 transition group-hover:opacity-95" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
            <div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/70">{item.category}</p><h3 className="display mt-1 text-3xl">{item.title}</h3></div>
            <span className="grid size-11 translate-y-3 place-items-center rounded-full bg-white text-black opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight className="size-4" /></span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
