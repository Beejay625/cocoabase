"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import type { Plantation, PlantationTask, YieldCheckpoint } from "@/store/plantations";
import { cn } from "@/lib/cn";

type TimelinePanelProps = {
  plantations: Plantation[];
};

type TimelineEntry = {
  id: string;
  date: string;
  label: string;
  description: string;
  category: "stage" | "yield" | "task" | "collaboration";
};

const categoryStyles: Record<
  TimelineEntry["category"],
  { badge: string; accent: string }
> = {
  stage: {
    badge: "bg-leaf-100 text-leaf-800",
    accent: "bg-leaf-400",
  },
  yield: {
    badge: "bg-gold-100 text-gold-800",
    accent: "bg-gold-400",
  },
  task: {
    badge: "bg-cream-200 text-cocoa-700",
    accent: "bg-cocoa-400/80",
  },
  collaboration: {
    badge: "bg-amber-100 text-amber-800",
    accent: "bg-amber-400/80",
  },
};

const normalizeTaskEvent = (plantation: Plantation, task: PlantationTask) => {
  return {
    id: `${plantation.id}-task-${task.id}`,
    date: task.dueDate,
    label: task.title,
    description: `${plantation.seedName} • ${task.status.replace("_", " ")}`,
    category: "task" as const,
  };
};

const normalizeYieldEvent = (
  plantation: Plantation,
  checkpoint: YieldCheckpoint
) => {
  return {
    id: `${plantation.id}-yield-${checkpoint.date}`,
    date: checkpoint.date,
    label: checkpoint.event,
    description: `${plantation.seedName} • ${checkpoint.yieldKg.toLocaleString()} kg logged`,
    category: "yield" as const,
  };
};

const normalizeStageEvent = (plantation: Plantation) => ({
  id: `${plantation.id}-stage-${plantation.stage}`,
  date: plantation.updatedAt,
  label: `Stage: ${plantation.stage}`,
  description: `${plantation.seedName} • Last update recorded`,
  category: "stage" as const,
});

const normalizeCollaborationEvent = (plantation: Plantation) =>
  plantation.collaborators
    .filter((collaborator) => collaborator.lastUpdated)
    .map((collaborator) => ({
      id: `${plantation.id}-collab-${collaborator.id}`,
      date: collaborator.lastUpdated as string,
      label: `Note • ${collaborator.name}`,
      description: collaborator.lastNote
        ? `“${collaborator.lastNote}”`
        : `${collaborator.role} status update`,
      category: "collaboration" as const,
    }));

function PlantationActivityTimelineBase({ plantations }: TimelinePanelProps) {
  const entries = useMemo(() => {
    const events: TimelineEntry[] = [];

    plantations.forEach((plantation) => {
      events.push(normalizeStageEvent(plantation));

      plantation.yieldTimeline.forEach((checkpoint) => {
        events.push(normalizeYieldEvent(plantation, checkpoint));
      });

      plantation.tasks
        .filter((task) => task.status !== "completed")
        .forEach((task) => {
          events.push(normalizeTaskEvent(plantation, task));
        });

      normalizeCollaborationEvent(plantation).forEach((event) => {
        events.push(event);
      });
    });

    return events
      .filter((event) => event.date)
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 12);
  }, [plantations]);

  if (!entries.length) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-3xl border border-cream-200 bg-white/80 p-6 shadow-sm shadow-cocoa-900/5 backdrop-blur"
    >
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-cocoa-900">
            Activity Timeline
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-cocoa-500">
            Fresh updates across your network
          </p>
        </div>
        <span className="text-xs text-cocoa-500">
          Showing last {entries.length} signals
        </span>
      </header>

      <ol className="mt-6 space-y-4">
        {entries.map((entry) => {
          const style = categoryStyles[entry.category];
          return (
            <li
              key={entry.id}
              className="flex gap-4 rounded-2xl border border-cream-200 bg-cream-50/80 p-4 text-sm text-cocoa-700 shadow-inner shadow-cocoa-900/5"
            >
              <div
                className={cn(
                  "mt-1 h-10 w-1 rounded-full",
                  style?.accent ?? "bg-cocoa-300"
                )}
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-cocoa-900">
                    {entry.label}
                  </span>
                  <span className="text-xs text-cocoa-500">
                    {format(new Date(entry.date), "MMM d, HH:mm")} •{" "}
                    {formatDistanceToNow(new Date(entry.date), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="mt-2 text-sm text-cocoa-700">
                  {entry.description}
                </p>
                <span
                  className={cn(
                    "mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                    style?.badge ?? "bg-cream-200 text-cocoa-600"
                  )}
                >
                  {entry.category}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </motion.section>
  );
}

const PlantationActivityTimeline = memo(PlantationActivityTimelineBase);

export default PlantationActivityTimeline;


