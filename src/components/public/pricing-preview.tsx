import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TIERS = [
  {
    name: "Basic",
    price: "₹1,200/yr",
    monthly: "~₹100/mo",
    features: ["Business page with contact details", "Listed in area & category search", "Business hours & address"],
    detailedFeatures: ["Google Maps location", "Services list", "SEO-friendly page"],
  },
  {
    name: "Plus",
    price: "₹1,400/yr",
    monthly: "~₹117/mo",
    highlighted: true,
    features: ["Everything in Basic", "Featured on your area page", "Photo gallery"],
    detailedFeatures: ["Up to 5 gallery photos", "Priority placement in area search", "Verified badge eligibility"],
  },
  {
    name: "Premium",
    price: "Contact us",
    monthly: null,
    features: ["Everything in Plus", "Featured on the homepage", "Priority support"],
    detailedFeatures: ["Homepage featured placement", "Unlimited gallery photos", "Dedicated onboarding support"],
  },
];

export function PricingPreview({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl font-bold">Simple, Affordable Pricing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Keep your listing active year-round for less than the cost of a coffee a month.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {TIERS.map((tier, index) => (
          <Card
            key={tier.name}
            style={{ animationDelay: `${index * 100}ms` }}
            className={
              (tier.highlighted
                ? "shadow-md ring-2 ring-accent transition-all hover:-translate-y-0.5 hover:shadow-lg"
                : "shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg") +
              " animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-700 ease-out"
            }
          >
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                {tier.highlighted && <Badge>Popular</Badge>}
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-accent">{tier.price}</p>
                {tier.monthly && <p className="text-xs text-muted-foreground">{tier.monthly}</p>}
              </div>
              <ul className="flex flex-col gap-1.5">
                {[...tier.features, ...(detailed ? tier.detailedFeatures : [])].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild variant={tier.highlighted ? "default" : "outline"} className="mt-1 rounded-full">
                <Link href="/get-listed#get-listed">{tier.price === "Contact us" ? "Contact Us" : `Choose ${tier.name}`}</Link>
              </Button>
              {tier.highlighted && (
                <p className="text-center text-xs text-muted-foreground">Most businesses choose Plus</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {!detailed && (
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link href="/get-listed">View Pricing &amp; Get Listed</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
