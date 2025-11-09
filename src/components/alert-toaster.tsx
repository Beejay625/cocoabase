"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type Alert, useAlertsStore } from "@/store/alerts";
import { cn } from "@/lib/cn";

type ToastEntry = Alert & { expiresAt: number };

const TOAST_DURATION_MS = 6000;
const MAX_TOASTS = 4;

const severityAccent: Record<Alert["severity"], string> = {
  info: "border-sky-400",
  warning: "border-amber-400",
  critical: "border-rose-500",
};

export default function AlertToaster() {
  const alerts = useAlertsStore((state) => state.alerts);
  const acknowledgeAlert = useAlertsStore((state) => state.acknowledgeAlert);
  const seenIdsRef = useRef(new Set<string>());
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const newAlerts = useMemo(
    () => alerts.filter((alert) => !seenIdsRef.current.has(alert.id)),
    [alerts]
  );

  useEffect(() => {
    if (!newAlerts.length) {
      return;
    }

    newAlerts.forEach((alert) => seenIdsRef.current.add(alert.id));

    const now = Date.now();
    const entries = newAlerts.map<ToastEntry>((alert, index) => ({
      ...alert,
      expiresAt: now + TOAST_DURATION_MS + index * 250,
    }));

    setToasts((prev) => {
      const merged = [...entries, ...prev];
      if (merged.length <= MAX_TOASTS) {
        return merged;
      }
      return merged.slice(0, MAX_TOASTS);
    });
  }, [newAlerts]);

  useEffect(() => {
    if (!toasts.length) {
      return;
    }

    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        setToasts((current) =>
          current.filter((entry) => entry.id !== toast.id)
        );
        acknowledgeAlert(toast.id);
      }, Math.max(0, toast.expiresAt - Date.now()))
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [toasts, acknowledgeAlert]);

  const handleDismiss = (id: string) => {
    setToasts((current) => current.filter((entry) => entry.id !== id));
    acknowledgeAlert(id);
  };

  if (!toasts.length) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-6 top-24 z-50 flex w-full max-w-xs flex-col gap-3 sm:right-10 sm:max-w-sm">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "pointer-events-auto overflow-hidden rounded-2xl border-2 bg-white/90 p-4 shadow-lg backdrop-blur",
              severityAccent[toast.severity]
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cocoa-400">
                  {toast.severity.toUpperCase()}
                </span>
                <p className="mt-1 text-sm font-semibold text-cocoa-900">
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="mt-1 text-xs text-cocoa-600">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDismiss(toast.id)}
                className="rounded-full bg-cocoa-900/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream-50 transition hover:bg-cocoa-800 focus:outline-none focus:ring-2 focus:ring-cocoa-500 focus:ring-offset-1 focus:ring-offset-white"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}


