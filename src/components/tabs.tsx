"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Tab = {
  id: string;
  label: string;
  icon?: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  variant?: "default" | "pills" | "underline";
};

export default function Tabs({
  tabs,
  defaultTab,
  className,
  variant = "default",
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex gap-1 border-b border-cream-200",
          variant === "pills" && "border-b-0 gap-2",
          variant === "underline" && "border-b-2"
        )}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors relative",
                variant === "default" &&
                  cn(
                    "border-b-2 -mb-px",
                    isActive
                      ? "border-cocoa-900 text-cocoa-900"
                      : "border-transparent text-cocoa-600 hover:text-cocoa-900"
                  ),
                variant === "pills" &&
                  cn(
                    "rounded-full",
                    isActive
                      ? "bg-cocoa-900 text-cream-50"
                      : "bg-cream-100 text-cocoa-600 hover:bg-cream-200"
                  ),
                variant === "underline" &&
                  cn(
                    "border-b-2 -mb-0.5",
                    isActive
                      ? "border-cocoa-900 text-cocoa-900"
                      : "border-transparent text-cocoa-600 hover:text-cocoa-900"
                  )
              )}
            >
              <span className="flex items-center gap-2">
                {tab.icon && <span>{tab.icon}</span>}
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-4"
      >
        {activeTabContent}
      </motion.div>
    </div>
  );
}

