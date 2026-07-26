import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return <section className="container-shell grid min-h-[75vh] place-items-center pt-28 text-center"><div><p className="display text-8xl text-[var(--brand-muted)]">404</p><h1 className="display mt-3 text-5xl">This page has wandered away.</h1><p className="mt-5 text-[var(--muted-foreground)]">Let’s return to the celebration.</p><Link href="/" className={`${buttonVariants()} mt-7`}>Back home</Link></div></section>;
}
