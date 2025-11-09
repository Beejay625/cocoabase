"use client";

import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type {
  Plantation,
  PlantationCollaborator,
  TaskStatus,
} from "@/store/plantations";

type TaskKanbanBoardProps = {
  plantations: Plantation[];
  onStatusChange: (
    plantationId: string,
    taskId: string,
    status: TaskStatus
  ) => void;
  onAssign: (
    plantationId: string,
    taskId: string,
    assigneeId?: string
  ) => void;
};

type GroupingMode = "none" | "stage" | "assignee";

type KanbanTask = {
  id: string;
  plantationId: string;
  plantationName: string;
  plantationStage: Plantation["stage"];
  status: TaskStatus;
  title: string;
  dueDate: string;
  templateId?: string;
  assigneeId?: string;
  assigneeName?: string;
  notes?: string;
  attachments: string[];
  collaborators: PlantationCollaborator[];
};

type KanbanLane = {
  key: string;
  label: string;
  tasks: KanbanTask[];
};

const statusColumns: Array<{
  key: TaskStatus;
  label: string;
  accent: string;
  description: string;
}> = [
  {
    key: "pending",
    label: "Backlog",
    accent: "border-slate-700/40 bg-slate-900/60",
    description: "Queued tasks",
  },
  {
    key: "in_progress",
    label: "In progress",
    accent: "border-sky-500/30 bg-sky-500/10",
    description: "Active work",
  },
  {
    key: "completed",
    label: "Completed",
    accent: "border-emerald-500/30 bg-emerald-500/10",
    description: "Ready for review",
  },
];

const groupingOptions: Array<{
  key: GroupingMode;
  label: string;
  description: string;
}> = [
  { key: "none", label: "Unified", description: "Single swimlane" },
  {
    key: "stage",
    label: "By stage",
    description: "Swimlanes per plantation stage",
  },
  {
    key: "assignee",
    label: "By assignee",
    description: "Swimlanes per collaborator",
  },
];

const formatDueLabel = (dueDate: string) => {
  const due = new Date(dueDate);
  if (Number.isNaN(due.getTime())) {
    return { label: "No due date", tone: "text-slate-400/80" };
  }

  const now = new Date();
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      label: `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? "" : "s"} overdue`,
      tone: "text-rose-300",
    };
  }

  if (diffDays === 0) {
    return { label: "Due today", tone: "text-amber-300" };
  }

  if (diffDays === 1) {
    return { label: "Due tomorrow", tone: "text-sky-300" };
  }

  return {
    label: `Due in ${diffDays} days`,
    tone: "text-slate-300/80",
  };
};

const getAssigneeLabel = (
  assigneeId: string | undefined,
  collaboratorIndex: Map<string, PlantationCollaborator>
) => {
  if (!assigneeId) {
    return "Unassigned";
  }
  const collaborator = collaboratorIndex.get(assigneeId);
  return collaborator ? collaborator.name : "Unassigned";
};

