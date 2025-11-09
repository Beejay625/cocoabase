"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { usePlantationsStore } from "@/store/plantations";

export default function YieldComparison() {
  const plantations = usePlantationsStore((state) => state.plantations);

  const comparison = useMemo(() => {
    const yields = plantations
      .filter((p) => p.yieldTimeline.length > 0)
      .map((p) => ({
        name: p.seedName,
        yield: p.yieldTimeline[p.yieldTimeline.length - 1].yieldKg,
        stage: p.stage,
      }))
      .sort((a, b) => b.yield - a.yield)
      .slice(0, 5);

    const avgYield =
      yields.length > 0
        ? yields.reduce((acc, y) => acc + y.yield, 0) / yields.length
        : 0;
    const maxYield = yields.length > 0 ? yields[0].yield : 0;
    const minYield =
      yields.length > 0 ? yields[yields.length - 1].yield : 0;

    return {
      yields,
      avgYield,
      maxYield,
      minYield,
    };
  }, [plantations]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-cream-200 bg-gradient-to-br from-amber-50/80 to-yellow-50/80 p-6 shadow-sm backdrop-blur"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-cocoa-900">
          Yield Comparison
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
          Compare yields across plantations
        </p>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-amber-200 bg-white/90 p-3">
          <div className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
            Avg Yield
          </div>
          <div className="mt-1 text-xl font-bold text-amber-700">
            {comparison.avgYield.toFixed(0)} kg
          </div>
        </div>
        <div className="rounded-xl border border-yellow-200 bg-white/90 p-3">
          <div className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
            Max Yield
          </div>
          <div className="mt-1 text-xl font-bold text-yellow-700">
            {comparison.maxYield.toFixed(0)} kg
          </div>
        </div>
        <div className="rounded-xl border border-gold-200 bg-white/90 p-3">
          <div className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
            Min Yield
          </div>
          <div className="mt-1 text-xl font-bold text-gold-700">
            {comparison.minYield.toFixed(0)} kg
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {comparison.yields.length === 0 ? (
          <div className="rounded-xl border border-cream-200 bg-cream-50/70 p-4 text-center">
            <p className="text-sm text-cocoa-600">No yield data available</p>
          </div>
        ) : (
          comparison.yields.map((yield, index) => {
            const percentage =
              comparison.maxYield > 0
                ? (yield.yield / comparison.maxYield) * 100
                : 0;
            return (
              <div
                key={yield.name}
                className="rounded-xl border border-amber-200 bg-white/80 p-3"
              >
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-semibold text-cocoa-700">
                    {yield.name}
                  </span>
                  <span className="text-cocoa-600">
                    {yield.yield.toFixed(0)} kg
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-amber-500"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.section>
  );
}
