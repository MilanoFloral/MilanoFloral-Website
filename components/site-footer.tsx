import Image from "next/image";
import Link from "next/link";
import { Allura } from "next/font/google";
import { Camera, Mail, MapPin, Phone } from "lucide-react";

import { navigation } from "@/lib/content";
import { NewsletterForm } from "@/components/newsletter-form";

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[#302a28] text-[#f8f4ef]">
      {/* Decorative background circles */}
      <div className="absolute -right-20 -top-20 size-80 rounded-full border border-white/10" />
      <div className="absolute -right-8 -top-8 size-52 rounded-full border border-white/10" />

      <div className="container-shell grid gap-12 py-16 lg:grid-cols-[1.25fr_.75fr_.8fr] lg:py-20">
        {/* Brand section */}
        <div>
          <Link
            href="/"
            aria-label="MilanoFloral home"
            className="relative z-10 inline-flex items-center gap-3"
          >
            <div className="relative h-30 w-30 shrink-0 sm:h-[72px] sm:w-[72px]">
              <Image
                src="/milanofloral-logo-light.png"
                alt="MilanoFloral logo"
                fill
                sizes="100px"
                className="object-contain"
              />
            </div>

            <span
              className={`${allura.className} whitespace-nowrap text-[2.4rem] leading-none text-white sm:text-[3rem]`}            >
              MilanoFloral
            </span>
          </Link>

          <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
            Wedding planning, floral artistry, event production and elegant
            pyrotechnic moments for celebrations made to be remembered.
          </p>

          <div className="mt-7 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:bg-white hover:text-[#302a28]"
            >
              <Camera className="size-4" />
            </a>

            <a
              href="mailto:milanofloral@mail.com"
              aria-label="Email MilanoFloral"
              className="grid size-10 place-items-center rounded-full border border-white/15 transition hover:bg-white hover:text-[#302a28]"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        {/* Navigation and contact */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
            Explore
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/70">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 space-y-3 text-sm text-white/65">
            <a
              href="tel:+94771122907"
              className="flex items-center gap-3 transition hover:text-white"
            >
              <Phone className="size-4" />
              077 112 2907
            </a>

            <a
              href="mailto:milanofloral09@gmail.com"
              className="flex items-center gap-3 transition hover:text-white"
            >
              <Mail className="size-4" />
              milanofloral09@gmail.com
            </a>

            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              Sri Lanka
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">
            Love letters
          </p>

          <p className="mt-5 text-sm leading-6 text-white/65">
            Occasional inspiration, recent celebrations and planning notes.
          </p>

          <NewsletterForm />
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} MilanoFloral. All rights reserved.
          </p>

          <p>Created for celebrations with soul.</p>
        </div>
      </div>
    </footer>
  );
}