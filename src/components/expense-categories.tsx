"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useEngagementStore } from "@/store/engagement";

export default function ExpenseCategories() {
  const receipts = useEngagementStore((state) => state.receipts);

  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    receipts.forEach((receipt) => {
      const category = receipt.category || "Other";
      categoryMap.set(
        category,
        (categoryMap.get(category) || 0) + receipt.amount
      );
    });

    const total = receipts.reduce((acc, r) => acc + r.amount, 0);
    return Array.from(categoryMap.entries())
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6);
  }, [receipts]);

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-cream-200 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 p-6 shadow-sm backdrop-blur"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-cocoa-900">
          Expense Categories
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
          Spending by category
        </p>
      </div>

      <div className="space-y-3">
        {categories.length === 0 ? (
          <div className="rounded-xl border border-cream-200 bg-cream-50/70 p-6 text-center">
            <p className="text-sm text-cocoa-600">No expenses recorded</p>
          </div>
        ) : (
          categories.map((category, index) => (
            <div key={category.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-cocoa-700">
                  {category.name}
                </span>
                <span className="text-cocoa-600">
                  {new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: receipts[0]?.currency || "USD",
                  }).format(category.amount)}{" "}
                  ({category.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${category.percentage}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full ${colors[index % colors.length]}`}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </motion.section>
  );
}
