import type { Metadata } from "next";
import { ScrollTextIcon } from "lucide-react";

export const metadata: Metadata = { title: "Terms & Conditions" };

const h2 = "font-heading text-lg font-semibold text-foreground";

export default function TermsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-16 text-sm leading-relaxed text-muted-foreground sm:px-6 lg:px-8">
      <span className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-accent/10">
        <ScrollTextIcon className="size-6 text-accent" />
      </span>
      <h1 className="font-heading text-3xl font-bold text-foreground">Terms &amp; Conditions</h1>
      <p className="text-xs text-muted-foreground/70">Last updated: 10 July 2026</p>

      <p>
        These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of MeraArea (meraarea.in), a
        hyperlocal business directory that helps people discover businesses organized by area
        (country, state, city, and locality) and category. By browsing MeraArea or submitting a
        business for listing, you agree to these Terms.
      </p>

      <h2 className={h2}>1. What MeraArea Is</h2>
      <p>
        MeraArea is a directory. We publish business information — such as names, addresses,
        contact details, hours, and photos — so that visitors can find and reach out to local
        businesses. We are not a party to any transaction, booking, or agreement between a visitor
        and a listed business, and we do not sell products or services on behalf of listed
        businesses.
      </p>

      <h2 className={h2}>2. Using the Site</h2>
      <p>
        Browsing and searching MeraArea is free and does not require creating an account. You
        agree to use the site only for lawful purposes — for example, not to scrape, copy, or
        republish listing data at scale, attempt to disrupt the site, or misuse contact details
        (phone, WhatsApp, or email) published on a business&apos;s listing for spam or harassment.
      </p>

      <h2 className={h2}>3. Business Listings</h2>
      <p>
        Businesses are added to MeraArea after their owner or representative gets in touch with us
        (via WhatsApp or email) and our team reviews and enters the listing. By submitting a
        business for listing, you confirm that you are authorized to represent that business and
        that the information provided — contact details, address, hours, services, and images — is
        accurate and lawful to publish.
      </p>
      <p>
        MeraArea reserves the right to edit listing content for clarity or consistency, and to
        refuse, suspend, or remove any listing at our discretion — including listings that are
        inaccurate, misleading, inappropriate, or that violate these Terms.
      </p>

      <h2 className={h2}>4. Paid Listing Plans</h2>
      <p>
        MeraArea offers optional paid annual listing plans (currently Basic, Plus, and Premium)
        that unlock features such as featured placement, a larger photo gallery, and verified
        badge eligibility, as described on our{" "}
        <a href="/get-listed" className="text-accent underline underline-offset-2">
          Get Listed
        </a>{" "}
        page. Plan pricing and payment arrangements are confirmed directly with our team before a
        paid listing goes live, and renewal terms are communicated at the time of onboarding.
        Prices are subject to change; any change will not affect an already-active plan until its
        renewal.
      </p>

      <h2 className={h2}>5. Accuracy of Information</h2>
      <p>
        We make reasonable efforts to keep listings current, but business details (hours, pricing,
        availability, etc.) can change without notice. We encourage visitors to confirm important
        details directly with a business before visiting or making a purchase. MeraArea is not
        responsible for losses arising from outdated or inaccurate listing information.
      </p>

      <h2 className={h2}>6. Third-Party Links</h2>
      <p>
        Listings may link out to a business&apos;s own website, WhatsApp, phone dialer, or map
        location. These third-party destinations are outside our control, and we are not
        responsible for their content, availability, or privacy practices.
      </p>

      <h2 className={h2}>7. Intellectual Property</h2>
      <p>
        The MeraArea name, logo, and site design belong to MeraArea. Content submitted by business
        owners (photos, descriptions, etc.) remains owned by the submitting business, who grants
        MeraArea a license to display it on the directory for as long as the listing is active.
      </p>

      <h2 className={h2}>8. Limitation of Liability</h2>
      <p>
        MeraArea is provided &quot;as is.&quot; We do not guarantee the quality, safety, or legality
        of any listed business or its products and services, and we are not liable for any
        dispute, loss, or damage arising from your interaction with a business found through
        MeraArea.
      </p>

      <h2 className={h2}>9. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time to reflect changes to the site or our
        practices. The &quot;Last updated&quot; date above will reflect the most recent revision.
        Continued use of MeraArea after a change means you accept the updated Terms.
      </p>

      <h2 className={h2}>10. Governing Law</h2>
      <p>
        These Terms are governed by the laws of India, and any disputes will be subject to the
        jurisdiction of the courts of India.
      </p>

      <h2 className={h2}>11. Contact Us</h2>
      <p>
        Questions about these Terms? Reach us at{" "}
        <a href="mailto:hello@meraarea.example" className="text-accent underline underline-offset-2">
          hello@meraarea.example
        </a>{" "}
        or via the{" "}
        <a href="/contact" className="text-accent underline underline-offset-2">
          Contact page
        </a>
        .
      </p>
    </div>
  );
}
