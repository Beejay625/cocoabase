"use client";

import { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import type {
  Plantation,
  PlantationTask,
  RecurringTaskTemplate,
  TaskStatus,
} from "@/store/plantations";
import { cn } from "@/lib/cn";

type PlantationTaskPanelProps = {
  plantations: Plantation[];
  onTaskStatusChange: (
    plantationId: string,
    taskId: string,
    status: TaskStatus
  ) => void;
  recurringTemplates: RecurringTaskTemplate[];
  onManageRecurring: () => void;
};

type EnrichedTask = PlantationTask & {
  plantationId: string;
  plantationName: string;
  location?: string;
  isOverdue: boolean;
  dueInLabel: string;
};

const statusOrder: TaskStatus[] = ["pending", "in_progress", "completed"];

const statusMeta: Record<
  TaskStatus,
  { label: string; badgeClass: string; description: string }
> = {
  pending: {
    label: "Pending",
    badgeClass: "bg-amber-100 text-amber-700",
    description: "Ready to schedule",
  },
  in_progress: {
    label: "In Progress",
    badgeClass: "bg-leaf-100 text-leaf-700",
    description: "Currently underway",
  },
  completed: {
    label: "Completed",
    badgeClass: "bg-cocoa-900 text-cream-50",
    description: "Finished and logged",
  },
};

const formatDueDate = (dueDate: string) => {
  const date = new Date(dueDate);
  const today = new Date();
  const diff =
    Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  if (Number.isNaN(diff)) {
    return { isOverdue: false, label: "No due date" };
  }

  if (diff < 0) {
    return { isOverdue: true, label: `Overdue by ${Math.abs(diff)} days` };
  }

  if (diff === 0) {
    return { isOverdue: false, label: "Due today" };
  }

  return {
    isOverdue: false,
    label: `Due in ${diff} day${diff === 1 ? "" : "s"}`,
  };
};

const nextStatus = (current: TaskStatus): TaskStatus => {
  const index = statusOrder.indexOf(current);
  const nextIndex = (index + 1) % statusOrder.length;
  return statusOrder[nextIndex];
};

export default function PlantationTaskPanel({
  plantations,
  onTaskStatusChange,
  recurringTemplates,
  onManageRecurring,
}: PlantationTaskPanelProps) {
  const tasks = useMemo(() => {
    return plantations
      .flatMap<EnrichedTask>((plantation) => {
        return plantation.tasks.map((task) => {
          const due = formatDueDate(task.dueDate);
          return {
            ...task,
            plantationId: plantation.id,
            plantationName: plantation.seedName,
            location: plantation.location,
            isOverdue: due.isOverdue,
            dueInLabel: due.label,
          };
        });
      })
      .sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return dateA - dateB;
      });
  }, [plantations]);

  const handleCycleStatus = useCallback(
    (task: EnrichedTask) => {
      const next = nextStatus(task.status);
      onTaskStatusChange(task.plantationId, task.id, next);
    },
    [onTaskStatusChange]
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cream-200 bg-cream-50/80 p-5 shadow-sm shadow-cocoa-900/5 backdrop-blur"
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-cocoa-900">
            Plantation Tasks
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
            Scheduling & upkeep
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium text-cocoa-500 shadow-sm">
            {tasks.length} active task{tasks.length === 1 ? "" : "s"}
          </span>
          <button
            type="button"
            onClick={onManageRecurring}
            className="rounded-full border border-cocoa-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cocoa-600 transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-300 focus:ring-offset-1 focus:ring-offset-cream-50"
          >
            Manage recurring ({recurringTemplates.length})
          </button>
        </div>
      </header>

      <div className="mt-5 space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl bg-white/70 p-4 text-sm text-cocoa-500 shadow-inner">
            No tasks yet. Add maintenance checklists to keep plantations on
            schedule.
          </div>
        ) : (
          tasks.map((task) => (
            <motion.article
              key={`${task.plantationId}-${task.id}`}
              layout
              className={cn(
                "rounded-2xl border border-cream-200 bg-white/80 p-4 shadow-sm",
                task.isOverdue && "border-rose-200 bg-rose-50/60"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-cocoa-900">
                    {task.title}
                  </h3>
                  <p className="text-xs text-cocoa-500">
                    {task.plantationName}
                    {task.location ? ` • ${task.location}` : ""}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {task.templateId ? (
                    <span className="rounded-full bg-leaf-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-leaf-700">
                      Recurring
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      statusMeta[task.status].badgeClass
                    )}
                  >
                    {statusMeta[task.status].label}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-cocoa-500">
                <span
                  className={cn(
                    "font-medium",
                    task.isOverdue ? "text-rose-600" : "text-cocoa-600"
                  )}
                >
                  {task.dueInLabel}
                </span>
                <button
                  type="button"
                  onClick={() => handleCycleStatus(task)}
                  className="rounded-full border border-cocoa-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cocoa-600 transition hover:border-cocoa-300 hover:text-cocoa-800 focus:outline-none focus:ring-2 focus:ring-cocoa-400 focus:ring-offset-1 focus:ring-offset-cream-50"
                >
                  Mark {statusMeta[nextStatus(task.status)].label}
                </button>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </motion.section>
  );
}


