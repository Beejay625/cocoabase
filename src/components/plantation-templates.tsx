"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  usePlantationsStore,
  type PlantationDraft,
  type GrowthStage,
} from "@/store/plantations";

type PlantationTemplate = {
  id: string;
  name: string;
  description: string;
  template: Partial<PlantationDraft>;
  createdAt: string;
};

const defaultTemplates: PlantationTemplate[] = [
  {
    id: "template-small",
    name: "Small Plot",
    description: "1-2 hectares, 50-100 trees",
    template: {
      treeCount: 75,
      areaHectares: 1.5,
      carbonOffsetTons: 5,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "template-medium",
    name: "Medium Farm",
    description: "3-5 hectares, 150-300 trees",
    template: {
      treeCount: 200,
      areaHectares: 4,
      carbonOffsetTons: 15,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "template-large",
    name: "Large Estate",
    description: "6+ hectares, 300+ trees",
    template: {
      treeCount: 400,
      areaHectares: 8,
      carbonOffsetTons: 35,
    },
    createdAt: new Date().toISOString(),
  },
];

export default function PlantationTemplates() {
  const addPlantation = usePlantationsStore((state) => state.addPlantation);
  const [templates] = useState<PlantationTemplate[]>(defaultTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [form, setForm] = useState({
    seedName: "",
    location: "",
    walletAddress: "",
  });

  const selectedTemplate = templates.find(
    (t) => t.id === selectedTemplateId
  );

  const handleUseTemplate = (template: PlantationTemplate) => {
    if (!form.seedName.trim() || !form.walletAddress.trim()) {
      return;
    }

    const draft: PlantationDraft = {
      seedName: form.seedName.trim(),
      location: form.location.trim() || undefined,
      walletAddress: form.walletAddress.trim(),
      stage: "planted",
      startDate: new Date().toISOString().split("T")[0],
      treeCount: template.template.treeCount ?? 0,
      areaHectares: template.template.areaHectares ?? 0,
      carbonOffsetTons: template.template.carbonOffsetTons ?? 0,
      tasks: template.template.tasks,
      collaborators: template.template.collaborators,
    };

    addPlantation(draft);
    setForm({ seedName: "", location: "", walletAddress: "" });
    setSelectedTemplateId(null);
  };

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
            Plantation templates
          </h2>
          <p className="text-sm text-slate-300/80">
            Quick-start new plantations using pre-configured templates.
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "rounded-2xl border p-4 transition cursor-pointer",
              selectedTemplateId === template.id
                ? "border-leaf-400/60 bg-leaf-500/10"
                : "border-slate-700/40 bg-slate-900/50 hover:border-slate-500/60"
            )}
            onClick={() =>
              setSelectedTemplateId(
                selectedTemplateId === template.id ? null : template.id
              )
            }
          >
            <h3 className="text-sm font-semibold text-white">
              {template.name}
            </h3>
            <p className="mt-1 text-xs text-slate-300/70">
              {template.description}
            </p>
            <div className="mt-3 space-y-1 text-xs text-slate-400/70">
              <p>
                {template.template.treeCount} trees •{" "}
                {template.template.areaHectares} ha
              </p>
              <p>
                ~{template.template.carbonOffsetTons} tons CO₂ offset
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-6 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4"
        >
          <h3 className="mb-4 text-sm font-semibold text-white">
            Create from template: {selectedTemplate.name}
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUseTemplate(selectedTemplate);
            }}
            className="space-y-3"
          >
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Seed name
              <input
                type="text"
                value={form.seedName}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, seedName: event.target.value }))
                }
                placeholder="e.g. Golden Pod Estate"
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                required
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Location (optional)
                <input
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      location: event.target.value,
                    }))
                  }
                  placeholder="e.g. Ashanti, Ghana"
                  className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                />
              </label>
              <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
                Wallet address
                <input
                  type="text"
                  value={form.walletAddress}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      walletAddress: event.target.value,
                    }))
                  }
                  placeholder="0x..."
                  className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={!form.seedName.trim() || !form.walletAddress.trim()}
              className="w-full rounded-full bg-leaf-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400 focus:outline-none focus:ring-2 focus:ring-leaf-300 disabled:cursor-not-allowed disabled:bg-slate-700/40 disabled:text-slate-300/60"
            >
              Create plantation
            </button>
          </form>
        </motion.div>
      )}
    </motion.section>
  );
}

