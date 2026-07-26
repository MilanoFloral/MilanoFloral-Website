"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Allura } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { navigation } from "@/lib/content";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/* Allura brand font */
const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-black/5 bg-[rgba(248,244,239,.88)] py-2 shadow-sm backdrop-blur-xl"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-shell flex h-14 items-center justify-between">
        {/* Logo and brand name */}
        <Link
          href="/"
          aria-label="MilanoFloral home"
          className="relative z-50 flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <div className="relative h-16 w-16 shrink-0 sm:h-[72px] sm:w-[72px]">
            <Image
              src="/milanofloral-logo-light.png"
              alt="MilanoFloral logo"
              fill
              priority
              sizes="72px"
              className={cn(
                "object-contain transition-opacity duration-500",
                !scrolled && isHomePage ? "opacity-100" : "opacity-0"
              )}
            />

            <Image
              src="/milanofloral-logo-dark.png"
              alt=""
              fill
              priority
              sizes="72px"
              aria-hidden="true"
              className={cn(
                "object-contain transition-opacity duration-500",
                scrolled || !isHomePage ? "opacity-100" : "opacity-0"
              )}
            />
          </div>

          <span
            className={cn(
              allura.className,
              "whitespace-nowrap text-[1.5rem] leading-none transition-colors duration-500 sm:text-[1.8rem]",
              scrolled || !isHomePage
                ? "text-[#4f3731]"
                : "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
            )}
          >
            MilanoFloral
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative py-2 text-xs font-semibold uppercase tracking-[0.16em] transition",
                scrolled || !isHomePage
                  ? "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  : "text-white/80 hover:text-white",
                pathname === item.href &&
                  (scrolled || !isHomePage
                    ? "text-[var(--foreground)]"
                    : "text-white")
              )}
            >
              {item.label}

              {pathname === item.href && (
                <motion.span
                  layoutId="nav-dot"
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full",
                    scrolled || !isHomePage
                      ? "bg-[var(--brand)]"
                      : "bg-white"
                  )}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop contact button */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({
                size: "sm",
              }),
              !scrolled &&
                isHomePage &&
                "bg-white text-[#4f3731] hover:bg-[#ead8d2]"
            )}
          >
            Plan your celebration
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className={cn(
            "grid size-11 place-items-center rounded-full border lg:hidden",
            scrolled || !isHomePage
              ? "border-[var(--border)] bg-white/55 text-[var(--foreground)]"
              : "border-white/35 bg-black/10 text-white backdrop-blur-md"
          )}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
        >
          {open ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="overflow-hidden border-t border-black/5 bg-[var(--background)] lg:hidden"
          >
            <nav className="container-shell flex flex-col py-6">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{
                    opacity: 0,
                    x: -12,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                  }}
                >
                  <Link
                    href={item.href}
                    className="display block border-b border-[var(--border)] py-4 text-2xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <Link
                href="/contact"
                className={`${buttonVariants()} mt-6`}
              >
                Plan your celebration
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}