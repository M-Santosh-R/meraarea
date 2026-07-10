import type { LucideIcon } from "lucide-react";

export function SectionHeading({
  children,
  subtitle,
  eyebrow,
  icon: Icon,
  action,
  className = "",
}: {
  children: React.ReactNode;
  subtitle?: string;
  eyebrow?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="pl-3 text-xs font-semibold tracking-wide text-accent uppercase">{eyebrow}</p>
      )}
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 border-l-4 border-accent pl-3 font-heading text-xl leading-tight font-bold">
          {Icon && (
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon className="size-3.5" />
            </span>
          )}
          {children}
        </h2>
        {action}
      </div>
      {subtitle && <p className="mt-1 pl-3 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
