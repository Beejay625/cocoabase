"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "default" | "primary" | "success" | "warning" | "danger";
  className?: string;
  text?: string;
};

export default function LoadingSpinner({
  size = "md",
  color = "default",
  className,
  text,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colorClasses = {
    default: "border-cocoa-300 border-t-cocoa-900",
    primary: "border-blue-300 border-t-blue-600",
    success: "border-green-300 border-t-green-600",
    warning: "border-yellow-300 border-t-yellow-600",
    danger: "border-red-300 border-t-red-600",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <motion.div
        className={cn(
          "rounded-full border-2",
          sizeClasses[size],
          colorClasses[color]
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {text && (
        <p className="text-sm text-cocoa-600 animate-pulse">{text}</p>
      )}
    </div>
  );
}

