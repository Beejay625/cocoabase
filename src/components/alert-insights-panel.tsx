"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { buildAlertInsights } from "@/lib/alerts";
import { useAlertsStore } from "@/store/alerts";
import { cn } from "@/lib/cn";

const severityTone: Record<
  "info" | "warning" | "critical",
  { bg: string; text: string }
> = {
  info: {
    bg: "bg-sky-100/70",
    text: "text-sky-700",
  },
  warning: {
    bg: "bg-amber-100/70",
    text: "text-amber-700",
  },
  critical: {
    bg: "bg-rose-100/70",
    text: "text-rose-700",
  },
};

const formatMinutes = (minutes: number | null) => {
  if (minutes == null) return "—";
  if (minutes < 1) {
    return `${Math.round(minutes * 60)} sec`;
  }
  if (minutes < 60) {
    return `${minutes.toFixed(1)} min`;
  }
  const hours = minutes / 60;
  if (hours < 24) {
    return `${hours.toFixed(1)} hr`;
  }
  return `${(hours / 24).toFixed(1)} days`;
};

export default function AlertInsightsPanel() {
  const alerts = useAlertsStore((state) => state.alerts);

  const summary = useMemo(() => buildAlertInsights(alerts), [alerts]);

  if (!alerts.length) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl border border-cocoa-800/50 bg-cocoa-950/40 p-6 text-slate-200 shadow-lg shadow-black/20 backdrop-blur"
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Alert Intelligence
            </h2>
            <p className="text-sm text-slate-300/80">
              Notification engines are quiet — no alerts generated yet.
            </p>
          </div>
        </header>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#0f1f3d]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Alert Intelligence</h2>
          <p className="text-sm text-slate-300/80">
            Ranking alerts by severity, responsiveness, and impacted operations.
          </p>
        </div>
        <div className="rounded-full bg-slate-900/50 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300/70">
          {summary.total} total
        </div>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-600/40 bg-slate-900/60 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70">
            Open alerts
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">{summary.open}</p>
          <p className="text-xs text-slate-400/80">
            {summary.acknowledged} acknowledged
          </p>
        </div>
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.25em] text-rose-200/80">
            Critical overdue
          </p>
          <p className="mt-2 text-2xl font-semibold text-rose-100">
            {summary.criticalOverdue}
          </p>
          <p className="text-xs text-rose-200/70">
            Older than 1 hour without acknowledgement
          </p>
        </div>
        <div className="rounded-2xl border border-slate-600/40 bg-slate-900/60 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70">
            Avg response
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {formatMinutes(summary.averageResponseMinutes)}
          </p>
          <p className="text-xs text-slate-400/80">
            Based on acknowledged alerts
          </p>
        </div>
        <div className="rounded-2xl border border-slate-600/40 bg-slate-900/60 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70">
            Channel failures
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {summary.channelFailureCount}
          </p>
          <p className="text-xs text-slate-400/80">
            {(summary.channelFailureRate * 100).toFixed(1)}% of deliveries
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <section className="space-y-4 rounded-2xl border border-slate-600/40 bg-slate-900/50 p-4">
          <header className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Severity distribution
            </h3>
            <span className="text-xs text-slate-400/80">
              Total channels: {summary.total}
            </span>
          </header>
          <div className="flex flex-wrap gap-3">
            {(Object.entries(summary.severityCounts) as Array<
              ["info" | "warning" | "critical", number]
            >).map(([severity, count]) => (
              <div
                key={severity}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
                  severityTone[severity].bg,
                  severityTone[severity].text
                )}
              >
                <span className="capitalize">{severity}</span>
                <span className="text-xs">{count}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-600/40 bg-slate-900/50 p-4">
          <header className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Top sources
            </h3>
            <span className="text-xs text-slate-400/80">
              Most alerting entities
            </span>
          </header>
          <ul className="space-y-3">
            {summary.topSources.map((source) => (
              <li
                key={source.key}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-700/40 bg-slate-900/60 px-3 py-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-100">
                    {source.label}
                  </span>
                  <span className="text-xs text-slate-400/80">
                    Last alert{" "}
                    {source.lastAlert
                      ? new Date(source.lastAlert).toLocaleString()
                      : "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300/80">
                  <span className="rounded-full bg-slate-800/70 px-2 py-0.5 font-semibold text-white">
                    {source.count}
                  </span>
                </div>
              </li>
            ))}
            {!summary.topSources.length && (
              <li className="rounded-xl border border-slate-700/40 bg-slate-900/60 px-3 py-2 text-sm text-slate-400/80">
                No recurring sources detected.
              </li>
            )}
          </ul>
        </section>
      </div>

      <section className="mt-6 space-y-4">
        <header className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">
            Recent alerts
          </h3>
          <span className="text-xs text-slate-400/80">
            Last {summary.recentAlerts.length} notifications
          </span>
        </header>
        <ul className="space-y-3">
          {summary.recentAlerts.map((alert) => (
            <li
              key={alert.id}
              className="flex flex-col gap-1 rounded-2xl border border-slate-700/40 bg-slate-900/50 px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {alert.title}
                  </p>
                  {alert.description && (
                    <p className="text-xs text-slate-300/80">
                      {alert.description}
                    </p>
                  )}
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.2em]",
                    severityTone[alert.severity].bg,
                    severityTone[alert.severity].text
                  )}
                >
                  {alert.severity}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-slate-400/70">
                <span>
                  {new Date(alert.createdAt).toLocaleString()}
                </span>
                {alert.acknowledged && alert.acknowledgedAt ? (
                  <span>
                    Ack{" "}
                    {new Date(alert.acknowledgedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                ) : (
                  <span>Unacknowledged</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </motion.section>
  );
}


