"use client";

import type { Plantation, GrowthStage } from "@/store/plantations";
import { getNextStage } from "@/store/plantations";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/cn";
import {
  getPlantationAge,
  formatPlantationAge,
  getUrgentTasks,
  getPlantationHealthScore,
  getPlantationSummary,
} from "@/lib/plantation-utils";

type PlantationCardProps = {
  plantation: Plantation;
  onUpdate: (plantation: Plantation) => void;
  onAdvanceStage?: (plantation: Plantation, nextStage: GrowthStage) => void;
};

const stageMeta: Record<
  GrowthStage,
  { label: string; emoji: string; progress: number; gradient: string }
> = {
  planted: {
    label: "Planted",
    emoji: "🌱",
    progress: 25,
    gradient: "from-leaf-400 to-leaf-500",
  },
  growing: {
    label: "Growing",
    emoji: "🌿",
    progress: 60,
    gradient: "from-gold-300 to-leaf-500",
  },
  harvested: {
    label: "Harvested",
    emoji: "🌾",
    progress: 100,
    gradient: "from-gold-400 to-amber-500",
  },
};

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default function PlantationCard({
  plantation,
  onUpdate,
  onAdvanceStage,
}: PlantationCardProps) {
  const meta = stageMeta[plantation.stage];
  const nextStage = useMemo(
    () => getNextStage(plantation.stage),
    [plantation.stage]
  );
  const canAdvance = plantation.stage !== "harvested";

  return (
    <motion.article
      layout
      whileHover={{ y: -4, scale: 1.01 }}
      className="flex h-full flex-col rounded-3xl border border-cream-200 bg-cream-50/80 p-5 shadow-sm shadow-cocoa-900/5 backdrop-blur"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-cocoa-900">
            {plantation.seedName}
          </h3>
          <p className="text-sm text-cocoa-500">
            {plantation.location ?? "Unknown location"}
          </p>
        </div>
        <span className="text-2xl" role="img" aria-label={meta.label}>
          {meta.emoji}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-cocoa-600">{meta.label}</span>
          <span className="text-cocoa-500">
            Started {formatter.format(new Date(plantation.startDate))}
          </span>
        </div>

        <div className="h-2 rounded-full bg-cream-200">
          <div
            className={cn(
              "h-2 rounded-full bg-gradient-to-r transition-all duration-500 ease-out",
              meta.gradient
            )}
            style={{ width: `${meta.progress}%` }}
          />
        </div>

        <p className="text-sm text-cocoa-500">
          Last updated: {formatter.format(new Date(plantation.updatedAt))}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => onUpdate(plantation)}
          className="text-sm font-medium text-leaf-600 transition hover:text-leaf-700 focus:outline-none focus:ring-1 focus:ring-leaf-400 focus:ring-offset-2 focus:ring-offset-cream-50"
        >
          Update Progress
        </button>

        <motion.button
          type="button"
          whileHover={canAdvance ? { scale: 1.05 } : undefined}
          whileTap={canAdvance ? { scale: 0.97 } : undefined}
          disabled={!canAdvance}
          onClick={() =>
            canAdvance && onAdvanceStage?.(plantation, nextStage)
          }
          className={cn(
            "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition focus:outline-none focus:ring-2 focus:ring-offset-2",
            canAdvance
              ? "bg-cocoa-900 text-cream-50 focus:ring-cocoa-500 focus:ring-offset-cream-50"
              : "bg-cream-200 text-cocoa-400"
          )}
        >
          {canAdvance ? `Advance to ${stageMeta[nextStage].label}` : "Complete"}
        </motion.button>
      </div>
    </motion.article>
  );
}

