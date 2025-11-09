"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useHarvestQualityStore,
  type QualityMetric,
} from "@/store/harvest-quality";
import { usePlantationsStore } from "@/store/plantations";
import AnimatedCounter from "./animated-counter";

export default function HarvestQualityTracker() {
  const metrics = useHarvestQualityStore((state) => state.metrics);
  const addMetric = useHarvestQualityStore((state) => state.addMetric);
  const removeMetric = useHarvestQualityStore((state) => state.removeMetric);
  const getAverageGrade = useHarvestQualityStore(
    (state) => state.getAverageGrade
  );
  const plantations = usePlantationsStore((state) => state.plantations);

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<QualityMetric>>({
    grade: "grade_a",
    moistureContent: 7,
    beanCount: 100,
    defectRate: 5,
    testDate: new Date().toISOString().split("T")[0],
  });

  const avgGrade = getAverageGrade();
  const recentMetrics = [...metrics]
    .sort(
      (a, b) =>
        new Date(b.testDate).getTime() - new Date(a.testDate).getTime()
    )
    .slice(0, 10);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.plantationId || !form.harvestId) {
      return;
    }
    addMetric({
      harvestId: form.harvestId,
      plantationId: form.plantationId,
      testDate: form.testDate || new Date().toISOString().split("T")[0],
      moistureContent: form.moistureContent ?? 7,
      beanCount: form.beanCount ?? 100,
      defectRate: form.defectRate ?? 5,
      fermentationScore: form.fermentationScore,
      flavorNotes: form.flavorNotes,
      grade: form.grade ?? "grade_a",
      tester: form.tester,
      notes: form.notes,
    });
    setForm({
      grade: "grade_a",
      moistureContent: 7,
      beanCount: 100,
      defectRate: 5,
      testDate: new Date().toISOString().split("T")[0],
    });
    setIsAdding(false);
  };

  const getGradeColor = (grade: QualityMetric["grade"]) => {
    switch (grade) {
      case "premium":
        return "border-emerald-500/60 bg-emerald-500/20 text-emerald-300";
      case "grade_a":
        return "border-blue-500/60 bg-blue-500/20 text-blue-300";
      case "grade_b":
        return "border-amber-500/60 bg-amber-500/20 text-amber-300";
      case "reject":
        return "border-rose-500/60 bg-rose-500/20 text-rose-300";
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
            Harvest quality tracker
          </h2>
          <p className="text-sm text-slate-300/80">
            Track quality metrics and grades for your harvests.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Add quality test"}
        </button>
      </header>

      <div className="mt-6 rounded-2xl border border-blue-500/40 bg-blue-500/10 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-300/70">
          Average quality grade
        </p>
        <p className="mt-2 text-2xl font-bold text-blue-300">
          <AnimatedCounter value={avgGrade} /> / 4.0
        </p>
      </div>

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
              Harvest ID
              <input
                type="text"
                value={form.harvestId || ""}
                onChange={(e) => setForm({ ...form, harvestId: e.target.value })}
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Test date
              <input
                type="date"
                value={form.testDate || ""}
                onChange={(e) => setForm({ ...form, testDate: e.target.value })}
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Grade
              <select
                value={form.grade}
                onChange={(e) =>
                  setForm({
                    ...form,
                    grade: e.target.value as QualityMetric["grade"],
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                <option value="premium">Premium</option>
                <option value="grade_a">Grade A</option>
                <option value="grade_b">Grade B</option>
                <option value="reject">Reject</option>
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Moisture content (%)
              <input
                type="number"
                step="0.1"
                value={form.moistureContent || 7}
                onChange={(e) =>
                  setForm({ ...form, moistureContent: Number(e.target.value) })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Defect rate (%)
              <input
                type="number"
                step="0.1"
                value={form.defectRate || 5}
                onChange={(e) =>
                  setForm({ ...form, defectRate: Number(e.target.value) })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Add quality test
          </button>
        </motion.form>
      )}

      <div className="mt-6 space-y-2">
        {recentMetrics.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              No quality tests yet. Add your first test to get started.
            </p>
          </div>
        ) : (
          recentMetrics.map((metric) => {
            const plantation = plantations.find(
              (p) => p.id === metric.plantationId
            );
            return (
              <div
                key={metric.id}
                className={cn("rounded-xl border p-4", getGradeColor(metric.grade))}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {metric.grade.replace("_", " ").toUpperCase()}
                      </span>
                      {plantation && (
                        <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                          {plantation.seedName}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300/70">
                      <span>📅 {new Date(metric.testDate).toLocaleDateString()}</span>
                      <span>💧 Moisture: {metric.moistureContent}%</span>
                      <span>🔢 Beans: {metric.beanCount}</span>
                      <span>⚠️ Defects: {metric.defectRate}%</span>
                      {metric.tester && <span>👤 {metric.tester}</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMetric(metric.id)}
                    className="ml-2 rounded-full bg-slate-800/70 p-2 text-slate-200/90 transition hover:bg-slate-700/80"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.section>
  );
}

