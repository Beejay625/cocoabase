"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useTrainingRecordsStore,
  type TrainingRecord,
  type TrainingType,
} from "@/store/training-records";

export default function TrainingRecords() {
  const records = useTrainingRecordsStore((state) => state.records);
  const addRecord = useTrainingRecordsStore((state) => state.addRecord);
  const updateRecord = useTrainingRecordsStore((state) => state.updateRecord);
  const removeRecord = useTrainingRecordsStore((state) => state.removeRecord);
  const getUpcomingTrainings = useTrainingRecordsStore(
    (state) => state.getUpcomingTrainings
  );

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<TrainingRecord>>({
    type: "safety",
    status: "scheduled",
    participants: [],
    scheduledDate: new Date().toISOString().split("T")[0],
  });

  const upcomingTrainings = getUpcomingTrainings(30);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      return;
    }
    addRecord({
      type: form.type ?? "safety",
      title: form.title,
      description: form.description,
      trainer: form.trainer,
      participants: form.participants || [],
      scheduledDate: form.scheduledDate || new Date().toISOString().split("T")[0],
      completedDate: form.completedDate,
      duration: form.duration,
      cost: form.cost,
      certificateIssued: form.certificateIssued,
      status: form.status ?? "scheduled",
      notes: form.notes,
      attachments: form.attachments,
    });
    setForm({
      type: "safety",
      status: "scheduled",
      participants: [],
      scheduledDate: new Date().toISOString().split("T")[0],
    });
    setIsAdding(false);
  };

  const types: TrainingType[] = [
    "safety",
    "technical",
    "certification",
    "compliance",
    "other",
  ];

  const getTypeColor = (type: TrainingType) => {
    switch (type) {
      case "safety":
        return "border-rose-500/60 bg-rose-500/20 text-rose-300";
      case "technical":
        return "border-blue-500/60 bg-blue-500/20 text-blue-300";
      case "certification":
        return "border-emerald-500/60 bg-emerald-500/20 text-emerald-300";
      case "compliance":
        return "border-amber-500/60 bg-amber-500/20 text-amber-300";
      case "other":
        return "border-slate-500/60 bg-slate-500/20 text-slate-300";
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
          <h2 className="text-lg font-semibold text-white">Training records</h2>
          <p className="text-sm text-slate-300/80">
            Track training sessions and certifications for workers.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Add training"}
        </button>
      </header>

      {upcomingTrainings.length > 0 && (
        <div className="mt-4 rounded-xl border border-blue-500/40 bg-blue-500/10 p-3">
          <p className="text-sm font-semibold text-blue-300">
            📅 {upcomingTrainings.length} upcoming training(s) in the next 30 days
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
              Training title
              <input
                type="text"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Type
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as TrainingType })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Scheduled date
              <input
                type="date"
                value={form.scheduledDate || ""}
                onChange={(e) =>
                  setForm({ ...form, scheduledDate: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Trainer
              <input
                type="text"
                value={form.trainer || ""}
                onChange={(e) => setForm({ ...form, trainer: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Add training
          </button>
        </motion.form>
      )}

      <div className="mt-6 space-y-3">
        {records.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              No training records yet. Add your first training to get started.
            </p>
          </div>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              className={cn("rounded-xl border p-4", getTypeColor(record.type))}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">
                      {record.title}
                    </h3>
                    <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                      {record.status}
                    </span>
                  </div>
                  {record.description && (
                    <p className="mt-1 text-xs text-slate-300/70">
                      {record.description}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300/70">
                    <span>
                      📅 {new Date(record.scheduledDate).toLocaleDateString()}
                    </span>
                    {record.trainer && <span>👤 {record.trainer}</span>}
                    {record.participants.length > 0 && (
                      <span>👥 {record.participants.length} participants</span>
                    )}
                    {record.certificateIssued && (
                      <span className="font-semibold text-emerald-300">
                        ✓ Certificate issued
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {record.status === "scheduled" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateRecord(record.id, { status: "completed" })
                      }
                      className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold text-slate-200/90 transition hover:bg-slate-700/80"
                    >
                      Complete
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
          ))
        )}
      </div>
    </motion.section>
  );
}

