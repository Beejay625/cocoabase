"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  PerformanceMetric,
  calculateKPIScore,
  getPerformanceRating,
  compareToBenchmark,
} from "@/lib/benchmark-utils";

type PerformanceDashboardProps = {
  metrics: PerformanceMetric[];
  className?: string;
};

export default function PerformanceDashboard({
  metrics,
  className,
}: PerformanceDashboardProps) {
  const overallScore = calculateKPIScore(metrics);
  const rating = getPerformanceRating(overallScore);

  const ratingColors = {
    excellent: "bg-green-500",
    good: "bg-blue-500",
    average: "bg-yellow-500",
    poor: "bg-red-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-xl bg-white border border-cream-200 p-6", className)}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-cocoa-800">Performance Dashboard</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-cocoa-800">
            {overallScore.toFixed(1)}/100
          </div>
          <div
            className={cn(
              "text-xs font-medium capitalize mt-1 px-2 py-1 rounded",
              ratingColors[rating.rating],
              "text-white"
            )}
          >
            {rating.rating}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => {
          const comparison =
            metric.benchmark !== undefined
              ? compareToBenchmark(metric.value, metric.benchmark)
              : null;
          const targetPercentage =
            metric.target !== undefined
              ? (metric.value / metric.target) * 100
              : null;

          return (
            <div key={metric.id} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-cocoa-700">{metric.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-cocoa-800">
                    {metric.value.toLocaleString()} {metric.unit}
                  </span>
                  {metric.target && (
                    <span className="text-xs text-cocoa-500">
                      / {metric.target.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {targetPercentage !== null && (
                <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, targetPercentage)}%` }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "h-full",
                      targetPercentage >= 90
                        ? "bg-green-500"
                        : targetPercentage >= 75
                        ? "bg-blue-500"
                        : targetPercentage >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    )}
                  />
                </div>
              )}

              {comparison && (
                <div className="text-xs text-cocoa-500">
                  {comparison.status === "above" ? "↑" : comparison.status === "below" ? "↓" : "="}{" "}
                  {Math.abs(comparison.percentage).toFixed(1)}% vs benchmark
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

