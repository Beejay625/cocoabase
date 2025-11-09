"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useAlertsStore } from "@/store/alerts";
import { usePlantationsStore } from "@/store/plantations";

export default function NotificationsCenter() {
  const alerts = useAlertsStore((state) => state.alerts);
  const acknowledgeAlert = useAlertsStore((state) => state.acknowledgeAlert);
  const dismissAlert = useAlertsStore((state) => state.dismissAlert);
  const plantations = usePlantationsStore((state) => state.plantations);

  const [filter, setFilter] = useState<"all" | "unread" | "acknowledged">("all");

  const filteredAlerts = useMemo(() => {
    let filtered = [...alerts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (filter === "unread") {
      filtered = filtered.filter((alert) => !alert.acknowledgedAt);
    } else if (filter === "acknowledged") {
      filtered = filtered.filter((alert) => !!alert.acknowledgedAt);
    }

    return filtered.slice(0, 20);
  }, [alerts, filter]);

  const unreadCount = alerts.filter((a) => !a.acknowledgedAt).length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-rose-500/60 bg-rose-500/20 text-rose-300";
      case "high":
        return "border-amber-500/60 bg-amber-500/20 text-amber-300";
      case "medium":
        return "border-blue-500/60 bg-blue-500/20 text-blue-300";
      case "low":
        return "border-slate-500/60 bg-slate-500/20 text-slate-300";
      default:
        return "border-slate-500/60 bg-slate-500/20 text-slate-300";
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#101f3c]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Notifications center
          </h2>
          <p className="text-sm text-slate-300/80">
            Centralized notification management and alerts.
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="rounded-full bg-rose-500/20 px-4 py-2">
            <span className="text-sm font-semibold text-rose-300">
              {unreadCount} unread
            </span>
          </div>
        )}
      </header>

      <div className="mt-4 flex gap-2">
        {(["all", "unread", "acknowledged"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition",
              filter === f
                ? "bg-leaf-500/20 text-leaf-300 border border-leaf-400/40"
                : "bg-slate-800/80 text-slate-300/70 hover:bg-slate-700/80"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-2 max-h-96 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              {filter === "all"
                ? "No notifications yet."
                : `No ${filter} notifications.`}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const plantation = plantations.find(
              (p) => p.id === alert.plantationId
            );
            return (
              <div
                key={alert.id}
                className={cn(
                  "rounded-xl border p-3",
                  getSeverityColor(alert.severity),
                  !alert.acknowledgedAt && "ring-2 ring-blue-500/40"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">
                        {alert.title}
                      </h3>
                      {!alert.acknowledgedAt && (
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-300/70">
                      {alert.description}
                    </p>
                    {plantation && (
                      <p className="mt-1 text-xs text-slate-300/70">
                        📍 {plantation.seedName}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400/70">
                      <span>
                        {new Date(alert.createdAt).toLocaleString()}
                      </span>
                      {alert.acknowledgedAt && (
                        <span>
                          Acknowledged:{" "}
                          {new Date(alert.acknowledgedAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!alert.acknowledgedAt && (
                      <button
                        type="button"
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold text-slate-200/90 transition hover:bg-slate-700/80"
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => dismissAlert(alert.id)}
                      className="rounded-full bg-slate-800/70 p-2 text-slate-200/90 transition hover:bg-slate-700/80"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.section>
  );
}

