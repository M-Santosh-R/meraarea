import { CompassIcon, ShieldCheckIcon, WalletIcon } from "lucide-react";

const ITEMS = [
  {
    icon: CompassIcon,
    title: "Easy Discovery",
    description: "Find businesses near you by area, category, or service in seconds.",
    bg: "bg-accent/8",
    text: "text-accent",
  },
  {
    icon: ShieldCheckIcon,
    title: "Verified Information",
    description: "Business details are checked so you can trust what you see.",
    bg: "bg-emerald-500/8",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: WalletIcon,
    title: "Affordable Digital Presence",
    description: "Businesses get a professional page they can proudly share, without the cost of a full website.",
    bg: "bg-amber-500/8",
    text: "text-amber-600 dark:text-amber-400",
  },
];

export function WhyMeraAreaSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-center font-heading text-2xl font-bold">Why MeraArea</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {ITEMS.map((item, index) => (
          <div
            key={item.title}
            style={{ animationDelay: `${index * 100}ms` }}
            className={`relative flex flex-col items-center gap-3 overflow-hidden rounded-3xl ${item.bg} p-6 text-center animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-700 ease-out`}
          >
            <item.icon className={`absolute -right-5 -bottom-6 size-28 ${item.text} opacity-10`} />
            <span className="relative flex size-14 items-center justify-center rounded-full bg-card shadow-sm">
              <item.icon className={`size-6 ${item.text}`} />
            </span>
            <h3 className="relative font-heading text-base font-semibold">{item.title}</h3>
            <p className="relative text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
