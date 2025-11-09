"use client";

import { cn } from "@/lib/cn";

type LoadingSkeletonProps = {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
  width?: string | number;
  height?: string | number;
  lines?: number;
};

export default function LoadingSkeleton({
  className,
  variant = "rectangular",
  width,
  height,
  lines,
}: LoadingSkeletonProps) {
  const baseClasses = "skeleton bg-slate-200/20 rounded";

  if (variant === "text" && lines) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              i === lines - 1 ? "w-3/4" : "w-full",
              "h-4"
            )}
          />
        ))}
      </div>
    );
  }

  const style: React.CSSProperties = {};
  if (width) {
    style.width = typeof width === "number" ? `${width}px` : width;
  }
  if (height) {
    style.height = typeof height === "number" ? `${height}px` : height;
  }

  return (
    <div
      className={cn(
        baseClasses,
        variant === "circular" && "rounded-full",
        variant === "text" && "h-4",
        variant === "rectangular" && !height && "h-24",
        className
      )}
      style={style}
    />
  );
}

