"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2Icon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToastEntry {
  id: number;
  message: string;
}

const ToastContext = createContext<((message: string) => void) | null>(null);

let nextId = 1;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string) => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, message }]);
      setTimeout(() => dismiss(id), 2800);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4 sm:items-end sm:px-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-in fade-in slide-in-from-bottom-2 pointer-events-auto flex items-center gap-2 rounded-full bg-primary py-2.5 pr-2 pl-4 text-sm font-medium text-primary-foreground shadow-lg duration-200"
          >
            <CheckCircle2Icon className="size-4 shrink-0 text-success" />
            {t.message}
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
            >
              <XIcon />
            </Button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const toast = useContext(ToastContext);
  if (!toast) throw new Error("useToast must be used within a ToastProvider");
  return toast;
}
