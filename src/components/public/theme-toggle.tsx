"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    // Actual theme is only knowable client-side (set by the anti-flash script
    // before hydration) — must run post-mount, not during render, to avoid a
    // hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Render nothing theme-specific until mounted, to avoid a hydration mismatch
          between the server-rendered icon and the client's actual stored theme. */}
      {isDark === null ? null : isDark ? (
        <SunIcon className="animate-in fade-in zoom-in spin-in-45 duration-300" />
      ) : (
        <MoonIcon className="animate-in fade-in zoom-in spin-in-45 duration-300" />
      )}
    </Button>
  );
}
