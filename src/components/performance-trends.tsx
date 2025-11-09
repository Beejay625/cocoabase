"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePlantationsStore } from "@/store/plantations";
import { buildAnalyticsSnapshot } from "@/lib/analytics";
import AnimatedCounter from "./animated-counter";

export default function PerformanceTrends() {
  const plantations = usePlantationsStore((state) => state.plantations);
  const analyticsSnapshot = buildAnalyticsSnapshot(plantations);

  const trends = useMemo(() => {
    const harvested = plantations.filter((p) => p.stage === "harvested").length;
    const growing = plantations.filter((p) => p.stage === "growing").length;
    const planted = plantations.filter((p) => p.stage === "planted").length;

    const totalCarbon = analyticsSnapshot.sustainabilityTotals.carbonOffsetTons;
    const totalTrees = analyticsSnapshot.sustainabilityTotals.treeCount;

    const avgYield = harvested > 0
      ? plantations
          .filter((p) => p.stage === "harvested")
          .reduce((sum, p) => {
            const latest = p.yieldTimeline
              ? [...p.yieldTimeline].sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )[0]
              : null;
            return sum + (latest?.yieldKg || 0);
          }, 0) / harvested
      : 0;

    return {
      harvested,
      growing,
      planted,
      totalCarbon,
      totalTrees,
      avgYield,
    };
  }, [plantations, analyticsSnapshot]);

  const metrics = [
    {
      label: "Harvested",
      value: trends.harvested,
      color: "emerald",
      icon: "🌾",
    },
    {
      label: "Growing",
      value: trends.growing,
      color: "blue",
      icon: "🌱",
    },
    {
      label: "Planted",
      value: trends.planted,
      color: "amber",
      icon: "🌿",
    },
    {
      label: "Avg Yield",
      value: trends.avgYield,
      unit: "kg",
      color: "purple",
      icon: "📊",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-cream-200 bg-gradient-to-br from-purple-50/80 to-indigo-50/80 p-6 shadow-sm backdrop-blur"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-cocoa-900">
          Performance Trends
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
          Key metrics overview
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric) => {
          const colorClasses: Record<string, string> = {
            emerald: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
            blue: "border-blue-200 bg-blue-50/80 text-blue-700",
            amber: "border-amber-200 bg-amber-50/80 text-amber-700",
            purple: "border-purple-200 bg-purple-50/80 text-purple-700",
          };

          return (
            <div
              key={metric.label}
              className={`rounded-xl border p-3 ${colorClasses[metric.color]}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{metric.icon}</span>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-cocoa-600/70">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-lg font-bold">
                    <AnimatedCounter value={metric.value} />
                    {metric.unit && <span className="ml-1 text-sm">{metric.unit}</span>}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-purple-200 bg-white/80 p-3">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-600/70">
            Total Carbon
          </p>
          <p className="mt-1 text-lg font-bold text-purple-700">
            <AnimatedCounter value={trends.totalCarbon} /> tons
          </p>
        </div>
        <div className="rounded-xl border border-purple-200 bg-white/80 p-3">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-600/70">
            Total Trees
          </p>
          <p className="mt-1 text-lg font-bold text-purple-700">
            <AnimatedCounter value={trends.totalTrees} />
          </p>
        </div>
      </div>
    </motion.section>
  );
}

