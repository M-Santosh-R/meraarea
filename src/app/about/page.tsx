import type { Metadata } from "next";
import { CompassIcon, TargetIcon, SproutIcon } from "lucide-react";
import { DecorativeGlow } from "@/components/shared/decorative-glow";

export const metadata: Metadata = { title: "About" };

const PILLARS = [
  {
    icon: TargetIcon,
    title: "Our Mission",
    body: "Make it effortless for anyone to find trusted businesses nearby, while giving every local business — from a neighbourhood dental clinic to a family-run restaurant — a professional page they can proudly share.",
  },
  {
    icon: SproutIcon,
    title: "Our Goal",
    body: "We're starting small: launch successfully in one area, onboard the first few businesses, and grow gradually to more areas and cities once the platform is stable and useful.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative overflow-hidden bg-muted/60 py-16">
        <DecorativeGlow />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-accent/10">
            <CompassIcon className="size-7 text-accent" />
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">About MeraArea</h1>
          <p className="font-heading max-w-xl text-lg text-muted-foreground italic">
            MeraArea is a hyperlocal business listing platform. We help people discover local
            businesses, and help businesses build an affordable online presence — without needing
            a full website of their own.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
        {PILLARS.map((pillar) => (
          <div key={pillar.title} className="flex flex-col gap-3 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10">
            <span className="flex size-11 items-center justify-center rounded-full bg-accent/10">
              <pillar.icon className="size-5 text-accent" />
            </span>
            <h2 className="font-heading text-lg font-semibold">{pillar.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
