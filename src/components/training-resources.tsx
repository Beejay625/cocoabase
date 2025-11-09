"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type TrainingResource = {
  id: string;
  title: string;
  category: string;
  description: string;
  type: "video" | "article" | "guide" | "course";
  duration?: string;
  url?: string;
  icon: string;
};

const trainingResources: TrainingResource[] = [
  {
    id: "1",
    title: "Cocoa Farming Basics",
    category: "Getting Started",
    description: "Learn the fundamentals of cocoa cultivation",
    type: "course",
    duration: "2 hours",
    icon: "🌱",
  },
  {
    id: "2",
    title: "Pest Management Guide",
    category: "Plant Health",
    description: "Identify and manage common cocoa pests",
    type: "guide",
    icon: "🐛",
  },
  {
    id: "3",
    title: "Harvesting Best Practices",
    category: "Operations",
    description: "Optimize your harvest process",
    type: "video",
    duration: "15 min",
    icon: "✂️",
  },
  {
    id: "4",
    title: "Soil Management",
    category: "Plant Health",
    description: "Maintain healthy soil for better yields",
    type: "article",
    icon: "🌍",
  },
  {
    id: "5",
    title: "Organic Certification",
    category: "Certification",
    description: "Steps to achieve organic certification",
    type: "guide",
    icon: "✅",
  },
  {
    id: "6",
    title: "Financial Planning",
    category: "Business",
    description: "Manage your farm finances effectively",
    type: "course",
    duration: "1.5 hours",
    icon: "💰",
  },
];

export default function TrainingResources() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const categories = [
    "all",
    ...new Set(trainingResources.map((r) => r.category)),
  ];

  const filteredResources =
    selectedCategory === "all"
      ? trainingResources
      : trainingResources.filter((r) => r.category === selectedCategory);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#101f3c]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Training resources
          </h2>
          <p className="text-sm text-slate-300/80">
            Educational content and guides for farmers.
          </p>
        </div>
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition",
              selectedCategory === category
                ? "bg-leaf-500/20 text-leaf-300 border border-leaf-400/40"
                : "bg-slate-800/80 text-slate-300/70 hover:bg-slate-700/80"
            )}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4 transition hover:border-slate-500/60 cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{resource.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                    {resource.category}
                  </span>
                  <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                    {resource.type}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {resource.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300/70">
                  {resource.description}
                </p>
                {resource.duration && (
                  <p className="mt-2 text-xs text-slate-400/70">
                    ⏱️ {resource.duration}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

