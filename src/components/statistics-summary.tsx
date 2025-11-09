"use client";

import { motion } from "framer-motion";
import type { StatisticsSummary } from "@/lib/statistics";
import { formatNumber, formatPercentage } from "@/lib/format-utils";
import { cn } from "@/lib/cn";

type StatisticsSummaryProps = {
  statistics: StatisticsSummary;
  className?: string;
  showDetails?: boolean;
};

export default function StatisticsSummary({
  statistics,
  className,
  showDetails = true,
}: StatisticsSummaryProps) {
  const stats = [
    {
      label: "Total Plantations",
      value: statistics.total,
      icon: "🌱",
      color: "text-cocoa-900",
    },
    {
      label: "Average Age",
      value: `${statistics.averageAge} days`,
      icon: "📅",
      color: "text-blue-600",
    },
    {
      label: "Average Health",
      value: `${statistics.averageHealth}/100`,
      icon: "💚",
      color: "text-green-600",
    },
    {
      label: "Task Completion",
      value: formatPercentage(statistics.taskCompletionRate),
      icon: "✅",
      color: "text-emerald-600",
    },
    {
      label: "Carbon Offset",
      value: formatNumber(statistics.totalCarbon, { decimals: 2 }),
      unit: "tCO₂",
      icon: "🌍",
      color: "text-leaf-600",
    },
    {
      label: "Total Trees",
      value: formatNumber(statistics.totalTrees, { compact: true }),
      icon: "🌳",
      color: "text-green-700",
    },
  ];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl border border-cream-200 bg-white/80 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                  {stat.label}
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <p className={cn("text-2xl font-bold", stat.color)}>
                    {stat.value}
                  </p>
                  {stat.unit && (
                    <span className="text-sm text-cocoa-500">{stat.unit}</span>
                  )}
                </div>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {showDetails && (
        <div className="grid gap-4 rounded-2xl border border-cream-200 bg-cream-50/50 p-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cocoa-400 mb-2">
              Stage Distribution
            </p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-cocoa-600">Planted</span>
                <span className="font-semibold text-cocoa-900">
                  {statistics.byStage.planted}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-cocoa-600">Growing</span>
                <span className="font-semibold text-cocoa-900">
                  {statistics.byStage.growing}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-cocoa-600">Harvested</span>
                <span className="font-semibold text-cocoa-900">
                  {statistics.byStage.harvested}
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cocoa-400 mb-2">
              Engagement Metrics
            </p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-cocoa-600">Collaborators per plantation</span>
                <span className="font-semibold text-cocoa-900">
                  {statistics.collaboratorEngagement.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-cocoa-600">Total area</span>
                <span className="font-semibold text-cocoa-900">
                  {formatNumber(statistics.totalArea, { decimals: 2 })} ha
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

