import type { Metadata } from "next";
import { ShieldCheckIcon } from "lucide-react";

export const metadata: Metadata = { title: "Privacy Policy" };

const h2 = "font-heading text-lg font-semibold text-foreground";

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-16 text-sm leading-relaxed text-muted-foreground sm:px-6 lg:px-8">
      <span className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-accent/10">
        <ShieldCheckIcon className="size-6 text-accent" />
      </span>
      <h1 className="font-heading text-3xl font-bold text-foreground">Privacy Policy</h1>
      <p className="text-xs text-muted-foreground/70">Last updated: 10 July 2026</p>

      <p>
        This Privacy Policy explains what information MeraArea (meraarea.in) collects, how it is
        used, and the choices you have. MeraArea is a hyperlocal business directory — most of what
        we publish is information about businesses, not about our visitors.
      </p>

      <h2 className={h2}>1. Information From Business Owners</h2>
      <p>
        When a business is submitted for listing (via WhatsApp or email to our team), we collect
        the details needed to publish and manage the listing: business name, phone number,
        WhatsApp number, email, website, physical address and location, operating hours, services
        offered, and photos. This information is entered into our system by our team and displayed
        publicly on the listing, since making it easy for customers to find and contact a business
        is the purpose of the directory.
      </p>

      <h2 className={h2}>2. Information From Visitors</h2>
      <p>
        Browsing MeraArea does not require an account, and we do not ask visitors to submit
        personal information to search or view listings. When you use search, your search terms
        are sent to our servers to return matching results. We use two small, first-party browser
        storage items: a cookie that remembers the last area you viewed (so we can show relevant
        businesses near you) and a local storage entry that remembers your light/dark theme
        preference. Neither is used for advertising or cross-site tracking, and we do not use
        third-party analytics, advertising, or tracking scripts.
      </p>

      <h2 className={h2}>3. How We Use Information</h2>
      <p>We use the information described above to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Publish and maintain accurate business listings on the directory</li>
        <li>Return relevant search and browsing results</li>
        <li>Personalize which area is shown to a returning visitor</li>
        <li>Communicate with business owners about their listing (e.g. renewal, updates)</li>
        <li>Keep the site secure and working correctly</li>
      </ul>

      <h2 className={h2}>4. Public Display of Business Information</h2>
      <p>
        Because MeraArea is a public directory, the contact details and other information a
        business provides (phone, WhatsApp, email, address, hours, photos) are intentionally shown
        publicly on that business&apos;s listing page. If you are a business owner and want any of
        this information corrected or removed, contact us using the details below.
      </p>

      <h2 className={h2}>5. Cookies &amp; Local Storage</h2>
      <p>
        MeraArea uses only first-party, functional storage — no third-party or advertising
        cookies. You can clear cookies and local storage at any time through your browser settings;
        doing so simply resets your area and theme preferences and does not affect your ability to
        browse the site.
      </p>

      <h2 className={h2}>6. Sharing of Information</h2>
      <p>
        We do not sell personal data. Business listing information is shared only in the way the
        directory is designed to work — by publishing it on the relevant listing page. We may share
        information with service providers who help us run the site (such as hosting), solely to
        operate MeraArea, and never for their independent marketing use.
      </p>

      <h2 className={h2}>7. Data Retention</h2>
      <p>
        We keep business listing information for as long as the listing is active, and for a
        reasonable period after removal in case the business wishes to relist or for record-keeping
        purposes. You can request earlier deletion by contacting us.
      </p>

      <h2 className={h2}>8. Security</h2>
      <p>
        We take reasonable technical and organizational measures to protect the information we
        hold. No online service can guarantee perfect security, but we work to keep listing data
        accurate and access to our admin systems restricted to authorized team members.
      </p>

      <h2 className={h2}>9. Your Rights</h2>
      <p>
        If you are a business owner, you can ask us to access, correct, or delete the information
        we hold about your listing at any time by contacting us. We will respond within a
        reasonable time.
      </p>

      <h2 className={h2}>10. Children&apos;s Privacy</h2>
      <p>
        MeraArea is a general-audience business directory and is not directed at children. We do
        not knowingly collect personal information from children.
      </p>

      <h2 className={h2}>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy as MeraArea evolves. The &quot;Last updated&quot; date
        above reflects the most recent revision. Significant changes will be reflected on this
        page.
      </p>

      <h2 className={h2}>12. Contact Us</h2>
      <p>
        Questions about this Privacy Policy, or a request about your listing&apos;s information?
        Reach us at{" "}
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
