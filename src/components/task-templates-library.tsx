"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function TaskTemplatesLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const templates = [
    {
      id: "1",
      name: "Fertilization Schedule",
      category: "maintenance",
      description: "Standard fertilization routine",
      tasks: 5,
      icon: "🌱",
    },
    {
      id: "2",
      name: "Harvest Preparation",
      category: "harvest",
      description: "Pre-harvest checklist",
      tasks: 8,
      icon: "🚚",
    },
    {
      id: "3",
      name: "Pest Control",
      category: "pest",
      description: "Regular pest inspection and treatment",
      tasks: 6,
      icon: "🐛",
    },
    {
      id: "4",
      name: "Irrigation Check",
      category: "irrigation",
      description: "Weekly irrigation system maintenance",
      tasks: 4,
      icon: "💧",
    },
    {
      id: "5",
      name: "Soil Testing",
      category: "soil",
      description: "Quarterly soil health assessment",
      tasks: 7,
      icon: "🌍",
    },
    {
      id: "6",
      name: "Pruning Schedule",
      category: "maintenance",
      description: "Seasonal pruning tasks",
      tasks: 5,
      icon: "✂️",
    },
  ];

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "maintenance", label: "Maintenance" },
    { id: "harvest", label: "Harvest" },
    { id: "pest", label: "Pest Control" },
    { id: "irrigation", label: "Irrigation" },
    { id: "soil", label: "Soil" },
  ];

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-cream-200 bg-gradient-to-br from-green-50/80 to-emerald-50/80 p-6 shadow-sm backdrop-blur"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-cocoa-900">
          Task Templates Library
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
          Pre-configured task templates
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              selectedCategory === category.id
                ? "border-green-600 bg-green-600 text-white"
                : "border-cream-300 bg-white text-cocoa-700 hover:border-green-300"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="rounded-xl border border-green-200 bg-white/80 p-4"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{template.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-cocoa-900">
                  {template.name}
                </h3>
                <p className="mt-1 text-xs text-cocoa-600">
                  {template.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                    {template.tasks} tasks
                  </span>
                  <button
                    type="button"
                    className="rounded-full border border-green-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-green-700 transition hover:bg-green-50"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
