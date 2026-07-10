import Link from "next/link";
import { SparklesIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PremiumPartnersSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-dashed border-accent/30 bg-gradient-to-br from-accent/10 via-card to-card px-6 py-10 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent/10">
          <SparklesIcon className="size-5.5 text-accent" />
        </span>
        <div className="flex flex-col gap-1.5">
          <h2 className="font-heading text-xl font-bold">Get Featured Here</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Premium listings get top placement on the homepage and area pages, a gold badge, and
            priority visibility to nearby customers.
          </p>
        </div>
        <Button asChild className="rounded-full px-5">
          <Link href="/get-listed">
            Feature your business <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </section>
  );
}
