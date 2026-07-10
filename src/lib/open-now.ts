import type { BusinessHourEntry } from "@/lib/types";

export type OpenNowStatus = "open" | "closed" | "unknown";

const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

function parseHHmm(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})/.exec(value.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
}

export function getOpenNowStatus(hours: BusinessHourEntry[]): OpenNowStatus {
  if (hours.length === 0) return "unknown";

  const now = new Date();
  const dayName = DAY_ORDER[(now.getDay() + 6) % 7];
  const today = hours.find((h) => h.day === dayName);
  if (!today) return "unknown";
  if (today.isClosed) return "closed";
  if (!today.openTime || !today.closeTime) return "unknown";

  const open = parseHHmm(today.openTime);
  const close = parseHHmm(today.closeTime);
  if (open === null || close === null) return "unknown";

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  if (close < open) {
    // Overnight window (e.g. 22:00-02:00) spans midnight.
    return nowMinutes >= open || nowMinutes < close ? "open" : "closed";
  }
  return nowMinutes >= open && nowMinutes < close ? "open" : "closed";
}
