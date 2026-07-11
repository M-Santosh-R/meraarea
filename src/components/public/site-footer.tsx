import Image from "next/image";
import Link from "next/link";
import { MapPinnedIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="bg-brand text-brand-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-white.png"
                alt="MeraArea logo"
                width={240}
                height={64}
                className="block"
              />
            </Link>
            <p className="text-sm text-brand-foreground/70">
              Discover local businesses, and give every business an affordable online presence.
            </p>
          </div>
          <FooterColumn
            title="Company"
            links={[
              { href: "/about", label: "About" },
              { href: "/get-listed", label: "Get Listed" },
              { href: "/contact", label: "Contact" },
            ]}
          />
          <FooterColumn
            title="Explore"
            links={[
              { href: "/", label: "Home" },
              { href: "/areas", label: "Areas" },
              { href: "/categories", label: "Categories" },
              { href: "/search", label: "Search" },
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms & Conditions" },
            ]}
          />
        </div>
        <Separator className="bg-brand-foreground/10" />
        <div className="flex flex-col items-center gap-1 text-xs text-brand-foreground/60 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} MeraArea. All rights reserved.</p>
          <p>Made in India</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium text-brand-foreground">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-brand-foreground/70 transition-colors hover:text-brand-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
