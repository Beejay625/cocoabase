"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useFinancialStore } from "@/store/financial";
import { useLaborStore } from "@/store/labor";
import { useInventoryStore } from "@/store/inventory";
import { useMaintenanceStore } from "@/store/maintenance";
import AnimatedCounter from "./animated-counter";

export default function CostAnalysis() {
  const transactions = useFinancialStore((state) => state.transactions);
  const laborRecords = useLaborStore((state) => state.records);
  const inventoryItems = useInventoryStore((state) => state.items);
  const maintenanceRecords = useMaintenanceStore((state) => state.records);

  const analysis = useMemo(() => {
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const laborCosts = laborRecords.reduce(
      (sum, record) => sum + record.totalCost,
      0
    );

    const inventoryValue = inventoryItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    const maintenanceCosts = maintenanceRecords
      .filter((r) => r.cost)
      .reduce((sum, r) => sum + (r.cost || 0), 0);

    const totalCosts = expenses + laborCosts + maintenanceCosts;

    const categoryBreakdown = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        const category = t.category || "other";
        acc[category] = (acc[category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    return {
      totalCosts,
      expenses,
      laborCosts,
      inventoryValue,
      maintenanceCosts,
      categoryBreakdown,
    };
  }, [transactions, laborRecords, inventoryItems, maintenanceRecords]);

  const categories = Object.entries(analysis.categoryBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#101f3c]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Cost analysis</h2>
          <p className="text-sm text-slate-300/80">
            Detailed breakdown of operational costs and expenses.
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-300/70">
            Total costs
          </p>
          <p className="mt-2 text-2xl font-bold text-blue-300">
            $<AnimatedCounter value={analysis.totalCosts} />
          </p>
        </div>
        <div className="rounded-2xl border border-purple-500/40 bg-purple-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-300/70">
            Labor costs
          </p>
          <p className="mt-2 text-2xl font-bold text-purple-300">
            $<AnimatedCounter value={analysis.laborCosts} />
          </p>
        </div>
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">
            Maintenance
          </p>
          <p className="mt-2 text-2xl font-bold text-amber-300">
            $<AnimatedCounter value={analysis.maintenanceCosts} />
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
            Inventory value
          </p>
          <p className="mt-2 text-2xl font-bold text-emerald-300">
            $<AnimatedCounter value={analysis.inventoryValue} />
          </p>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-white">
            Top expense categories
          </h3>
          <div className="space-y-2">
            {categories.map(([category, amount]) => {
              const percentage =
                (amount / analysis.totalCosts) * 100 || 0;
              return (
                <div key={category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300/70 capitalize">
                      {category.replace("_", " ")}
                    </span>
                    <span className="font-semibold text-white">
                      ${amount.toLocaleString()} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800/60">
                    <div
                      className="h-full bg-blue-500/60 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.section>
  );
}

