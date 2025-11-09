"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePlantationsStore } from "@/store/plantations";
import AnimatedCounter from "./animated-counter";

export default function YieldComparison() {
  const plantations = usePlantationsStore((state) => state.plantations);

  const comparison = useMemo(() => {
    const harvested = plantations.filter((p) => p.stage === "harvested");

    const yieldsByPlantation = harvested.map((p) => {
      const latestCheckpoint = p.yieldTimeline
        ? [...p.yieldTimeline].sort(
            (a, b) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )[0]
        : null;
      return {
        id: p.id,
        name: p.seedName,
        yield: latestCheckpoint?.yieldKg || 0,
        area: p.areaHectares,
        yieldPerHectare: p.areaHectares > 0
          ? (latestCheckpoint?.yieldKg || 0) / p.areaHectares
          : 0,
      };
    });

    const totalYield = yieldsByPlantation.reduce(
      (sum, p) => sum + p.yield,
      0
    );
    const totalArea = yieldsByPlantation.reduce(
      (sum, p) => sum + p.area,
      0
    );
    const avgYieldPerHectare =
      totalArea > 0 ? totalYield / totalArea : 0;

    const topPerformers = [...yieldsByPlantation]
      .sort((a, b) => b.yieldPerHectare - a.yieldPerHectare)
      .slice(0, 5);

    return {
      totalYield,
      totalArea,
      avgYieldPerHectare,
      topPerformers,
      plantationCount: harvested.length,
    };
  }, [plantations]);

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
            Yield comparison
          </h2>
          <p className="text-sm text-slate-300/80">
            Compare yields across plantations and track performance.
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-300/70">
            Total yield
          </p>
          <p className="mt-2 text-2xl font-bold text-blue-300">
            <AnimatedCounter value={comparison.totalYield} /> kg
          </p>
        </div>
        <div className="rounded-2xl border border-purple-500/40 bg-purple-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-300/70">
            Avg yield/ha
          </p>
          <p className="mt-2 text-2xl font-bold text-purple-300">
            <AnimatedCounter value={comparison.avgYieldPerHectare} /> kg/ha
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
            Plantations
          </p>
          <p className="mt-2 text-2xl font-bold text-emerald-300">
            <AnimatedCounter value={comparison.plantationCount} />
          </p>
        </div>
      </div>

      {comparison.topPerformers.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-white">
            Top performing plantations
          </h3>
          <div className="space-y-2">
            {comparison.topPerformers.map((plantation, index) => (
              <div
                key={plantation.id}
                className="flex items-center justify-between rounded-xl border border-slate-700/40 bg-slate-900/50 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-300">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {plantation.name}
                    </p>
                    <p className="text-xs text-slate-300/70">
                      {plantation.area.toFixed(2)} ha
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-300">
                    {plantation.yieldPerHectare.toFixed(1)} kg/ha
                  </p>
                  <p className="text-xs text-slate-300/70">
                    {plantation.yield.toFixed(1)} kg total
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}

