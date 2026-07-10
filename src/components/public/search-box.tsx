"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchIcon, MapPinIcon, Loader2Icon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchPublic } from "@/lib/data";
import type { SearchResponse } from "@/lib/types";

export function SearchBox({
  variant = "compact",
  locationLabel,
  className,
  defaultQuery = "",
}: {
  variant?: "compact" | "hero";
  locationLabel?: string;
  className?: string;
  defaultQuery?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      // Resetting local dropdown state when the query empties out, not
      // syncing an external system — mirrors the pattern in theme-toggle.tsx.
      /* eslint-disable react-hooks/set-state-in-effect */
      setResults(null);
      setLoading(false);
      setOpen(false);
      /* eslint-enable react-hooks/set-state-in-effect */
      return;
    }
    setOpen(true);
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const data = await searchPublic(query.trim(), 8);
      setResults(data);
      setLoading(false);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function goToSearchPage() {
    setOpen(false);
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  const hasResults =
    results && (results.businesses.length > 0 || results.categories.length > 0 || results.areas.length > 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <InputGroup
          className={cn(
            variant === "hero"
              ? "h-14 w-full rounded-full bg-card pr-1.5 pl-2 shadow-md"
              : "w-full max-w-sm",
            className
          )}
        >
          {variant === "hero" && locationLabel && (
            <>
              <Link
                href="/areas"
                className="flex shrink-0 items-center gap-1 pl-3 text-sm font-medium text-foreground"
              >
                <MapPinIcon className="size-4 text-accent" />
                {locationLabel}
              </Link>
              <span className="h-6 w-px shrink-0 bg-border" />
            </>
          )}
          <InputGroupAddon>
            {loading ? (
              <Loader2Icon className="size-4 animate-spin opacity-50" />
            ) : (
              <SearchIcon className="size-4 opacity-50" />
            )}
          </InputGroupAddon>
          <InputGroupInput
            placeholder={
              variant === "hero"
                ? "What are you looking for?"
                : "Search businesses, categories, areas..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goToSearchPage();
            }}
          />
          {variant === "hero" && (
            <InputGroupAddon align="inline-end">
              <Button className="h-10 rounded-full px-5" onClick={goToSearchPage}>
                Search
              </Button>
            </InputGroupAddon>
          )}
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popper-anchor-width) min-w-80 p-0"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command shouldFilter={false}>
          <CommandList>
            {loading && !hasResults && (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                <Loader2Icon className="size-4 animate-spin" /> Searching…
              </div>
            )}
            {!loading && !hasResults && <CommandEmpty>No results found.</CommandEmpty>}
            {results && results.businesses.length > 0 && (
              <CommandGroup heading="Businesses">
                {results.businesses.map((business) => (
                  <CommandItem
                    key={business.id}
                    onSelect={() => {
                      setOpen(false);
                      router.push(`/${business.area.slug}/${business.slug}`);
                    }}
                  >
                    {business.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results && results.categories.length > 0 && (
              <CommandGroup heading="Categories">
                {results.categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    onSelect={() => {
                      setOpen(false);
                      router.push(`/${category.slug}`);
                    }}
                  >
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results && results.areas.length > 0 && (
              <CommandGroup heading="Areas">
                {results.areas.map((area) => (
                  <CommandItem
                    key={area.id}
                    onSelect={() => {
                      setOpen(false);
                      router.push(`/${area.slug}`);
                    }}
                  >
                    {area.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
