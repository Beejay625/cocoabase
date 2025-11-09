"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { Plantation } from "@/store/plantations";
import { subscribeToPlantationEvents, type PlantationEvent } from "@/store/plantations";

type ActivityFeedProps = {
  plantations: Plantation[];
  maxItems?: number;
  onFilterChange?: (filtered: Plantation[]) => void;
};

type ActivityItem = {
  id: string;
  type: string;
  timestamp: string;
  title: string;
  description?: string;
  plantationId?: string;
  plantationName?: string;
  icon: string;
  color: string;
};

export default function ActivityFeed({
  plantations,
  maxItems = 20,
}: ActivityFeedProps) {
  const [events, setEvents] = useState<PlantationEvent[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const unsubscribe = subscribeToPlantationEvents((event) => {
      setEvents((prev) => [event, ...prev].slice(0, maxItems));
    });

    return unsubscribe;
  }, [maxItems]);

  const activityItems = useMemo(() => {
    const items: ActivityItem[] = [];

    events.forEach((event) => {
      const plantation = plantations.find(
        (p) => p.id === ("plantation" in event ? event.plantation.id : undefined)
      );

      switch (event.type) {
        case "stage_change":
          items.push({
            id: `event-${event.timestamp}-${event.plantation.id}`,
            type: "stage_change",
            timestamp: event.timestamp,
            title: `Stage changed: ${event.previousStage} → ${event.nextStage}`,
            description: event.note,
            plantationId: event.plantation.id,
            plantationName: event.plantation.seedName,
            icon: "🌿",
            color: "text-purple-300",
          });
          break;
        case "task_added":
          items.push({
            id: `event-${event.timestamp}-${event.task.id}`,
            type: "task_added",
            timestamp: event.timestamp,
            title: `Task added: ${event.task.title}`,
            plantationId: event.plantation.id,
            plantationName: event.plantation.seedName,
            icon: "📋",
            color: "text-sky-300",
          });
          break;
        case "task_status_change":
          items.push({
            id: `event-${event.timestamp}-${event.task.id}`,
            type: "task_status_change",
            timestamp: event.timestamp,
            title: `Task ${event.nextStatus}: ${event.task.title}`,
            plantationId: event.plantation.id,
            plantationName: event.plantation.seedName,
            icon: "✅",
            color: "text-emerald-300",
          });
          break;
        case "yield_checkpoint_added":
          items.push({
            id: `event-${event.timestamp}-${event.checkpoint.id}`,
            type: "yield_checkpoint_added",
            timestamp: event.timestamp,
            title: `Yield logged: ${event.checkpoint.event}`,
            description: `${event.checkpoint.yieldKg} kg`,
            plantationId: event.plantation.id,
            plantationName: event.plantation.seedName,
            icon: "📊",
            color: "text-amber-300",
          });
          break;
        case "collaborator_added":
          items.push({
            id: `event-${event.timestamp}-${event.collaborator.id}`,
            type: "collaborator_added",
            timestamp: event.timestamp,
            title: `Collaborator added: ${event.collaborator.name}`,
            description: event.collaborator.role,
            plantationId: event.plantation.id,
            plantationName: event.plantation.seedName,
            icon: "👥",
            color: "text-blue-300",
          });
          break;
      }
    });

    return items.filter(
      (item) => filter === "all" || item.type === filter
    );
  }, [events, plantations, filter]);

  const typeFilters = [
    { value: "all", label: "All activity" },
    { value: "stage_change", label: "Stage changes" },
    { value: "task_added", label: "Tasks" },
    { value: "yield_checkpoint_added", label: "Yield logs" },
    { value: "collaborator_added", label: "Collaborators" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#101f3c]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Activity feed</h2>
          <p className="text-sm text-slate-300/80">
            Real-time updates on plantation changes, tasks, and events.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-full border border-slate-600/40 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 focus:border-leaf-400/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
          >
            {typeFilters.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="mt-6">
        {activityItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              No activity yet. Changes to plantations will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activityItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-3 rounded-xl border border-slate-700/40 bg-slate-900/50 p-4"
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="mt-1 text-xs text-slate-300/70">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400/70">
                    {item.plantationName && (
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5">
                        {item.plantationName}
                      </span>
                    )}
                    <span>
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}

