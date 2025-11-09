"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useComplianceChecklistStore,
  type ComplianceItem,
  type ComplianceCategory,
} from "@/store/compliance-checklist";
import { usePlantationsStore } from "@/store/plantations";

export default function ComplianceChecklist() {
  const items = useComplianceChecklistStore((state) => state.items);
  const addItem = useComplianceChecklistStore((state) => state.addItem);
  const updateItem = useComplianceChecklistStore((state) => state.updateItem);
  const removeItem = useComplianceChecklistStore((state) => state.removeItem);
  const getOverdueItems = useComplianceChecklistStore(
    (state) => state.getOverdueItems
  );
  const plantations = usePlantationsStore((state) => state.plantations);

  const [isAdding, setIsAdding] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ComplianceCategory | "all"
  >("all");
  const [form, setForm] = useState<Partial<ComplianceItem>>({
    category: "organic",
    priority: "medium",
    status: "pending",
  });

  const overdueItems = getOverdueItems();
  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.requirement) {
      return;
    }
    addItem({
      category: form.category ?? "organic",
      title: form.title,
      description: form.description,
      requirement: form.requirement,
      dueDate: form.dueDate,
      priority: form.priority ?? "medium",
      status: form.status ?? "pending",
      plantationId: form.plantationId,
      notes: form.notes,
      attachments: form.attachments,
    });
    setForm({
      category: "organic",
      priority: "medium",
      status: "pending",
    });
    setIsAdding(false);
  };

  const categories: ComplianceCategory[] = [
    "organic",
    "fair_trade",
    "environmental",
    "labor",
    "safety",
    "tax",
    "other",
  ];

  const getPriorityColor = (priority: ComplianceItem["priority"]) => {
    switch (priority) {
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

  const getStatusColor = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-300";
      case "overdue":
        return "bg-rose-500/20 text-rose-300";
      case "in_progress":
        return "bg-blue-500/20 text-blue-300";
      case "pending":
        return "bg-slate-500/20 text-slate-300";
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
            Compliance checklist
          </h2>
          <p className="text-sm text-slate-300/80">
            Track regulatory compliance requirements and deadlines.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Add requirement"}
        </button>
      </header>

      {overdueItems.length > 0 && (
        <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3">
          <p className="text-sm font-semibold text-rose-300">
            ⚠️ {overdueItems.length} compliance requirement(s) overdue
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {(["all", ...categories] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition",
              selectedCategory === cat
                ? "bg-leaf-500/20 text-leaf-300 border border-leaf-400/40"
                : "bg-slate-800/80 text-slate-300/70 hover:bg-slate-700/80"
            )}
          >
            {cat === "all"
              ? "All"
              : cat.replace("_", " ").replace(/\b\w/g, (l) =>
                  l.toUpperCase()
                )}
          </button>
        ))}
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
              Title
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
                    category: e.target.value as ComplianceCategory,
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
              Requirement
              <textarea
                value={form.requirement || ""}
                onChange={(e) =>
                  setForm({ ...form, requirement: e.target.value })
                }
                required
                rows={2}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Due date
              <input
                type="date"
                value={form.dueDate || ""}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Priority
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value as ComplianceItem["priority"],
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
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Add requirement
          </button>
        </motion.form>
      )}

      <div className="mt-6 space-y-3">
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              {selectedCategory === "all"
                ? "No compliance items yet. Add your first requirement to get started."
                : `No items in ${selectedCategory} category.`}
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const plantation = plantations.find(
              (p) => p.id === item.plantationId
            );
            return (
              <div
                key={item.id}
                className={cn(
                  "rounded-xl border p-4",
                  getPriorityColor(item.priority)
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-semibold",
                          getStatusColor(item.status)
                        )}
                      >
                        {item.status}
                      </span>
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                        {item.category.replace("_", " ")}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300/70">
                      {item.requirement}
                    </p>
                    {item.dueDate && (
                      <p className="mt-1 text-xs text-slate-300/70">
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status !== "completed" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateItem(item.id, { status: "completed" })
                        }
                        className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold text-slate-200/90 transition hover:bg-slate-700/80"
                      >
                        Complete
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
    </motion.section>
  );
}

