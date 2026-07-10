"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ImageOffIcon, ImagesIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { BusinessImageEntry } from "@/lib/types";

function BrokenImageFallback({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-muted ${className}`}>
      <ImageOffIcon className="size-6 text-muted-foreground" />
    </div>
  );
}

export function ImageGallery({
  images,
  businessName,
}: {
  images: BusinessImageEntry[];
  businessName: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());

  function markFailed(url: string) {
    setFailedUrls((prev) => new Set(prev).add(url));
  }

  const showMoreCount = images.length > 5 ? images.length - 5 : 0;
  const visible = images.slice(0, 5);

  function next() {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
  }
  function prev() {
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  if (images.length === 0) return null;

  // Mobile-first: each tile gets its own explicit height rather than relying
  // on a fixed-height grid container with implicit auto-rows (which collapses
  // unpredictably), so nothing squeezes into a single skinny row on phones.
  // Bento (bigger first tile) kicks in at 4+ photos, where there's enough
  // tiles to fill an asymmetric block; smaller counts use a plain even grid.
  const SMALL_GRID_COLS: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
  };
  const isBentoLayout = images.length >= 5;
  const isQuadBento = images.length === 4;
  const gridClassName = isBentoLayout
    ? "grid grid-cols-2 gap-3 sm:h-96 sm:grid-cols-4 sm:grid-rows-2"
    : isQuadBento
      ? "grid grid-cols-2 gap-3 sm:grid-rows-3 sm:h-[28rem]"
      : `grid gap-3 ${SMALL_GRID_COLS[images.length]}`;

  return (
    <>
      <div className={gridClassName}>
        {visible.map((image, index) => {
          const isLast = index === visible.length - 1 && showMoreCount > 0;
          const isBentoLead = isBentoLayout && index === 0;
          const isQuadLead = isQuadBento && index === 0;
          // The lead photo of a 3-photo gallery spans full width on mobile so
          // it doesn't get squeezed into a 1/3-width sliver on small screens.
          const isWideOnMobile = images.length === 3 && index === 0;
          return (
            <button
              key={image.url}
              type="button"
              onClick={() => setOpenIndex(index)}
              className={`group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-foreground/10 transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent/50 ${
                isBentoLead
                  ? "col-span-2 row-span-2 h-48 sm:h-full"
                  : isBentoLayout
                    ? "h-32 sm:h-full"
                    : isQuadLead
                      ? "h-40 sm:row-span-3 sm:h-full"
                      : isQuadBento
                        ? "h-40 sm:h-full"
                        : isWideOnMobile
                          ? "col-span-2 h-40 sm:col-span-1 sm:h-64"
                          : "h-40 sm:h-64"
              }`}
            >
              {failedUrls.has(image.url) ? (
                <BrokenImageFallback />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image.url}
                  alt={`${businessName} photo ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={() => markFailed(image.url)}
                />
              )}
              {isLast && (
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/55 font-medium text-white transition-colors group-hover:bg-black/65">
                  <ImagesIcon className="size-4" /> +{showMoreCount} more
                </div>
              )}
            </button>
          );
        })}
      </div>

      <Dialog open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
        <DialogContent className="max-w-4xl">
          <DialogTitle className="sr-only">{businessName} photo</DialogTitle>
          {openIndex !== null && (
            <div className="relative">
              {failedUrls.has(images[openIndex].url) ? (
                <BrokenImageFallback className="aspect-video rounded-lg" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={images[openIndex].url}
                  alt={`${businessName} photo ${openIndex + 1}`}
                  className="max-h-[75vh] w-full rounded-lg object-contain"
                  onError={() => markFailed(images[openIndex].url)}
                />
              )}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous photo"
                    className="absolute top-1/2 left-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent/50"
                  >
                    <ChevronLeftIcon className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next photo"
                    className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent/50"
                  >
                    <ChevronRightIcon className="size-5" />
                  </button>
                  <span className="absolute right-3 bottom-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
                    {openIndex + 1} / {images.length}
                  </span>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
