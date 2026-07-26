import type { Metadata } from "next";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire with MilanoFloral about your wedding or event.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Begin your story"
        title="Tell us what you are dreaming of."
        description="Share the details you already know. We will reply with availability, next steps and a thoughtful starting point."
      />

      <section className="section-space pt-0">
        <div className="container-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <aside className="rounded-[2rem] bg-[#302a28] p-8 text-white sm:p-10">
            <p className="display text-4xl">
              Let’s talk.
            </p>

            <p className="mt-4 text-sm leading-7 text-white/60">
              For wedding planning, floral styling, private events and
              firework packages across Sri Lanka.
            </p>

            <div className="mt-9 space-y-6 text-sm">
              <a
                href="tel:+94771122907"
                className="flex items-center gap-4 transition hover:text-white/75"
              >
                <span className="grid size-11 place-items-center rounded-full bg-white/10">
                  <Phone className="size-4" />
                </span>

                <span>077 112 2907</span>
              </a>

              <a
                href="https://wa.me/94771122907"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 transition hover:text-white/75"
              >
                <span className="grid size-11 place-items-center rounded-full bg-white/10">
                  <MessageCircle className="size-4" />
                </span>

                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="mailto:milanofloral09@gmail.com"
                className="flex items-center gap-4 transition hover:text-white/75"
              >
                <span className="grid size-11 place-items-center rounded-full bg-white/10">
                  <Mail className="size-4" />
                </span>

                <span className="break-all">
                  milanofloral09@gmail.com
                </span>
              </a>

              <p className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full bg-white/10">
                  <MapPin className="size-4" />
                </span>

                <span>Sri Lanka</span>
              </p>
            </div>

            <div className="mt-10 border-t border-white/10 pt-7">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                Response time
              </p>

              <p className="mt-2 text-sm text-white/70">
                Usually within 1–2 business days.
              </p>
            </div>
          </aside>

          <div className="rounded-[2rem] border bg-white/60 p-7 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}