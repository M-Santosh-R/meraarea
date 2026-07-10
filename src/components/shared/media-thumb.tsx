"use client";

import { useState, type ReactNode } from "react";
import { ImageIcon } from "lucide-react";
import { gradientFor } from "@/lib/accent-palette";

// Every business/area/category thumbnail should either show its real photo or
// a consistent branded gradient — never a bare "No image" text box, and never
// a native broken-image icon if the URL fails to load (e.g. a stale/dead one).
//
// `fallbackIcon` takes an already-rendered node (not a component reference):
// this is a Client Component, and Server Component callers can't pass a raw
// component/function across that boundary — only serializable values and
// already-rendered JSX.
export function MediaThumb({
  src,
  alt,
  id,
  className = "",
  fallbackIcon = <ImageIcon className="size-6 text-white/80" />,
  imgClassName = "",
}: {
  src: string | null | undefined;
  alt: string;
  id: string;
  className?: string;
  fallbackIcon?: ReactNode;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={className}>
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${imgClassName}`}
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradientFor(id)}`}
        >
          {fallbackIcon}
        </div>
      )}
    </div>
  );
}
