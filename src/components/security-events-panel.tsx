"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useSecurityStore } from "@/store/security";
import { cn } from "@/lib/cn";

const typeStyles: Record<import("@/store/security").SecurityEvent["type"], string> = {
  settings_updated: "bg-leaf-100 text-leaf-800",
  wallet_connected: "bg-sky-100 text-sky-800",
  wallet_disconnected: "bg-amber-100 text-amber-700",
  risk_detected: "bg-rose-100 text-rose-700",
  monitor_resolution: "bg-gold-100 text-gold-700",
  session_locked: "bg-cocoa-900 text-cream-100",
  session_unlocked: "bg-leaf-200 text-leaf-900",
};

function SecurityEventsPanelBase() {
  const events = useSecurityStore((state) => state.events);
  const clearEvents = useSecurityStore((state) => state.clearEvents);

  if (!events.length) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="rounded-3xl border border-cream-200 bg-cream-50/85 p-5 shadow-sm shadow-cocoa-900/5 backdrop-blur"
    >
      <header className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-cocoa-900">
            Security activity
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
            Last {events.length} events
          </p>
        </div>
        <button
          type="button"
          onClick={clearEvents}
          className="rounded-full border border-cocoa-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cocoa-600 transition hover:border-cocoa-300 hover:text-cocoa-800 focus:outline-none focus:ring-2 focus:ring-cocoa-400 focus:ring-offset-2 focus:ring-offset-cream-50"
        >
          Clear
        </button>
      </header>

      <ul className="space-y-3 text-sm text-cocoa-700">
        {events.map((event) => (
          <li
            key={event.id}
            className="rounded-2xl border border-cream-200 bg-white/80 p-4 shadow-inner shadow-cocoa-900/5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                  typeStyles[event.type] ?? "bg-cream-200 text-cocoa-600"
                )}
              >
                {event.type.replace("_", " ")}
              </span>
              <span className="text-xs text-cocoa-500">
                {formatDistanceToNow(new Date(event.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="mt-3 text-sm text-cocoa-800">{event.message}</p>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

const SecurityEventsPanel = memo(SecurityEventsPanelBase);

export default SecurityEventsPanel;


