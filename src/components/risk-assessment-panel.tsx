"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useRiskAssessmentStore,
  type RiskAssessment,
  type RiskCategory,
  type RiskLevel,
} from "@/store/risk-assessment";
import { usePlantationsStore } from "@/store/plantations";

export default function RiskAssessmentPanel() {
  const assessments = useRiskAssessmentStore((state) => state.assessments);
  const addAssessment = useRiskAssessmentStore((state) => state.addAssessment);
  const updateAssessment = useRiskAssessmentStore(
    (state) => state.updateAssessment
  );
  const removeAssessment = useRiskAssessmentStore(
    (state) => state.removeAssessment
  );
  const getActiveRisks = useRiskAssessmentStore((state) => state.getActiveRisks);
  const plantations = usePlantationsStore((state) => state.plantations);

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<RiskAssessment>>({
    category: "weather",
    riskLevel: "medium",
    probability: 50,
    impact: 50,
    status: "identified",
    identifiedDate: new Date().toISOString().split("T")[0],
  });

  const activeRisks = getActiveRisks();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      return;
    }
    addAssessment({
      category: form.category ?? "weather",
      title: form.title,
      description: form.description,
      plantationId: form.plantationId,
      riskLevel: form.riskLevel ?? "medium",
      probability: form.probability ?? 50,
      impact: form.impact ?? 50,
      mitigationStrategy: form.mitigationStrategy,
      status: form.status ?? "identified",
      identifiedDate:
        form.identifiedDate || new Date().toISOString().split("T")[0],
      resolvedDate: form.resolvedDate,
      notes: form.notes,
    });
    setForm({
      category: "weather",
      riskLevel: "medium",
      probability: 50,
      impact: 50,
      status: "identified",
      identifiedDate: new Date().toISOString().split("T")[0],
    });
    setIsAdding(false);
  };

  const categories: RiskCategory[] = [
    "weather",
    "pest_disease",
    "market",
    "financial",
    "operational",
    "regulatory",
    "other",
  ];

  const levels: RiskLevel[] = ["low", "medium", "high", "critical"];

  const getLevelColor = (level: RiskLevel) => {
    switch (level) {
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

  const calculateRiskScore = (probability: number, impact: number) => {
    return (probability + impact) / 2;
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
          <h2 className="text-lg font-semibold text-white">Risk assessment</h2>
          <p className="text-sm text-slate-300/80">
            Identify, assess, and mitigate risks to your operations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Assess risk"}
        </button>
      </header>

      {activeRisks.length > 0 && (
        <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3">
          <p className="text-sm font-semibold text-amber-300">
            ⚠️ {activeRisks.length} active risk(s) require attention
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
              Risk title
              <input
                type="text"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Category
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as RiskCategory,
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace("_", " ").replace(/\b\w/g, (l) =>
                      l.toUpperCase()
                    )}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70 sm:col-span-2">
              Description
              <textarea
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                rows={2}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Risk level
              <select
                value={form.riskLevel}
                onChange={(e) =>
                  setForm({ ...form, riskLevel: e.target.value as RiskLevel })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Probability (%)
              <input
                type="number"
                min="0"
                max="100"
                value={form.probability || 50}
                onChange={(e) =>
                  setForm({ ...form, probability: Number(e.target.value) })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Impact (%)
              <input
                type="number"
                min="0"
                max="100"
                value={form.impact || 50}
                onChange={(e) =>
                  setForm({ ...form, impact: Number(e.target.value) })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70 sm:col-span-2">
              Mitigation strategy
              <textarea
                value={form.mitigationStrategy || ""}
                onChange={(e) =>
                  setForm({ ...form, mitigationStrategy: e.target.value })
                }
                rows={2}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Add risk assessment
          </button>
        </motion.form>
      )}

      <div className="mt-6 space-y-3">
        {assessments.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              No risk assessments yet. Add your first assessment to get started.
            </p>
          </div>
        ) : (
          assessments.map((assessment) => {
            const plantation = plantations.find(
              (p) => p.id === assessment.plantationId
            );
            const riskScore = calculateRiskScore(
              assessment.probability,
              assessment.impact
            );
            return (
              <div
                key={assessment.id}
                className={cn("rounded-xl border p-4", getLevelColor(assessment.riskLevel))}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">
                        {assessment.title}
                      </h3>
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                        {assessment.category.replace("_", " ")}
                      </span>
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                        Score: {riskScore.toFixed(0)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300/70">
                      {assessment.description}
                    </p>
                    {plantation && (
                      <p className="mt-1 text-xs text-slate-300/70">
                        📍 {plantation.seedName}
                      </p>
                    )}
                    {assessment.mitigationStrategy && (
                      <p className="mt-2 text-xs text-slate-200/80">
                        <span className="font-semibold">Mitigation:</span>{" "}
                        {assessment.mitigationStrategy}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400/70">
                      <span>Probability: {assessment.probability}%</span>
                      <span>Impact: {assessment.impact}%</span>
                      <span>
                        Identified:{" "}
                        {new Date(assessment.identifiedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {assessment.status === "identified" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateAssessment(assessment.id, {
                            status: "mitigated",
                          })
                        }
                        className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold text-slate-200/90 transition hover:bg-slate-700/80"
                      >
                        Mitigate
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeAssessment(assessment.id)}
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

