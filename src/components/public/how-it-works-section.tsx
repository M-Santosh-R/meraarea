import { SearchIcon, CompassIcon, PhoneCallIcon } from "lucide-react";

const STEPS = [
  { icon: SearchIcon, title: "Search", description: "Look up a business, category, or service near you." },
  { icon: CompassIcon, title: "Discover", description: "Browse detailed pages with photos, hours, and services." },
  { icon: PhoneCallIcon, title: "Connect", description: "Call, WhatsApp, or get directions in one tap." },
];

export function HowItWorksSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="mb-10 text-center font-heading text-2xl font-bold">How It Works</h2>
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        {STEPS.map((step, index) => (
          <div
            key={step.title}
            style={{ animationDelay: `${index * 120}ms` }}
            className="flex flex-1 flex-col items-center gap-3 text-center animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-700 ease-out"
          >
            <div className="flex size-16 items-center justify-center rounded-full bg-accent/10 text-accent shadow-sm ring-4 ring-accent/5">
              <step.icon className="size-7" />
            </div>
            <h3 className="font-heading text-base font-semibold">
              {index + 1}. {step.title}
            </h3>
            <p className="max-w-[16rem] text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
