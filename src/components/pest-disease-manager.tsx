"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  usePestDiseaseStore,
  type PestDiseaseRecord,
  type PestDiseaseType,
  type PestDiseaseSeverity,
} from "@/store/pest-disease";
import { usePlantationsStore } from "@/store/plantations";

export default function PestDiseaseManager() {
  const records = usePestDiseaseStore((state) => state.records);
  const addRecord = usePestDiseaseStore((state) => state.addRecord);
  const updateRecord = usePestDiseaseStore((state) => state.updateRecord);
  const removeRecord = usePestDiseaseStore((state) => state.removeRecord);
  const getActiveRecords = usePestDiseaseStore((state) => state.getActiveRecords);
  const plantations = usePlantationsStore((state) => state.plantations);

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<PestDiseaseRecord>>({
    type: "pest",
    severity: "medium",
    status: "active",
    detectedDate: new Date().toISOString().split("T")[0],
  });

  const activeRecords = getActiveRecords();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.plantationId || !form.name) {
      return;
    }
    addRecord({
      type: form.type ?? "pest",
      name: form.name,
      plantationId: form.plantationId,
      severity: form.severity ?? "medium",
      affectedArea: form.affectedArea,
      detectedDate: form.detectedDate || new Date().toISOString().split("T")[0],
      treatment: form.treatment,
      treatmentDate: form.treatmentDate,
      status: form.status ?? "active",
      notes: form.notes,
      photos: form.photos,
    });
    setForm({
      type: "pest",
      severity: "medium",
      status: "active",
      detectedDate: new Date().toISOString().split("T")[0],
    });
    setIsAdding(false);
  };

  const getSeverityColor = (severity: PestDiseaseSeverity) => {
    switch (severity) {
      case "critical":
        return "border-rose-500/60 bg-rose-500/20 text-rose-300";
      case "high":
        return "border-amber-500/60 bg-amber-500/20 text-amber-300";
      case "medium":
        return "border-blue-500/60 bg-blue-500/20 text-blue-300";
      case "low":
        return "border-slate-500/60 bg-slate-500/20 text-slate-300";
    }
  };

  const getTypeIcon = (type: PestDiseaseType) => {
    switch (type) {
      case "pest":
        return "🐛";
      case "disease":
        return "🦠";
      case "weed":
        return "🌿";
    }
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
            Pest & disease management
          </h2>
          <p className="text-sm text-slate-300/80">
            Track pests, diseases, and weeds affecting your plantations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Report issue"}
        </button>
      </header>

      {activeRecords.length > 0 && (
        <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3">
          <p className="text-sm font-semibold text-rose-300">
            ⚠️ {activeRecords.length} active issue(s) require attention
          </p>
        </div>
      )}

      {isAdding && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleSubmit}
          className="mt-4 space-y-3 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Type
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as PestDiseaseType,
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                <option value="pest">Pest</option>
                <option value="disease">Disease</option>
                <option value="weed">Weed</option>
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Name
              <input
                type="text"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="e.g. Cocoa Pod Borer"
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
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
              Severity
              <select
                value={form.severity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    severity: e.target.value as PestDiseaseSeverity,
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Detected date
              <input
                type="date"
                value={form.detectedDate || ""}
                onChange={(e) =>
                  setForm({ ...form, detectedDate: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Treatment
              <input
                type="text"
                value={form.treatment || ""}
                onChange={(e) =>
                  setForm({ ...form, treatment: e.target.value })
                }
                placeholder="e.g. Organic pesticide"
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Report issue
          </button>
        </motion.form>
      )}

      <div className="mt-6 space-y-3">
        {records.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              No pest or disease records yet. Report your first issue to get started.
            </p>
          </div>
        ) : (
          records.map((record) => {
            const plantation = plantations.find(
              (p) => p.id === record.plantationId
            );
            return (
              <div
                key={record.id}
                className={cn(
                  "rounded-xl border p-4",
                  getSeverityColor(record.severity)
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getTypeIcon(record.type)}</span>
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {record.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-2">
                          {plantation && (
                            <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                              {plantation.seedName}
                            </span>
                          )}
                          <span className="text-xs uppercase">
                            {record.severity}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-xs font-semibold",
                              record.status === "active"
                                ? "bg-rose-500/20 text-rose-300"
                                : record.status === "treated"
                                ? "bg-amber-500/20 text-amber-300"
                                : "bg-emerald-500/20 text-emerald-300"
                            )}
                          >
                            {record.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-300/70">
                      Detected: {new Date(record.detectedDate).toLocaleDateString()}
                    </p>
                    {record.treatment && (
                      <p className="mt-1 text-xs text-slate-300/70">
                        Treatment: {record.treatment}
                      </p>
                    )}
                    {record.notes && (
                      <p className="mt-1 text-xs text-slate-200/80">
                        {record.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {record.status === "active" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateRecord(record.id, { status: "treated" })
                        }
                        className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold text-slate-200/90 transition hover:bg-slate-700/80"
                      >
                        Mark treated
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeRecord(record.id)}
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
    </motion.section>
  );
}

