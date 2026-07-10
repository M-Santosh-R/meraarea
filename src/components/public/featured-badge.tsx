import { CrownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Shared gold treatment for "Featured" listings, used wherever a business's
// featuredHomepage/featuredAreaPage flag is surfaced, so the badge and the
// card-level glow read as one consistent premium tier across the site.
export function FeaturedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-2 py-1 text-xs font-semibold text-amber-950 shadow-sm ring-1 ring-amber-300/70 dark:ring-amber-400/40",
        className
      )}
    >
      <CrownIcon className="size-3" />
      Featured
    </span>
  );
}

export const FEATURED_CARD_CLASSES =
  "ring-2 ring-amber-400/50 shadow-md hover:shadow-xl hover:shadow-amber-500/20 dark:ring-amber-400/30";
