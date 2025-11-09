"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useCropRotationStore,
  type CropRotationPlan,
  type CropType,
} from "@/store/crop-rotation";
import { usePlantationsStore } from "@/store/plantations";

export default function CropRotationPlanner() {
  const plans = useCropRotationStore((state) => state.plans);
  const addPlan = useCropRotationStore((state) => state.addPlan);
  const removePlan = useCropRotationStore((state) => state.removePlan);
  const getRotationHistory = useCropRotationStore(
    (state) => state.getRotationHistory
  );
  const plantations = usePlantationsStore((state) => state.plantations);

  const [isAdding, setIsAdding] = useState(false);
  const [selectedPlantation, setSelectedPlantation] = useState<string | null>(
    null
  );
  const [form, setForm] = useState<Partial<CropRotationPlan>>({
    cropType: "cocoa",
    season: "spring",
    year: new Date().getFullYear(),
    plantingDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.plantationId || !form.plantingDate) {
      return;
    }
    addPlan({
      plantationId: form.plantationId,
      cropType: form.cropType ?? "cocoa",
      season: form.season || "spring",
      year: form.year || new Date().getFullYear(),
      plantingDate: form.plantingDate,
      harvestDate: form.harvestDate,
      expectedYield: form.expectedYield,
      actualYield: form.actualYield,
      notes: form.notes,
    });
    setForm({
      cropType: "cocoa",
      season: "spring",
      year: new Date().getFullYear(),
      plantingDate: new Date().toISOString().split("T")[0],
    });
    setIsAdding(false);
  };

  const cropTypes: CropType[] = [
    "cocoa",
    "banana",
    "cassava",
    "maize",
    "other",
  ];

  const seasons = ["spring", "summer", "autumn", "winter"];

  const rotationHistory = selectedPlantation
    ? getRotationHistory(selectedPlantation)
    : [];

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
            Crop rotation planner
          </h2>
          <p className="text-sm text-slate-300/80">
            Plan crop rotations to optimize soil health and yields.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Add rotation plan"}
        </button>
      </header>

      {isAdding && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleSubmit}
          className="mt-4 space-y-3 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Plantation
              <select
                value={form.plantationId || ""}
                onChange={(e) =>
                  setForm({ ...form, plantationId: e.target.value })
                }
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                <option value="">Select plantation</option>
                {plantations.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.seedName}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Crop type
              <select
                value={form.cropType}
                onChange={(e) =>
                  setForm({ ...form, cropType: e.target.value as CropType })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                {cropTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Season
              <select
                value={form.season}
                onChange={(e) => setForm({ ...form, season: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season.charAt(0).toUpperCase() + season.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Year
              <input
                type="number"
                value={form.year || new Date().getFullYear()}
                onChange={(e) =>
                  setForm({ ...form, year: Number(e.target.value) })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Planting date
              <input
                type="date"
                value={form.plantingDate || ""}
                onChange={(e) =>
                  setForm({ ...form, plantingDate: e.target.value })
                }
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Expected yield (kg)
              <input
                type="number"
                step="0.1"
                value={form.expectedYield || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    expectedYield: Number(e.target.value) || undefined,
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Add rotation plan
          </button>
        </motion.form>
      )}

      <div className="mt-6">
        <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-slate-400/70">
          View rotation history
          <select
            value={selectedPlantation || ""}
            onChange={(e) =>
              setSelectedPlantation(e.target.value || null)
            }
            className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
          >
            <option value="">Select plantation</option>
            {plantations.map((p) => (
              <option key={p.id} value={p.id}>
                {p.seedName}
              </option>
            ))}
          </select>
        </label>

        {selectedPlantation && rotationHistory.length > 0 && (
          <div className="mt-4 space-y-2">
            {rotationHistory.map((plan) => {
              const plantation = plantations.find(
                (p) => p.id === plan.plantationId
              );
              return (
                <div
                  key={plan.id}
                  className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {plan.cropType.charAt(0).toUpperCase() +
                            plan.cropType.slice(1)}
                        </span>
                        <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                          {plan.season} {plan.year}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300/70">
                        <span>
                          Planted:{" "}
                          {new Date(plan.plantingDate).toLocaleDateString()}
                        </span>
                        {plan.harvestDate && (
                          <span>
                            Harvested:{" "}
                            {new Date(plan.harvestDate).toLocaleDateString()}
                          </span>
                        )}
                        {plan.expectedYield && (
                          <span>Expected: {plan.expectedYield} kg</span>
                        )}
                        {plan.actualYield && (
                          <span className="font-semibold text-emerald-300">
                            Actual: {plan.actualYield} kg
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePlan(plan.id)}
                      className="ml-2 rounded-full bg-slate-800/70 p-2 text-slate-200/90 transition hover:bg-slate-700/80"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {plans.length === 0 && (
          <div className="mt-6 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              No crop rotation plans yet. Add your first plan to get started.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}

