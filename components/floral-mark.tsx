import { Flower2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloralMark({ className }: { className?: string }) {
  return (
    <div className={cn("relative grid size-12 place-items-center rounded-full border border-[var(--border)] bg-white/65", className)} aria-hidden="true">
      <Flower2 className="size-5 text-[var(--brand)]" strokeWidth={1.3} />
      <span className="absolute inset-1 rounded-full border border-dashed border-[var(--brand-muted)] flower-orbit" />
    </div>
  );
}
