import { Button } from "@/components/ui/button";
import { MessageCircleIcon, MailIcon } from "lucide-react";

const GET_LISTED_EMAIL = "mailto:hello@meraarea.example?subject=Get%20my%20business%20listed%20on%20MeraArea";
const GET_LISTED_WHATSAPP = "https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20list%20my%20business%20on%20MeraArea";

export function GetListedCta() {
  return (
    <section id="get-listed" className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-brand px-6 py-14 text-center text-brand-foreground shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Join MeraArea today
        </h2>
        <p className="font-heading max-w-lg text-base text-brand-foreground/80 italic">
          Get your business its own page, share one simple link with your customers, and build
          an affordable online presence.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="secondary" className="rounded-full px-5">
            <a href={GET_LISTED_WHATSAPP} target="_blank" rel="noopener noreferrer">
              <MessageCircleIcon /> Chat on WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-brand-foreground/30 bg-transparent px-5 text-brand-foreground hover:bg-brand-foreground/10"
          >
            <a href={GET_LISTED_EMAIL}>
              <MailIcon /> Email Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
