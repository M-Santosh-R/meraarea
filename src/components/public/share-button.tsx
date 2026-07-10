"use client";

import { Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/shared/toast";

export function ShareButton({ title }: { title: string }) {
  const toast = useToast();

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard copy
      }
    }
    await navigator.clipboard.writeText(url);
    toast("Link copied to clipboard");
  }

  return (
    <Button variant="outline" onClick={handleShare}>
      <Share2Icon /> Share
    </Button>
  );
}
