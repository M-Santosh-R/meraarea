import { Badge } from "@/components/ui/badge";
import type { BusinessHourEntry } from "@/lib/types";

const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DAY_LABELS: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export function BusinessHoursList({ hours }: { hours: BusinessHourEntry[] }) {
  if (hours.length === 0) {
    return <p className="text-sm text-muted-foreground">Business hours not listed.</p>;
  }

  const todayName = DAY_ORDER[(new Date().getDay() + 6) % 7];
  const sorted = [...hours].sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day));

  return (
    <ul className="flex flex-col gap-0.5">
      {sorted.map((entry) => {
        const isToday = entry.day === todayName;
        return (
          <li
            key={entry.day}
            className={
              "flex items-center justify-between gap-4 rounded-md px-2 py-1.5 text-sm" +
              (isToday ? " bg-accent/5" : "")
            }
          >
            <span className="flex items-center gap-2">
              <span className={isToday ? "font-medium" : "text-muted-foreground"}>
                {DAY_LABELS[entry.day] ?? entry.day}
              </span>
              {isToday && (
                <Badge variant="outline" className="text-[10px]">
                  Today
                </Badge>
              )}
            </span>
            <span
              className={
                entry.isClosed
                  ? "font-medium text-destructive"
                  : isToday
                    ? "font-medium"
                    : "text-muted-foreground"
              }
            >
              {entry.isClosed
                ? "Closed"
                : entry.openTime && entry.closeTime
                  ? `${entry.openTime} – ${entry.closeTime}`
                  : "—"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
