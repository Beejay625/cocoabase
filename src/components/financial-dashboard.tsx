"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useFinancialStore,
  type FinancialTransaction,
  type FinancialTransactionDraft,
} from "@/store/financial";
import { usePlantationsStore } from "@/store/plantations";
import AnimatedCounter from "./animated-counter";

export default function FinancialDashboard() {
  const transactions = useFinancialStore((state) => state.transactions);
  const addTransaction = useFinancialStore((state) => state.addTransaction);
  const removeTransaction = useFinancialStore((state) => state.removeTransaction);
  const getTotalRevenue = useFinancialStore((state) => state.getTotalRevenue);
  const getTotalExpenses = useFinancialStore((state) => state.getTotalExpenses);
  const getNetProfit = useFinancialStore((state) => state.getNetProfit);
  const plantations = usePlantationsStore((state) => state.plantations);

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<FinancialTransactionDraft>>({
    type: "expense",
    category: "other",
    amount: 0,
    currency: "USD",
    description: "",
  });

  const totalRevenue = getTotalRevenue();
  const totalExpenses = getTotalExpenses();
  const netProfit = getNetProfit();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.description || form.amount === undefined) {
      return;
    }
    addTransaction({
      type: form.type ?? "expense",
      category: form.category ?? "other",
      amount: form.amount ?? 0,
      currency: form.currency ?? "USD",
      description: form.description,
      plantationId: form.plantationId,
      date: form.date ?? new Date().toISOString().split("T")[0],
      receiptUrl: form.receiptUrl,
      notes: form.notes,
    });
    setForm({
      type: "expense",
      category: "other",
      amount: 0,
      currency: "USD",
      description: "",
    });
    setIsAdding(false);
  };

  const categories: FinancialTransaction["category"][] = [
    "seeds",
    "fertilizer",
    "equipment",
    "labor",
    "harvest",
    "maintenance",
    "transport",
    "other",
  ];

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

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
            Financial dashboard
          </h2>
          <p className="text-sm text-slate-300/80">
            Track expenses and revenue for your plantations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Add transaction"}
        </button>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
            Total revenue
          </p>
          <p className="mt-2 text-2xl font-bold text-emerald-300">
            $<AnimatedCounter value={totalRevenue} />
          </p>
        </div>
        <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-300/70">
            Total expenses
          </p>
          <p className="mt-2 text-2xl font-bold text-rose-300">
            $<AnimatedCounter value={totalExpenses} />
          </p>
        </div>
        <div
          className={cn(
            "rounded-2xl border p-4",
            netProfit >= 0
              ? "border-emerald-500/40 bg-emerald-500/10"
              : "border-rose-500/40 bg-rose-500/10"
          )}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-300/70">
            Net profit
          </p>
          <p
            className={cn(
              "mt-2 text-2xl font-bold",
              netProfit >= 0 ? "text-emerald-300" : "text-rose-300"
            )}
          >
            $<AnimatedCounter value={netProfit} />
          </p>
        </div>
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
              Type
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as FinancialTransaction["type"],
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                <option value="expense">Expense</option>
                <option value="revenue">Revenue</option>
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Category
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as FinancialTransaction["category"],
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Amount
              <input
                type="number"
                step="0.01"
                value={form.amount || 0}
                onChange={(e) =>
                  setForm({ ...form, amount: Number(e.target.value) })
                }
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Date
              <input
                type="date"
                value={form.date || new Date().toISOString().split("T")[0]}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70 sm:col-span-2">
              Description
              <input
                type="text"
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Plantation (optional)
              <select
                value={form.plantationId || ""}
                onChange={(e) =>
                  setForm({ ...form, plantationId: e.target.value || undefined })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                <option value="">None</option>
                {plantations.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.seedName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Add transaction
          </button>
        </motion.form>
      )}

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold text-white">
          Recent transactions
        </h3>
        {recentTransactions.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              No transactions yet. Add your first transaction to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between rounded-xl border border-slate-700/40 bg-slate-900/50 p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-xs font-semibold uppercase tracking-[0.2em]",
                        txn.type === "revenue"
                          ? "text-emerald-300"
                          : "text-rose-300"
                      )}
                    >
                      {txn.type}
                    </span>
                    <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                      {txn.category}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {txn.description}
                  </p>
                  <p className="mt-1 text-xs text-slate-300/70">
                    {new Date(txn.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p
                    className={cn(
                      "text-lg font-bold",
                      txn.type === "revenue"
                        ? "text-emerald-300"
                        : "text-rose-300"
                    )}
                  >
                    {txn.type === "expense" ? "-" : "+"}
                    {txn.currency} {txn.amount.toLocaleString()}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeTransaction(txn.id)}
                    className="rounded-full bg-slate-800/70 p-2 text-slate-200/90 transition hover:bg-slate-700/80"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}

