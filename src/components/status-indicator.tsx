"use client";

import { cn } from "@/lib/cn";

type StatusIndicatorProps = {
  status: "online" | "offline" | "pending" | "error" | "warning" | "success";
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  pulse?: boolean;
};

export default function StatusIndicator({
  status,
  label,
  size = "md",
  className,
  pulse = false,
}: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    pending: "bg-yellow-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    success: "bg-green-500",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-full",
          sizeClasses[size],
          statusClasses[status],
          pulse && "animate-pulse"
        )}
        aria-label={status}
      />
      {label && (
        <span className="text-sm text-cocoa-600 font-medium">{label}</span>
      )}
    </div>
  );
}

