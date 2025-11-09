"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { GrowthStage, Plantation } from "@/store/plantations";
import { getNextStage } from "@/store/plantations";
import { cn } from "@/lib/cn";

type BulkStagePanelProps = {
  plantations: Plantation[];
  onBulkUpdate: (
    plantationIds: string[],
    nextStage: GrowthStage,
    note?: string
  ) => void;
};

const stageOrder: GrowthStage[] = ["planted", "growing", "harvested"];

const stageLabels: Record<GrowthStage, string> = {
  planted: "Planted",
  growing: "Growing",
  harvested: "Harvested",
};

const suggestedTargetStage = (plantations: Plantation[]): GrowthStage => {
  if (!plantations.length) {
    return "growing";
  }

  let maxIndex = 0;
  plantations.forEach((plantation) => {
    const index = stageOrder.indexOf(plantation.stage);
    if (index > maxIndex) {
      maxIndex = index;
    }
  });

  return stageOrder[Math.min(maxIndex + 1, stageOrder.length - 1)] ?? "growing";
};

export default function BulkStagePanel({
  plantations,
  onBulkUpdate,
}: BulkStagePanelProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [targetStage, setTargetStage] = useState<GrowthStage>(() =>
    suggestedTargetStage(plantations)
  );
  const [note, setNote] = useState("");

  const summary = useMemo(() => {
    const counts: Record<GrowthStage, number> = {
      planted: 0,
      growing: 0,
      harvested: 0,
    };
    const eligibleIds: string[] = [];

    plantations.forEach((plantation) => {
      counts[plantation.stage] += 1;
      if (plantation.stage !== targetStage) {
        eligibleIds.push(plantation.id);
      }
    });

    return {
      counts,
      eligibleIds,
      total: plantations.length,
    };
  }, [plantations, targetStage]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      if (prev.size === summary.eligibleIds.length) {
        return new Set();
      }
      return new Set(summary.eligibleIds);
    });
  };

  const handleApply = () => {
    if (!selectedIds.size) {
      return;
    }
    onBulkUpdate(Array.from(selectedIds), targetStage, note.trim() || undefined);
    setSelectedIds(new Set());
    setNote("");
  };

  const stageOptions = useMemo(() => {
    return stageOrder.map((stage) => {
      const eligibleCount = summary.total - summary.counts[stage];
      return {
        value: stage,
        label: stageLabels[stage],
        disabled: stage === targetStage || eligibleCount === 0,
      };
    });
  }, [summary, targetStage]);

  const displayPlantations = useMemo(
    () =>
      plantations
        .map((plantation) => ({
          plantation,
          nextStage:
            plantation.stage === "harvested"
              ? "harvested"
              : getNextStage(plantation.stage),
          isEligible: plantation.stage !== targetStage,
        }))
        .sort((a, b) => {
          const stageDiff =
            stageOrder.indexOf(a.plantation.stage) -
            stageOrder.indexOf(b.plantation.stage);
          if (stageDiff !== 0) {
            return stageDiff;
          }
          return a.plantation.seedName.localeCompare(b.plantation.seedName);
        }),
    [plantations, targetStage]
  );

  const eligibleSelectedCount = Array.from(selectedIds).filter((id) =>
    summary.eligibleIds.includes(id)
  ).length;

  const canApply =
    eligibleSelectedCount > 0 &&
    targetStage !== undefined &&
    stageOrder.includes(targetStage);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-3xl border border-cream-200 bg-cream-50/80 p-5 shadow-sm shadow-cocoa-900/5 backdrop-blur"
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-cocoa-900">
            Bulk Stage Progression
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
            Advance multiple plantations together
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-cocoa-500">
          {stageOrder.map((stage) => (
            <span
              key={stage}
              className="rounded-full bg-white/70 px-2.5 py-1 font-medium shadow-sm"
            >
              {stageLabels[stage]}: {summary.counts[stage]}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr,0.55fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleSelectAll}
              className="rounded-full border border-cocoa-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cocoa-600 transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-300 focus:ring-offset-1 focus:ring-offset-cream-50"
            >
              {selectedIds.size === summary.eligibleIds.length
                ? "Clear selection"
                : "Select eligible"}
            </button>
            <span className="text-xs text-cocoa-500">
              {eligibleSelectedCount} selected
            </span>
          </div>

          <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {displayPlantations.map(({ plantation, nextStage, isEligible }) => (
              <label
                key={plantation.id}
                className={cn(
                  "flex items-start justify-between gap-3 rounded-2xl border border-cream-200 bg-white/80 p-3 text-sm shadow-sm transition",
                  !isEligible && "opacity-70"
                )}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(plantation.id)}
                    disabled={!isEligible}
                    onChange={() => toggleSelection(plantation.id)}
                    className="mt-1 h-4 w-4 rounded border-cocoa-300 text-leaf-500 focus:ring-leaf-400 disabled:cursor-not-allowed"
                  />
                  <div>
                    <p className="font-semibold text-cocoa-900">
                      {plantation.seedName}
                    </p>
                    <p className="text-xs text-cocoa-500">
                      Current: {stageLabels[plantation.stage]} • Next:{" "}
                      {stageLabels[nextStage]}
                      {plantation.location ? ` • ${plantation.location}` : ""}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-cream-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cocoa-500">
                  {stageLabels[plantation.stage]}
                </span>
              </label>
            ))}
            {displayPlantations.length === 0 && (
              <div className="rounded-2xl bg-white/70 p-4 text-sm text-cocoa-500 shadow-inner">
                No plantations available. Add plantations to use bulk progression.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white/85 p-4 shadow-inner">
          <h3 className="text-sm font-semibold text-cocoa-900">Target stage</h3>
          <div className="mt-3 space-y-2">
            {stageOptions.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-3 py-2 text-sm transition",
                  option.disabled
                    ? "border-cream-200 bg-cream-100/60 text-cocoa-400"
                    : "border-cream-200 bg-cream-50/80 text-cocoa-700 hover:border-cocoa-200"
                )}
              >
                <input
                  type="radio"
                  name="bulk-stage-target"
                  value={option.value}
                  checked={targetStage === option.value}
                  onChange={() => setTargetStage(option.value)}
                  disabled={option.disabled}
                  className="h-4 w-4 border-cocoa-300 text-leaf-500 focus:ring-leaf-400 disabled:cursor-not-allowed"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-cocoa-900">
                    {option.label}
                  </span>
                  <span className="text-xs text-cocoa-500">
                    {option.disabled
                      ? "No eligible plantations for this stage."
                      : "Set selected plantations to this stage."}
                  </span>
                </div>
              </label>
            ))}
          </div>

          <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.25em] text-cocoa-400">
            Shared update note (optional)
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
              placeholder="e.g. Advanced after inspection"
              className="mt-2 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
            />
          </label>

          <button
            type="button"
            onClick={handleApply}
            disabled={!canApply}
            className={cn(
              "mt-4 w-full rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white",
              canApply
                ? "bg-cocoa-900 text-cream-50 hover:bg-cocoa-800 focus:ring-cocoa-500"
                : "cursor-not-allowed bg-cream-200 text-cocoa-400 focus:ring-cocoa-200"
            )}
          >
            Advance selected
          </button>

          <p className="mt-2 text-[11px] text-cocoa-400">
            Only plantations not already in the target stage will be affected.
          </p>
        </div>
      </div>
    </motion.section>
  );
}


