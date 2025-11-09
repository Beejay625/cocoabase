"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  Budget,
  calculateBudgetUtilization,
  calculateRemainingBudget,
  getBudgetVariance,
  formatBudgetCategory,
} from "@/lib/budget-utils";

type BudgetPlannerProps = {
  budgets: Budget[];
  className?: string;
};

export default function BudgetPlanner({
  budgets,
  className,
}: BudgetPlannerProps) {
  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const utilization = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;

  const statusColors = {
    "on-track": "bg-green-100 text-green-800 border-green-300",
    "over-budget": "bg-red-100 text-red-800 border-red-300",
    "under-budget": "bg-blue-100 text-blue-800 border-blue-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-xl bg-white border border-cream-200 p-6", className)}
    >
      <h3 className="text-lg font-semibold text-cocoa-800 mb-4">Budget Planner</h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-xs text-cocoa-500 mb-1">Allocated</div>
          <div className="text-lg font-bold text-cocoa-800">
            ${totalAllocated.toLocaleString()}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-cocoa-500 mb-1">Spent</div>
          <div className="text-lg font-bold text-cocoa-800">
            ${totalSpent.toLocaleString()}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-cocoa-500 mb-1">Remaining</div>
          <div className="text-lg font-bold text-green-600">
            ${(totalAllocated - totalSpent).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-cocoa-700">Budget Utilization</span>
          <span className="text-sm font-semibold text-cocoa-800">
            {utilization.toFixed(1)}%
          </span>
        </div>
        <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, utilization)}%` }}
            transition={{ duration: 0.5 }}
            className={cn(
              "h-full rounded-full",
              utilization > 100
                ? "bg-red-500"
                : utilization >= 80
                ? "bg-yellow-500"
                : "bg-green-500"
            )}
          />
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {budgets.map((budget) => {
          const utilization = calculateBudgetUtilization(budget);
          const remaining = calculateRemainingBudget(budget);
          const variance = getBudgetVariance(budget);

          return (
            <div
              key={budget.id}
              className={cn("rounded-lg border p-3 text-sm", statusColors[budget.status])}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{budget.name}</span>
                <span className="text-xs">{utilization.toFixed(1)}%</span>
              </div>
              <div className="text-xs opacity-75 mb-2">
                {formatBudgetCategory(budget.category)}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>
                  ${budget.spent.toLocaleString()} / ${budget.allocated.toLocaleString()}
                </span>
                <span>
                  {variance.variance >= 0 ? "+" : ""}${Math.abs(variance.variance).toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
