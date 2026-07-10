import type { Metadata } from "next";
import { StoreIcon } from "lucide-react";
import { DecorativeGlow } from "@/components/shared/decorative-glow";
import { WhyMeraAreaSection } from "@/components/public/why-meraarea-section";
import { HowItWorksSection } from "@/components/public/how-it-works-section";
import { PricingPreview } from "@/components/public/pricing-preview";
import { FaqAccordion, GET_LISTED_FAQ } from "@/components/public/faq-accordion";
import { GetListedCta } from "@/components/public/get-listed-cta";

export const metadata: Metadata = {
  title: "Get Listed",
  description: "List your business on MeraArea and give it an affordable online presence.",
};

export default function GetListedPage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 to-transparent">
        <DecorativeGlow />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-accent/15">
            <StoreIcon className="size-7 text-accent" />
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Get Your Business Listed on MeraArea
          </h1>
          <p className="font-heading text-lg text-muted-foreground italic">
            Share one simple link with your customers instead of sending photos, location, and
            contact details separately, every time.
          </p>
        </div>
      </section>

      <WhyMeraAreaSection />
      <HowItWorksSection />
      <PricingPreview detailed />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <FaqAccordion items={GET_LISTED_FAQ} />
      </div>
      <GetListedCta />
    </div>
  );
}
