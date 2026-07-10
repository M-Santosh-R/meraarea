import Link from "next/link";
import { MenuIcon, MapPinnedIcon, ArrowRightIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/public/theme-toggle";
import { SearchBox } from "@/components/public/search-box";

const NAV_ITEMS = [
  { href: "/", label: "Explore" },
  { href: "/areas", label: "Areas" },
  { href: "/categories", label: "Categories" },
  { href: "/get-listed", label: "Submit Business" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <MapPinnedIcon className="size-4.5" />
          </span>
          <span className="font-heading text-xl font-semibold tracking-tight">MeraArea</span>
        </Link>
        <nav className="hidden flex-1 items-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <SearchBox className="hidden md:flex md:max-w-52 lg:max-w-64" />
        <Button asChild variant="ghost" size="icon" className="flex size-11 md:hidden">
          <Link href="/search">
            <SearchIcon />
            <span className="sr-only">Search</span>
          </Link>
        </Button>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full bg-accent px-4 text-accent-foreground shadow-sm hover:bg-accent/90">
            <Link href="/get-listed">
              List Your Business <ArrowRightIcon className="size-3.5" />
            </Link>
          </Button>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-11 sm:hidden">
          <MenuIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-3 px-4">
          <SearchBox className="max-w-none" />
          {NAV_ITEMS.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="flex min-h-11 items-center rounded-lg px-2 text-sm font-medium hover:bg-muted"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
          <div className="mt-2 flex items-center justify-between border-t border-border px-2 pt-3">
            <span className="text-sm font-medium text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
