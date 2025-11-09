"use client";

import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  const variantClasses = {
    default: "bg-cream-200 text-cocoa-700",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}

