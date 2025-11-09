"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useSupplyChainStore,
  type SupplyChainItem,
  type SupplyChainStage,
} from "@/store/supply-chain";
import { usePlantationsStore } from "@/store/plantations";

export default function SupplyChainTracker() {
  const items = useSupplyChainStore((state) => state.items);
  const addItem = useSupplyChainStore((state) => state.addItem);
  const updateStage = useSupplyChainStore((state) => state.updateStage);
  const removeItem = useSupplyChainStore((state) => state.removeItem);
  const plantations = usePlantationsStore((state) => state.plantations);

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<SupplyChainItem>>({
    stage: "harvested",
    quantityKg: 0,
  });

  const stages: SupplyChainStage[] = [
    "harvested",
    "processing",
    "packaging",
    "transport",
    "warehouse",
    "retail",
    "delivered",
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.plantationId || form.quantityKg === undefined) {
      return;
    }
    addItem({
      plantationId: form.plantationId,
      harvestId: form.harvestId,
      stage: form.stage ?? "harvested",
      quantityKg: form.quantityKg ?? 0,
      currentLocation: form.currentLocation,
      destination: form.destination,
      carrier: form.carrier,
      trackingNumber: form.trackingNumber,
      estimatedDelivery: form.estimatedDelivery,
      qualityGrade: form.qualityGrade,
      certifications: form.certifications,
      notes: form.notes,
    });
    setForm({
      stage: "harvested",
      quantityKg: 0,
    });
    setIsAdding(false);
  };

  const getStageColor = (stage: SupplyChainStage) => {
    const colors: Record<SupplyChainStage, string> = {
      harvested: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      processing: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      packaging: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      transport: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      warehouse: "bg-sky-500/20 text-sky-300 border-sky-500/40",
      retail: "bg-pink-500/20 text-pink-300 border-pink-500/40",
      delivered: "bg-green-500/20 text-green-300 border-green-500/40",
    };
    return colors[stage];
  };

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
            Supply chain tracker
          </h2>
          <p className="text-sm text-slate-300/80">
            Track produce from harvest to market delivery.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Add shipment"}
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
              Quantity (kg)
              <input
                type="number"
                step="0.1"
                value={form.quantityKg || 0}
                onChange={(e) =>
                  setForm({ ...form, quantityKg: Number(e.target.value) })
                }
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Stage
              <select
                value={form.stage}
                onChange={(e) =>
                  setForm({ ...form, stage: e.target.value as SupplyChainStage })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage.charAt(0).toUpperCase() + stage.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Current location
              <input
                type="text"
                value={form.currentLocation || ""}
                onChange={(e) =>
                  setForm({ ...form, currentLocation: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Tracking number
              <input
                type="text"
                value={form.trackingNumber || ""}
                onChange={(e) =>
                  setForm({ ...form, trackingNumber: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Estimated delivery
              <input
                type="date"
                value={form.estimatedDelivery || ""}
                onChange={(e) =>
                  setForm({ ...form, estimatedDelivery: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Add shipment
          </button>
        </motion.form>
      )}

      <div className="mt-6">
        <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-2">
          {stages.map((stage) => {
            const stageItems = items.filter((item) => item.stage === stage);
            return (
              <div
                key={stage}
                className={cn(
                  "flex min-w-[120px] flex-col items-center gap-1 rounded-xl border p-2",
                  getStageColor(stage)
                )}
              >
                <span className="text-xs font-semibold uppercase">
                  {stage}
                </span>
                <span className="text-lg font-bold">{stageItems.length}</span>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
              <p className="text-sm text-slate-300/80">
                No shipments tracked yet. Add your first shipment to get started.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const plantation = plantations.find(
                (p) => p.id === item.plantationId
              );
              return (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-xl border p-4",
                    getStageColor(item.stage)
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase">
                          {item.stage}
                        </span>
                        {plantation && (
                          <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                            {plantation.seedName}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm font-semibold text-white">
                        {item.quantityKg} kg
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300/70">
                        {item.currentLocation && (
                          <span>📍 {item.currentLocation}</span>
                        )}
                        {item.trackingNumber && (
                          <span>📦 {item.trackingNumber}</span>
                        )}
                        {item.estimatedDelivery && (
                          <span>
                            📅{" "}
                            {new Date(item.estimatedDelivery).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {stages.indexOf(item.stage) < stages.length - 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const currentIndex = stages.indexOf(item.stage);
                            updateStage(item.id, stages[currentIndex + 1]);
                          }}
                          className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold text-slate-200/90 transition hover:bg-slate-700/80"
                        >
                          Advance
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="rounded-full bg-slate-800/70 p-2 text-slate-200/90 transition hover:bg-slate-700/80"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </motion.section>
  );
}

