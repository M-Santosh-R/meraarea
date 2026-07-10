import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ items, title = "Frequently Asked Questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-l-4 border-accent pl-3 font-heading text-xl font-bold">{title}</h2>
      <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/8">
        <Accordion type="single" collapsible className="divide-y divide-border">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              style={{ animationDelay: `${index * 60}ms` }}
              className="border-b-0 px-5 animate-in fade-in slide-in-from-bottom-2 fill-mode-backwards duration-500 ease-out"
            >
              <AccordionTrigger className="gap-4 py-4 text-sm font-semibold hover:text-accent hover:no-underline sm:text-base">
                <span className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                    {index + 1}
                  </span>
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pl-9 text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export const GENERIC_SITE_FAQ: FaqItem[] = [
  {
    q: "How do I contact a business listed on MeraArea?",
    a: "Every business page shows phone, WhatsApp, and address details so you can reach out directly.",
  },
  {
    q: "Is the information on MeraArea verified?",
    a: "Businesses marked with a verified badge have had their details confirmed. You can also use the \"Report Incorrect Information\" link on any business page to flag outdated details.",
  },
  {
    q: "Is it free to search for businesses?",
    a: "Yes, browsing and searching MeraArea is completely free for visitors.",
  },
];

export const BUSINESS_FAQ: FaqItem[] = [
  {
    q: "How do I contact this business?",
    a: "Use the Call, WhatsApp, or Email buttons above to reach out directly, or use Get Directions to visit in person.",
  },
  {
    q: "Is this listing verified?",
    a: "A verified badge next to the business name means MeraArea has confirmed the listed details.",
  },
  {
    q: "What if the information is incorrect?",
    a: "Use the \"Report Incorrect Information\" link on this page to let us know, and we'll get it corrected.",
  },
];

export const GET_LISTED_FAQ: FaqItem[] = [
  {
    q: "How much does it cost to list my business?",
    a: "Plans start at ₹1,200/year for a basic listing. See the pricing table above for what's included at each tier.",
  },
  {
    q: "How do I get started?",
    a: "Reach out via WhatsApp or email using the buttons above and we'll help set up your business page.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes, you can move to a higher tier at any time — just get in touch and we'll adjust your listing.",
  },
  {
    q: "What information do I need to provide?",
    a: "Your business name, category, area, contact details, address, business hours, and photos if you have them.",
  },
  {
    q: "How long until my page goes live?",
    a: "Most listings go live within 1-2 business days after you share your details, once we've verified the information.",
  },
  {
    q: "Can I edit my listing myself after it's live?",
    a: "Reach out via WhatsApp or email with your changes and we'll update your listing for you — no separate login needed.",
  },
  {
    q: "Is there a setup fee, or just the plan price?",
    a: "No setup fee — the plan price you see is all you pay to get listed and stay active for the year.",
  },
];

export const LISTING_FAQ: FaqItem[] = [
  {
    q: "How are businesses ranked here?",
    a: "Recently added and featured businesses appear first; you can use the sort filter to change the order.",
  },
  {
    q: "How do I know if a business is open right now?",
    a: "Look for the \"Open Now\" badge on each business card, computed from the hours the business has listed.",
  },
];
