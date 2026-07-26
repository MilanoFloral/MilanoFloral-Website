"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const email = new FormData(event.currentTarget).get("email");
    try {
      const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (!response.ok) throw new Error();
      setState("done");
      event.currentTarget.reset();
    } catch { setState("error"); }
  }
  return (
    <form onSubmit={submit} className="mt-5">
      <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/5 p-1">
        <input name="email" type="email" required aria-label="Email for newsletter" placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/35" />
        <button type="submit" aria-label="Subscribe" className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#302a28]">{state === "loading" ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}</button>
      </div>
      {state === "done" && <p className="mt-2 text-xs text-white/60">You’re on the list. Thank you.</p>}
      {state === "error" && <p className="mt-2 text-xs text-red-200">Please try again.</p>}
    </form>
  );
}
