"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  InventoryItem,
  isLowStock,
  getInventoryHealth,
  calculateInventoryValue,
} from "@/lib/inventory-utils";

type InventoryStatusProps = {
  items: InventoryItem[];
  className?: string;
};

export default function InventoryStatus({
  items,
  className,
}: InventoryStatusProps) {
  const health = getInventoryHealth(items);
  const totalValue = calculateInventoryValue(items);
  const lowStockCount = items.filter(isLowStock).length;
  const totalItems = items.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-xl bg-white border border-cream-200 p-6", className)}
    >
      <h3 className="text-lg font-semibold text-cocoa-800 mb-4">Inventory Status</h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-xs text-cocoa-500 mb-1">Total Items</div>
          <div className="text-2xl font-bold text-cocoa-800">{totalItems}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-cocoa-500 mb-1">Low Stock</div>
          <div
            className={cn(
              "text-2xl font-bold",
              lowStockCount > 0 ? "text-red-600" : "text-green-600"
            )}
          >
            {lowStockCount}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-cocoa-500 mb-1">Total Value</div>
          <div className="text-lg font-semibold text-cocoa-800">
            ${totalValue.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-cocoa-700">Health Score</span>
          <span className="text-sm font-semibold text-cocoa-800">{health.score}/100</span>
        </div>
        <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${health.score}%` }}
            transition={{ duration: 0.5 }}
            className={cn(
              "h-full rounded-full",
              health.score >= 80
                ? "bg-green-500"
                : health.score >= 60
                ? "bg-yellow-500"
                : "bg-red-500"
            )}
          />
        </div>
      </div>

      {health.issues.length > 0 && (
        <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
          <div className="text-xs font-medium text-yellow-800 mb-2">Issues</div>
          <ul className="space-y-1">
            {health.issues.map((issue, index) => (
              <li key={index} className="text-xs text-yellow-700 flex items-start gap-2">
                <span>⚠</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

