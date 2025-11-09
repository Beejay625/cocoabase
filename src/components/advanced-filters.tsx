"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { Plantation, GrowthStage } from "@/store/plantations";

type AdvancedFiltersProps = {
  plantations: Plantation[];
  onFilterChange: (filtered: Plantation[]) => void;
};

type FilterState = {
  stages: GrowthStage[];
  minTrees: string;
  maxTrees: string;
  minArea: string;
  maxArea: string;
  minCarbon: string;
  maxCarbon: string;
  hasTasks: "all" | "with" | "without";
  hasCollaborators: "all" | "with" | "without";
  location: string;
  dateRange: {
    start?: string;
    end?: string;
  };
};

const defaultFilters: FilterState = {
  stages: [],
  minTrees: "",
  maxTrees: "",
  minArea: "",
  maxArea: "",
  minCarbon: "",
  maxCarbon: "",
  hasTasks: "all",
  hasCollaborators: "all",
  location: "",
  dateRange: {},
};

export default function AdvancedFilters({
  plantations,
  onFilterChange,
}: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isOpen, setIsOpen] = useState(false);

  const filteredPlantations = useMemo(() => {
    return plantations.filter((plantation) => {
      if (filters.stages.length > 0 && !filters.stages.includes(plantation.stage)) {
        return false;
      }

      if (filters.minTrees && plantation.treeCount < Number(filters.minTrees)) {
        return false;
      }
      if (filters.maxTrees && plantation.treeCount > Number(filters.maxTrees)) {
        return false;
      }

      if (filters.minArea && plantation.areaHectares < Number(filters.minArea)) {
        return false;
      }
      if (filters.maxArea && plantation.areaHectares > Number(filters.maxArea)) {
        return false;
      }

      if (
        filters.minCarbon &&
        plantation.carbonOffsetTons < Number(filters.minCarbon)
      ) {
        return false;
      }
      if (
        filters.maxCarbon &&
        plantation.carbonOffsetTons > Number(filters.maxCarbon)
      ) {
        return false;
      }

      if (filters.hasTasks === "with" && plantation.tasks.length === 0) {
        return false;
      }
      if (filters.hasTasks === "without" && plantation.tasks.length > 0) {
        return false;
      }

      if (
        filters.hasCollaborators === "with" &&
        plantation.collaborators.length === 0
      ) {
        return false;
      }
      if (
        filters.hasCollaborators === "without" &&
        plantation.collaborators.length > 0
      ) {
        return false;
      }

      if (
        filters.location &&
        !plantation.location?.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      if (filters.dateRange.start) {
        const startDate = new Date(filters.dateRange.start);
        const plantationDate = new Date(plantation.startDate);
        if (plantationDate < startDate) {
          return false;
        }
      }
      if (filters.dateRange.end) {
        const endDate = new Date(filters.dateRange.end);
        const plantationDate = new Date(plantation.startDate);
        if (plantationDate > endDate) {
          return false;
        }
      }

      return true;
    });
  }, [plantations, filters]);

  useEffect(() => {
    onFilterChange(filteredPlantations);
  }, [filteredPlantations, onFilterChange]);

  const handleToggleStage = (stage: GrowthStage) => {
    setFilters((prev) => ({
      ...prev,
      stages: prev.stages.includes(stage)
        ? prev.stages.filter((s) => s !== stage)
        : [...prev.stages, stage],
    }));
  };

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.stages.length > 0) count++;
    if (filters.minTrees || filters.maxTrees) count++;
    if (filters.minArea || filters.maxArea) count++;
    if (filters.minCarbon || filters.maxCarbon) count++;
    if (filters.hasTasks !== "all") count++;
    if (filters.hasCollaborators !== "all") count++;
    if (filters.location) count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    return count;
  }, [filters]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-slate-600/40 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-200/90 transition hover:border-slate-400/60 hover:text-white"
      >
        <span>🔍</span>
        <span>Advanced filters</span>
        {activeFilterCount > 0 && (
          <span className="rounded-full bg-leaf-500/20 px-2 py-0.5 text-xs font-semibold text-leaf-300">
            {activeFilterCount}
          </span>
        )}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Filter plantations ({filteredPlantations.length} of {plantations.length})
            </h3>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-300/70 hover:text-white"
            >
              Reset all
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Stages
              </p>
              <div className="flex flex-wrap gap-2">
                {(["planted", "growing", "harvested"] as GrowthStage[]).map(
                  (stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => handleToggleStage(stage)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold transition",
                        filters.stages.includes(stage)
                          ? "bg-leaf-500/20 text-leaf-300 border border-leaf-400/40"
                          : "bg-slate-800/80 text-slate-300/70 hover:bg-slate-700/80"
                      )}
                    >
                      {stage}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Tree count
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minTrees}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      minTrees: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxTrees}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxTrees: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Area (ha)
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  placeholder="Min"
                  value={filters.minArea}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      minArea: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Max"
                  value={filters.maxArea}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxArea: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Carbon offset (tons)
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  placeholder="Min"
                  value={filters.minCarbon}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      minCarbon: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Max"
                  value={filters.maxCarbon}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxCarbon: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Tasks
              </p>
              <select
                value={filters.hasTasks}
                onChange={(event) =>
                  setFilters((prev) => ({
                    ...prev,
                    hasTasks: event.target.value as FilterState["hasTasks"],
                  }))
                }
                className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                <option value="all">All</option>
                <option value="with">With tasks</option>
                <option value="without">Without tasks</option>
              </select>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Collaborators
              </p>
              <select
                value={filters.hasCollaborators}
                onChange={(event) =>
                  setFilters((prev) => ({
                    ...prev,
                    hasCollaborators: event.target.value as FilterState["hasCollaborators"],
                  }))
                }
                className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                <option value="all">All</option>
                <option value="with">With collaborators</option>
                <option value="without">Without collaborators</option>
              </select>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Location
              </p>
              <input
                type="text"
                value={filters.location}
                onChange={(event) =>
                  setFilters((prev) => ({
                    ...prev,
                    location: event.target.value,
                  }))
                }
                placeholder="Filter by location..."
                className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Date range
              </p>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={filters.dateRange.start || ""}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      dateRange: {
                        ...prev.dateRange,
                        start: event.target.value || undefined,
                      },
                    }))
                  }
                  className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                />
                <input
                  type="date"
                  value={filters.dateRange.end || ""}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      dateRange: {
                        ...prev.dateRange,
                        end: event.target.value || undefined,
                      },
                    }))
                  }
                  className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

