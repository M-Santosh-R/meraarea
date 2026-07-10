"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getOpenNowStatus } from "@/lib/open-now";
import type { BusinessHourEntry } from "@/lib/types";

export function OpenNowBadge({ hours }: { hours: BusinessHourEntry[] }) {
  const [status, setStatus] = useState<"open" | "closed" | "unknown" | null>(null);

  useEffect(() => {
    // Computed from wall-clock time, which differs between server render and
    // client mount — must run post-mount only, not during render, to avoid a
    // hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(getOpenNowStatus(hours));
  }, [hours]);

  if (!status || status === "unknown") return null;

  return (
    <Badge variant={status === "open" ? "default" : "outline"} className={status === "open" ? "bg-success text-success-foreground" : ""}>
      {status === "open" ? "Open Now" : "Closed Now"}
    </Badge>
  );
}
