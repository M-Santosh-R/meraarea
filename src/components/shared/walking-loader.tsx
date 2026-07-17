"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function WalkingLoader({
  message = "Walking to your area…",
  className = "",
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 py-16 ${className}`}>
      <div className="size-40 sm:size-48">
        <DotLottieReact src="/animations/man-walking.lottie" loop autoplay />
      </div>
      <p className="animate-in fade-in text-sm font-medium text-muted-foreground duration-700">
        {message}
      </p>
    </div>
  );
}
