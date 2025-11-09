"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useExpenseCategoriesStore,
  type ExpenseCategory,
} from "@/store/expense-categories";

export default function ExpenseCategories() {
  const categories = useExpenseCategoriesStore((state) => state.categories);
  const addCategory = useExpenseCategoriesStore((state) => state.addCategory);
  const updateCategory = useExpenseCategoriesStore(
    (state) => state.updateCategory
  );
  const removeCategory = useExpenseCategoriesStore(
    (state) => state.removeCategory
  );
  const getActiveCategories = useExpenseCategoriesStore(
    (state) => state.getActiveCategories
  );

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<ExpenseCategory>>({
    color: "#3b82f6",
    isActive: true,
  });

  const activeCategories = getActiveCategories();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      return;
    }
    addCategory({
      name: form.name,
      description: form.description,
      color: form.color || "#3b82f6",
      icon: form.icon,
      parentId: form.parentId,
      isActive: form.isActive !== undefined ? form.isActive : true,
    });
    setForm({
      color: "#3b82f6",
      isActive: true,
    });
    setIsAdding(false);
  };

  const colors = [
    "#3b82f6", // blue
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ef4444", // rose
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#84cc16", // lime
  ];

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
            Expense categories
          </h2>
          <p className="text-sm text-slate-300/80">
            Organize expenses with custom categories and colors.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Add category"}
        </button>
      </header>

      <div className="mt-6 rounded-2xl border border-blue-500/40 bg-blue-500/10 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-300/70">
          Active categories
        </p>
        <p className="mt-2 text-2xl font-bold text-blue-300">
          {activeCategories.length}
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
              Category name
              <input
                type="text"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Description
              <input
                type="text"
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Color
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  value={form.color || "#3b82f6"}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="h-10 w-20 rounded-xl border border-slate-600/40 bg-slate-950/60"
                />
                <div className="flex gap-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm({ ...form, color })}
                      className={cn(
                        "h-8 w-8 rounded-full border-2 transition",
                        form.color === color
                          ? "border-white scale-110"
                          : "border-slate-600/40"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Add category
          </button>
        </motion.form>
      )}

      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {categories.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              No categories yet. Add your first category to get started.
            </p>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between rounded-xl border border-slate-700/40 bg-slate-900/50 p-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {category.name}
                  </p>
                  {category.description && (
                    <p className="text-xs text-slate-300/70">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {category.isActive ? (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-300">
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-500/20 px-2 py-0.5 text-xs text-slate-300">
                    Inactive
                  </span>
                )}
                <button
                  type="button"
                  onClick={() =>
                    updateCategory(category.id, {
                      isActive: !category.isActive,
                    })
                  }
                  className="rounded-full bg-slate-800/70 p-1.5 text-slate-200/90 transition hover:bg-slate-700/80"
                >
                  {category.isActive ? "✓" : "○"}
                </button>
                <button
                  type="button"
                  onClick={() => removeCategory(category.id)}
                  className="rounded-full bg-slate-800/70 p-1.5 text-slate-200/90 transition hover:bg-slate-700/80"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.section>
  );
}

