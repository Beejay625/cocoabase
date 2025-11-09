"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePlantationsStore, type Plantation } from "@/store/plantations";

export default function HarvestPlanner() {
  const plantations = usePlantationsStore((state) => state.plantations);

  const [selectedPlantation, setSelectedPlantation] = useState<string | null>(
    null
  );
  const [harvestDate, setHarvestDate] = useState<string>("");
  const [estimatedYield, setEstimatedYield] = useState<number>(0);

  const growingPlantations = useMemo(
    () => plantations.filter((p) => p.stage === "growing"),
    [plantations]
  );

  const selectedPlantationData = useMemo(() => {
    if (!selectedPlantation) return null;
    return plantations.find((p) => p.id === selectedPlantation);
  }, [selectedPlantation, plantations]);

  const harvestForecast = useMemo(() => {
    return growingPlantations.map((plantation) => {
      const startDate = new Date(plantation.startDate);
      const daysSinceStart = Math.floor(
        (Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const estimatedHarvestDays = 180;
      const daysUntilHarvest = Math.max(0, estimatedHarvestDays - daysSinceStart);
      const estimatedHarvestDate = new Date(
        startDate.getTime() + estimatedHarvestDays * 24 * 60 * 60 * 1000
      );

      const latestCheckpoint = plantation.yieldTimeline
        ? [...plantation.yieldTimeline].sort(
            (a, b) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )[0]
        : null;

      const estimatedYieldKg =
        latestCheckpoint?.yieldKg ??
        plantation.treeCount * 2.5;

      return {
        plantation,
        daysUntilHarvest,
        estimatedHarvestDate,
        estimatedYieldKg,
      };
    });
  }, [growingPlantations]);

  const upcomingHarvests = useMemo(() => {
    return [...harvestForecast]
      .sort(
        (a, b) =>
          a.estimatedHarvestDate.getTime() - b.estimatedHarvestDate.getTime()
      )
      .slice(0, 5);
  }, [harvestForecast]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#101f3c]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Harvest planner</h2>
          <p className="text-sm text-slate-300/80">
            Plan and optimize harvest timing for your plantations.
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4">
          <h3 className="mb-3 text-sm font-semibold text-white">
            Upcoming harvests
          </h3>
          {upcomingHarvests.length === 0 ? (
            <p className="text-sm text-slate-300/80">
              No upcoming harvests. Plantations need to be in "growing" stage.
            </p>
          ) : (
            <div className="space-y-2">
              {upcomingHarvests.map((forecast) => (
                <div
                  key={forecast.plantation.id}
                  className="rounded-xl border border-slate-700/40 bg-slate-950/60 p-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {forecast.plantation.seedName}
                      </p>
                      <p className="mt-1 text-xs text-slate-300/70">
                        {forecast.daysUntilHarvest} days until harvest
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-emerald-300">
                        ~{forecast.estimatedYieldKg.toFixed(0)} kg
                      </p>
                      <p className="text-xs text-slate-400/70">
                        {forecast.estimatedHarvestDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4">
          <h3 className="mb-3 text-sm font-semibold text-white">
            Harvest calendar
          </h3>
          <div className="space-y-2">
            {harvestForecast.map((forecast) => {
              const daysUntil = forecast.daysUntilHarvest;
              const urgency =
                daysUntil <= 7
                  ? "urgent"
                  : daysUntil <= 30
                  ? "soon"
                  : "normal";

              return (
                <div
                  key={forecast.plantation.id}
                  className={cn(
                    "rounded-xl border p-3",
                    urgency === "urgent"
                      ? "border-rose-500/40 bg-rose-500/10"
                      : urgency === "soon"
                      ? "border-amber-500/40 bg-amber-500/10"
                      : "border-slate-700/40 bg-slate-950/60"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {forecast.plantation.seedName}
                      </p>
                      <p className="mt-1 text-xs text-slate-300/70">
                        {forecast.estimatedHarvestDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-xs font-semibold",
                          urgency === "urgent"
                            ? "bg-rose-500/20 text-rose-300"
                            : urgency === "soon"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-slate-800/80 text-slate-300/70"
                        )}
                      >
                        {daysUntil}d
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedPlantationData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4"
        >
          <h3 className="mb-3 text-sm font-semibold text-white">
            Plan harvest for {selectedPlantationData.seedName}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Harvest date
              <input
                type="date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Estimated yield (kg)
              <input
                type="number"
                step="0.1"
                value={estimatedYield}
                onChange={(e) => setEstimatedYield(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={() => {
              if (harvestDate && estimatedYield > 0) {
                alert(
                  `Harvest planned for ${selectedPlantationData.seedName} on ${harvestDate} with estimated yield of ${estimatedYield} kg`
                );
                setHarvestDate("");
                setEstimatedYield(0);
                setSelectedPlantation(null);
              }
            }}
            className="mt-3 w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Save harvest plan
          </button>
        </motion.div>
      )}
    </motion.section>
  );
}

