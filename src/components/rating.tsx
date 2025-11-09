"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type RatingProps = {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabel?: boolean;
};

export default function Rating({
  value = 0,
  onChange,
  max = 5,
  readonly = false,
  size = "md",
  className,
  showLabel = false,
}: RatingProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const displayValue = hoveredValue ?? value;

  const handleClick = (newValue: number) => {
    if (!readonly && onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= displayValue;

          return (
            <motion.button
              key={starValue}
              type="button"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => !readonly && setHoveredValue(starValue)}
              onMouseLeave={() => !readonly && setHoveredValue(null)}
              disabled={readonly}
              whileHover={!readonly ? { scale: 1.2 } : {}}
              whileTap={!readonly ? { scale: 0.9 } : {}}
              className={cn(
                sizeClasses[size],
                "transition-colors",
                !readonly && "cursor-pointer",
                readonly && "cursor-default"
              )}
            >
              <span className={cn(
                "block",
                isFilled ? "text-yellow-400" : "text-cream-300"
              )}>
                ★
              </span>
            </motion.button>
          );
        })}
      </div>
      {showLabel && (
        <span className="text-sm text-cocoa-600 ml-2">
          {value > 0 ? `${value}/${max}` : "Not rated"}
        </span>
      )}
    </div>
  );
}

