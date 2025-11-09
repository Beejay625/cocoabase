"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
};

export default function Breadcrumb({
  items,
  className,
  separator = "/",
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isLink = item.href && !isLast;

        return (
          <div key={index} className="flex items-center gap-2">
            {isLink ? (
              <Link
                href={item.href!}
                className="text-sm text-cocoa-600 hover:text-cocoa-800 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "text-sm",
                  isLast
                    ? "font-medium text-cocoa-800"
                    : "text-cocoa-600"
                )}
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <span className="text-cocoa-400 text-sm">{separator}</span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

