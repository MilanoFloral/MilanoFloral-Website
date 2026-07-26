"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to send your enquiry.");
      setStatus("success");
      setFeedback(result.message || "Thank you. We will be in touch shortly.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">Your name<Input name="name" required placeholder="Your full name" /></label>
        <label className="space-y-2 text-sm font-medium">Email address<Input name="email" type="email" required placeholder="you@example.com" /></label>
        <label className="space-y-2 text-sm font-medium">Phone number<Input name="phone" type="tel" placeholder="Optional" /></label>
        <label className="space-y-2 text-sm font-medium">Preferred event date<Input name="eventDate" type="date" /></label>
        <label className="space-y-2 text-sm font-medium">Event type
          <select name="eventType" required defaultValue="" className="flex h-12 w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]">
            <option value="" disabled>Select an event</option><option>Wedding</option><option>Engagement</option><option>Homecoming</option><option>Destination event</option><option>Private celebration</option><option>Other</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium">Location<Input name="location" required placeholder="Location" /></label>
        <label className="space-y-2 text-sm font-medium">Estimated investment
          <select name="budget" defaultValue="" className="flex h-12 w-full rounded-xl border border-[var(--border)] bg-white/70 px-4 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)]">
            <option value="">Prefer to discuss</option><option>Below LKR 250,000</option><option>LKR 250,000 – 500,000</option><option>LKR 500,000 – 1,000,000</option><option>Above LKR 1,000,000</option>
          </select>
        </label>
      </div>
      <label className="block space-y-2 text-sm font-medium">Tell us about your celebration<Textarea name="message" required placeholder="Venue, guest count, style, priorities and anything already decided..." /></label>
      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">{status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />} Send enquiry</Button>
      {feedback && <p role="status" className={`flex items-center gap-2 text-sm ${status === "success" ? "text-emerald-700" : "text-red-700"}`}>{status === "success" && <CheckCircle2 className="size-4" />}{feedback}</p>}
    </form>
  );
}
