"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePlantationsStore } from "@/store/plantations";
import { buildAnalyticsSnapshot } from "@/lib/analytics";
import AnimatedCounter from "./animated-counter";

export default function SustainabilityScorecard() {
  const plantations = usePlantationsStore((state) => state.plantations);
  const analyticsSnapshot = buildAnalyticsSnapshot(plantations);

  const scorecard = useMemo(() => {
    const totalTrees = analyticsSnapshot.sustainabilityTotals.treeCount;
    const totalCarbon = analyticsSnapshot.sustainabilityTotals.carbonOffsetTons;
    const totalArea = plantations.reduce(
      (sum, p) => sum + p.areaHectares,
      0
    );
    const harvested = plantations.filter((p) => p.stage === "harvested")
      .length;

    const carbonPerTree = totalTrees > 0 ? totalCarbon / totalTrees : 0;
    const carbonPerHectare = totalArea > 0 ? totalCarbon / totalArea : 0;
    const treesPerHectare = totalArea > 0 ? totalTrees / totalArea : 0;

    const sustainabilityScore = Math.min(
      100,
      Math.round(
        (carbonPerTree * 10 +
          carbonPerHectare * 5 +
          treesPerHectare * 2 +
          (harvested / plantations.length) * 20) /
          4
      )
    );

    const getScoreColor = (score: number) => {
      if (score >= 80) return "text-emerald-300";
      if (score >= 60) return "text-blue-300";
      if (score >= 40) return "text-amber-300";
      return "text-rose-300";
    };

    const getScoreLabel = (score: number) => {
      if (score >= 80) return "Excellent";
      if (score >= 60) return "Good";
      if (score >= 40) return "Fair";
      return "Needs Improvement";
    };

    return {
      sustainabilityScore,
      scoreColor: getScoreColor(sustainabilityScore),
      scoreLabel: getScoreLabel(sustainabilityScore),
      carbonPerTree,
      carbonPerHectare,
      treesPerHectare,
      totalTrees,
      totalCarbon,
      totalArea,
    };
  }, [plantations, analyticsSnapshot]);

  const metrics = [
    {
      label: "Carbon per tree",
      value: scorecard.carbonPerTree,
      unit: "tons",
      color: "emerald",
    },
    {
      label: "Carbon per hectare",
      value: scorecard.carbonPerHectare,
      unit: "tons/ha",
      color: "blue",
    },
    {
      label: "Tree density",
      value: scorecard.treesPerHectare,
      unit: "trees/ha",
      color: "purple",
    },
  ];

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
            Sustainability scorecard
          </h2>
          <p className="text-sm text-slate-300/80">
            Overall sustainability performance and environmental impact metrics.
          </p>
        </div>
      </header>

      <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8">
        <div className="relative">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-slate-700/40">
            <div className="text-center">
              <p
                className={cn(
                  "text-4xl font-bold",
                  scorecard.scoreColor
                )}
              >
                <AnimatedCounter value={scorecard.sustainabilityScore} />
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Score
              </p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-32 w-32 -rotate-90 transform">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-slate-700/40"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(scorecard.sustainabilityScore / 100) * 352} 352`}
                className={cn(
                  "transition-all",
                  scorecard.scoreColor
                )}
              />
            </svg>
          </div>
        </div>
        <p className={cn("mt-4 text-lg font-semibold", scorecard.scoreColor)}>
          {scorecard.scoreLabel}
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => {
          const colorClasses: Record<string, string> = {
            emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
            blue: "border-blue-500/40 bg-blue-500/10 text-blue-300",
            purple: "border-purple-500/40 bg-purple-500/10 text-purple-300",
          };

          return (
            <div
              key={metric.label}
              className={cn("rounded-2xl border p-4", colorClasses[metric.color])}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300/70">
                {metric.label}
              </p>
              <p className="mt-2 text-2xl font-bold">
                <AnimatedCounter value={metric.value} />
                <span className="ml-1 text-sm">{metric.unit}</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400/70">
            Total trees
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            <AnimatedCounter value={scorecard.totalTrees} />
          </p>
        </div>
        <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400/70">
            Total carbon offset
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            <AnimatedCounter value={scorecard.totalCarbon} /> tons
          </p>
        </div>
        <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400/70">
            Total area
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            <AnimatedCounter value={scorecard.totalArea} /> ha
          </p>
        </div>
      </div>
    </motion.section>
  );
}