export default function TaskKanbanBoard({
  plantations,
  onStatusChange,
  onAssign,
}: TaskKanbanBoardProps) {
  const [grouping, setGrouping] = useState<GroupingMode>("stage");

  const { tasks, taskLookup, collaboratorIndex } = useMemo(() => {
    const collaboratorIndex = new Map<string, PlantationCollaborator>();
    const tasks: KanbanTask[] = plantations.flatMap((plantation) => {
      plantation.collaborators.forEach((collaborator) =>
        collaboratorIndex.set(collaborator.id, collaborator)
      );

      return plantation.tasks.map((task) => ({
        id: task.id,
        plantationId: plantation.id,
        plantationName: plantation.seedName,
        plantationStage: plantation.stage,
        status: task.status,
        title: task.title,
        dueDate: task.dueDate,
        templateId: task.templateId,
        assigneeId: task.assigneeId,
        assigneeName: getAssigneeLabel(task.assigneeId, collaboratorIndex),
        notes: task.notes,
        attachments: task.attachments ?? [],
        collaborators: plantation.collaborators,
      }));
    });

    const taskLookup = new Map<string, KanbanTask>();
    tasks.forEach((task) =>
      taskLookup.set(`${task.plantationId}:${task.id}`, task)
    );

    return { tasks, taskLookup, collaboratorIndex };
  }, [plantations]);

  const lanes: KanbanLane[] = useMemo(() => {
    if (!tasks.length) {
      return [];
    }

    if (grouping === "none") {
      return [
        {
          key: "all",
          label: "All tasks",
          tasks,
        },
      ];
    }

    if (grouping === "stage") {
      const stageOrder: Array<Plantation["stage"]> = [
        "planted",
        "growing",
        "harvested",
      ];

      return stageOrder.map((stage) => ({
        key: stage,
        label:
          stage === "planted"
            ? "Stage: Planted"
            : stage === "growing"
            ? "Stage: Growing"
            : "Stage: Harvested",
        tasks: tasks.filter((task) => task.plantationStage === stage),
      }));
    }

    // grouping === "assignee"
    const groups = new Map<string, KanbanTask[]>();
    tasks.forEach((task) => {
      const key = task.assigneeId ?? "unassigned";
      const lane = groups.get(key) ?? [];
      lane.push(task);
      groups.set(key, lane);
    });

    return Array.from(groups.entries())
      .map(([key, laneTasks]) => {
        const collaborator =
          key === "unassigned" ? undefined : collaboratorIndex.get(key);
        const label = collaborator
          ? `Assignee: ${collaborator.name}`
          : "Assignee: Unassigned";
        return { key, label, tasks: laneTasks };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [tasks, grouping, collaboratorIndex]);

  const getLaneForTask = useCallback(
    (task: KanbanTask): string => {
      if (grouping === "assignee") {
        return task.assigneeId ?? "unassigned";
      }
      if (grouping === "stage") {
        return task.plantationStage;
      }
      return "all";
    },
    [grouping]
  );

  const handleDrop = useCallback(
    (
      event: React.DragEvent<HTMLDivElement>,
      laneKey: string,
      status: TaskStatus
    ) => {
      event.preventDefault();
      const payload = event.dataTransfer.getData("application/json");
      if (!payload) {
        return;
      }
      try {
        const { plantationId, taskId } = JSON.parse(payload) as {
          plantationId: string;
          taskId: string;
        };
        const task = taskLookup.get(`${plantationId}:${taskId}`);
        if (!task) {
          return;
        }

        if (task.status !== status) {
          onStatusChange(plantationId, taskId, status);
        }

        if (grouping === "assignee") {
          const targetAssigneeId =
            laneKey === "unassigned" ? undefined : laneKey;
          if (task.assigneeId !== targetAssigneeId) {
            onAssign(plantationId, taskId, targetAssigneeId);
          }
        }
      } catch (error) {
        console.error("[kanban] failed to parse drag payload", error);
      }
    },
    [taskLookup, onStatusChange, onAssign, grouping]
  );

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, task: KanbanTask) => {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData(
        "application/json",
        JSON.stringify({ plantationId: task.plantationId, taskId: task.id })
      );
    },
    []
  );

  if (!tasks.length) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl border border-cocoa-800/50 bg-cocoa-950/40 p-6 text-slate-200 shadow-lg shadow-black/20 backdrop-blur"
      >
        <h2 className="text-lg font-semibold text-white">
          Task Kanban board
        </h2>
        <p className="mt-2 text-sm text-slate-300/80">
          No tasks available yet. Add tasks to plantations to populate the board.
        </p>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#101f3c]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Task Kanban board
          </h2>
          <p className="text-sm text-slate-300/80">
            Drag cards between status columns, or reassign them across
            swimlanes. Use quick actions to advance work.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 rounded-full border border-slate-700/40 bg-slate-900/60 px-2 py-1">
          {groupingOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setGrouping(option.key)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                grouping === option.key
                  ? "bg-leaf-500 text-slate-900"
                  : "text-slate-200/80 hover:text-white"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      <div className="mt-6 space-y-10">
        {lanes.map((lane) => (
          <section key={lane.key} className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300/70">
                {lane.label}
              </h3>
              <span className="text-xs text-slate-400/80">
                {lane.tasks.length} task{lane.tasks.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {statusColumns.map((column) => (
                <div
                  key={column.key}
                  className={cn(
                    "flex min-h-[220px] flex-col rounded-2xl border p-4",
                    column.accent
                  )}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) =>
                    handleDrop(event, lane.key, column.key)
                  }
                >
                  <header className="mb-3 flex flex-col gap-1">
                    <h4 className="text-sm font-semibold text-slate-100">
                      {column.label}
                    </h4>
                    <span className="text-xs text-slate-400/80">
                      {column.description}
                    </span>
                  </header>

                  <div className="space-y-3">
                    {lane.tasks
                      .filter((task) => task.status === column.key)
                      .map((task) => {
                        const due = formatDueLabel(task.dueDate);
                        const assigneeLabel =
                          task.assigneeName ?? "Unassigned";
                        return (
                          <div
                            key={`${task.plantationId}:${task.id}`}
                            draggable
                            onDragStart={(event) =>
                              handleDragStart(event, task)
                            }
                            className="cursor-grab rounded-2xl border border-slate-700/40 bg-slate-900/70 p-3 text-slate-100 shadow-sm shadow-black/20 transition hover:border-slate-500/60 active:cursor-grabbing"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-white">
                                  {task.title}
                                </p>
                                <p className="text-xs text-slate-300/70">
                                  {task.plantationName} •{" "}
                                  <span className="capitalize">
                                    {task.plantationStage}
                                  </span>
                                </p>
                              </div>
                              <span className={cn("text-xs font-semibold", due.tone)}>
                                {due.label}
                              </span>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300/70">
                              <span className="rounded-full bg-slate-800/80 px-2 py-0.5">
                                {assigneeLabel}
                              </span>
                              {task.templateId && (
                                <span className="rounded-full bg-slate-800/80 px-2 py-0.5">
                                  Recurring
                                </span>
                              )}
                            </div>

                            <div className="mt-3 flex flex-col gap-2">
                              <label className="text-[11px] uppercase tracking-[0.25em] text-slate-400/70">
                                Assign
                                <select
                                  className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-900/80 px-2 py-1 text-xs text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
                                  value={task.assigneeId ?? ""}
                                  onMouseDown={(event) =>
                                    event.stopPropagation()
                                  }
                                  onChange={(event) =>
                                    onAssign(
                                      task.plantationId,
                                      task.id,
                                      event.target.value || undefined
                                    )
                                  }
                                >
                                  <option value="">Unassigned</option>
                                  {task.collaborators.map((collaborator) => (
                                    <option
                                      key={collaborator.id}
                                      value={collaborator.id}
                                    >
                                      {collaborator.name}
                                    </option>
                                  ))}
                                </select>
                              </label>

                              <div className="flex flex-wrap gap-2">
                                {task.status !== "pending" && (
                                  <button
                                    type="button"
                                    className="rounded-full border border-slate-600/40 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-200/90 hover:border-slate-400/60 hover:text-white"
                                    onClick={() =>
                                      onStatusChange(
                                        task.plantationId,
                                        task.id,
                                        "pending"
                                      )
                                    }
                                  >
                                    Reset
                                  </button>
                                )}
                                {task.status !== "in_progress" && (
                                  <button
                                    type="button"
                                    className="rounded-full border border-sky-500/40 bg-sky-600/20 px-3 py-1 text-xs font-semibold text-sky-100 hover:border-sky-400/60 hover:text-white"
                                    onClick={() =>
                                      onStatusChange(
                                        task.plantationId,
                                        task.id,
                                        "in_progress"
                                      )
                                    }
                                  >
                                    Start
                                  </button>
                                )}
                                {task.status !== "completed" && (
                                  <button
                                    type="button"
                                    className="rounded-full border border-emerald-500/40 bg-emerald-600/20 px-3 py-1 text-xs font-semibold text-emerald-100 hover:border-emerald-400/60 hover:text-white"
                                    onClick={() =>
                                      onStatusChange(
                                        task.plantationId,
                                        task.id,
                                        "completed"
                                      )
                                    }
                                  >
                                    Complete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {lane.tasks.filter((task) => task.status === column.key)
                      .length === 0 && (
                      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-700/40 bg-slate-900/30 p-3 text-center text-xs text-slate-500/70">
                        Drag tasks here
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </motion.section>
  );
}


