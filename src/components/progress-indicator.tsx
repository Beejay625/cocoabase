"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type ProgressIndicatorProps = {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "default" | "success" | "warning" | "danger";
  className?: string;
  animated?: boolean;
};

export default function ProgressIndicator({
  value,
  max = 100,
  label,
  showValue = true,
  size = "md",
  color = "default",
  className,
  animated = true,
}: ProgressIndicatorProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const colorClasses = {
    default: "bg-cocoa-600",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between text-sm">
          {label && (
            <span className="text-cocoa-600 font-medium">{label}</span>
          )}
          {showValue && (
            <span className="text-cocoa-500">
              {value.toFixed(0)} / {max.toFixed(0)}
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-cream-200 overflow-hidden",
          sizeClasses[size]
        )}
      >
        {animated ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "h-full rounded-full transition-colors",
              colorClasses[color]
            )}
          />
        ) : (
          <div
            className={cn(
              "h-full rounded-full transition-all",
              colorClasses[color]
            )}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
      {showValue && (
        <div className="mt-1 text-right text-xs text-cocoa-400">
          {percentage.toFixed(1)}%
        </div>
      )}
    </div>
  );
}

