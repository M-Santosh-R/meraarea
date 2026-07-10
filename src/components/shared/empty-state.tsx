import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { SearchXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateCta = { label: string } & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

export function EmptyState({
  icon: Icon = SearchXIcon,
  title,
  description,
  cta,
  children,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  cta?: EmptyStateCta;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-muted/50 px-6 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-accent/10">
        <Icon className="size-7 text-accent" />
      </span>
      <h3 className="font-heading text-lg font-semibold">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {cta &&
        (cta.href ? (
          <Button asChild variant="outline" className="mt-2">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        ) : (
          <Button variant="outline" className="mt-2" onClick={cta.onClick}>
            {cta.label}
          </Button>
        ))}
      {children}
    </div>
  );
}
