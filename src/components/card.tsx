"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  variant?: "default" | "outlined" | "elevated";
};

export default function Card({
  children,
  title,
  description,
  header,
  footer,
  className,
  hover = false,
  onClick,
  variant = "default",
}: CardProps) {
  const variantClasses = {
    default: "bg-white border border-cream-200",
    outlined: "bg-transparent border-2 border-cream-300",
    elevated: "bg-white shadow-lg border border-cream-200",
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      onClick={onClick}
      whileHover={hover ? { y: -2, scale: 1.01 } : undefined}
      className={cn(
        "rounded-2xl p-6 transition-all",
        variantClasses[variant],
        onClick && "cursor-pointer",
        className
      )}
    >
      {(title || description || header) && (
        <div className="mb-4">
          {header || (
            <>
              {title && (
                <h3 className="text-lg font-semibold text-cocoa-900 mb-1">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-cocoa-600">{description}</p>
              )}
            </>
          )}
        </div>
      )}
      <div>{children}</div>
      {footer && <div className="mt-4 pt-4 border-t border-cream-200">{footer}</div>}
    </Component>
  );
}

