import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { MailIcon, MessageCircleIcon, MessagesSquareIcon } from "lucide-react";
import { DecorativeGlow } from "@/components/shared/decorative-glow";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-16 text-center sm:px-6 lg:px-8">
      <DecorativeGlow />
      <span className="flex size-14 items-center justify-center rounded-2xl bg-accent/10">
        <MessagesSquareIcon className="size-7 text-accent" />
      </span>
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">Contact Us</h1>
      <p className="max-w-md text-muted-foreground">
        Have a question, a business enquiry, or found something that needs fixing? Reach out —
        we&apos;d love to hear from you.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          asChild
          className="rounded-full bg-success px-5 text-success-foreground hover:bg-success/90"
        >
          <a
            href="https://wa.me/919999999999?text=Hi%2C%20I%20have%20a%20question%20about%20MeraArea"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircleIcon /> Chat on WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-5">
          <a href="mailto:hello@meraarea.example">
            <MailIcon /> hello@meraarea.example
          </a>
        </Button>
      </div>
    </div>
  );
}
