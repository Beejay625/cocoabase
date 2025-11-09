"use client";

import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  hover?: boolean;
};

export default function Card({
  children,
  className,
  padding = "md",
  shadow = "md",
  border = true,
  hover = false,
}: CardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div
      className={cn(
        "rounded-2xl bg-white",
        paddingClasses[padding],
        shadowClasses[shadow],
        border && "border border-cream-200",
        hover && "transition-transform hover:scale-[1.02] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold text-cocoa-800", className)}>
      {children}
    </h3>
  );
}

type CardDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-cocoa-600 mt-1", className)}>
      {children}
    </p>
  );
}

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}

type CardFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-cream-200", className)}>
      {children}
    </div>
  );
}
