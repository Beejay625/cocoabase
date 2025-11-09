import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";
import plantationsSeedData from "@/data/plantations.json";
import stageTaskTemplatesSeedData from "@/data/stage-task-templates.json";

export type GrowthStage = "planted" | "growing" | "harvested";

export type TaskStatus = "pending" | "in_progress" | "completed";

export type PlantationTask = {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
  templateId?: string;
  assigneeId?: string;
  notes?: string;
  attachments?: string[];
};

export type PlantationCoordinates = {
  latitude: number;
  longitude: number;
};

export type YieldCheckpoint = {
  id: string;
  date: string;
  event: string;
  yieldKg: number;
  notes?: string;
  photos: string[];
};

export type PlantationCollaborator = {
  id: string;
  name: string;
  role: string;
  contact?: string;
  avatarUrl?: string;
  lastNote?: string;
  lastUpdated?: string;
};

export type RecurringFrequency = "daily" | "weekly" | "monthly";

export type RecurringTaskTemplate = {
  id: string;
  plantationId: string;
  title: string;
  description?: string;
  frequency: RecurringFrequency;
  interval: number;
  leadTimeDays: number;
  nextRunDate: string;
  lastGeneratedAt?: string;
  createdAt: string;
  enabled: boolean;
};

export type RecurringTaskTemplateDraft = Omit<
  RecurringTaskTemplate,
  "id" | "createdAt" | "lastGeneratedAt"
> & {
  id?: string;
};

export type StageTaskTemplate = {
  id: string;
  stage: GrowthStage;
  title: string;
  description?: string;
  dueOffsetDays: number;
  assigneeRole?: string;
  attachments: string[];
  createdAt: string;
  updatedAt?: string;
  enabled: boolean;
};

export type StageTaskTemplateDraft = Omit<
  StageTaskTemplate,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
};

export type StageGateRule = {
  id: string;
  targetStage: GrowthStage;
  requiredTasksCompleted?: number;
  requiredTaskTemplates?: string[];
  minimumDaysInCurrentStage?: number;
  minimumYieldCheckpoints?: number;
  requireCoordinates?: boolean;
  requireCollaborators?: number;
  enabled: boolean;
  createdAt: string;
  updatedAt?: string;
};

export type StageGateRuleDraft = Omit<
  StageGateRule,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
};

export type StageGateValidationResult = {
  canProceed: boolean;
  blockingReasons: string[];
  warnings: string[];
};

export type Plantation = {
  id: string;
  seedName: string;
  location?: string;
  stage: GrowthStage;
  startDate: string;
  updatedAt: string;
  walletAddress: string;
  notes?: string;
  treeCount: number;
  areaHectares: number;
  carbonOffsetTons: number;
  coordinates?: PlantationCoordinates;
  yieldTimeline: YieldCheckpoint[];
  collaborators: PlantationCollaborator[];
  tasks: PlantationTask[];
};

export type PlantationDraft = Omit<
  Plantation,
  "id" | "stage" | "updatedAt" | "tasks" | "yieldTimeline" | "collaborators"
> & {
  stage?: GrowthStage;
  tasks?: (PlantationTask | Omit<PlantationTask, "id">)[];
  yieldTimeline?: YieldCheckpoint[];
  collaborators?: Omit<PlantationCollaborator, "id">[];
  coordinates?: PlantationCoordinates;
};

type PlantationState = {
  plantations: Plantation[];
  recurringTemplates: RecurringTaskTemplate[];
  stageTemplates: StageTaskTemplate[];
  gateRules: StageGateRule[];
  validateStageTransition: (
    plantation: Plantation,
    targetStage: GrowthStage
  ) => StageGateValidationResult;
  addGateRule: (rule: StageGateRuleDraft) => StageGateRule;
  updateGateRule: (id: string, updates: Partial<StageGateRuleDraft>) => void;
  removeGateRule: (id: string) => void;
  addPlantation: (payload: PlantationDraft) => Plantation;
  updateStage: (id: string, nextStage: GrowthStage, note?: string) => void;
  updateStages: (
    ids: string[],
    nextStage: GrowthStage,
    note?: string
  ) => void;
  getPlantationsByWallet: (walletAddress: string | undefined) => Plantation[];
  addTask: (plantationId: string, task: Omit<PlantationTask, "id">) => void;
  updateTaskStatus: (
    plantationId: string,
    taskId: string,
    status: TaskStatus
  ) => void;
  setTaskAssignee: (
    plantationId: string,
    taskId: string,
    assigneeId?: string
  ) => void;
  addCollaborator: (
    plantationId: string,
    collaborator: Omit<PlantationCollaborator, "id">
  ) => void;
  addYieldCheckpoint: (
    plantationId: string,
    checkpoint: YieldCheckpointDraft
  ) => YieldCheckpoint;
  updateYieldCheckpoint: (
    plantationId: string,
    checkpointId: string,
    updates: Partial<Pick<YieldCheckpoint, "event" | "date" | "yieldKg" | "notes" | "photos">>
  ) => void;
  addYieldCheckpointPhoto: (
    plantationId: string,
    checkpointId: string,
    photoUrl: string
  ) => void;
  recordCollaboratorNote: (
    plantationId: string,
    collaboratorId: string,
    note: string
  ) => void;
  setCoordinates: (
    plantationId: string,
    coordinates: PlantationCoordinates
  ) => void;
  addRecurringTemplate: (
    template: RecurringTaskTemplateDraft
  ) => RecurringTaskTemplate;
  updateRecurringTemplate: (
    id: string,
    updates: Partial<RecurringTaskTemplateDraft>
  ) => void;
  removeRecurringTemplate: (id: string) => void;
  processRecurringTemplates: (currentDate?: string | Date) => void;
  addStageTaskTemplate: (
    template: StageTaskTemplateDraft
  ) => StageTaskTemplate;
  updateStageTaskTemplate: (
    id: string,
    updates: Partial<StageTaskTemplateDraft>
  ) => void;
  removeStageTaskTemplate: (id: string) => void;
  addTaskAttachment: (
    plantationId: string,
    taskId: string,
    attachmentUrl: string
  ) => void;
  resetToSeedData: () => void;
};

export type PlantationEvent =
  | {
      type: "stage_change";
      plantation: Plantation;
      previousStage: GrowthStage;
      nextStage: GrowthStage;
      timestamp: string;
      note?: string;
    }
  | {
      type: "task_added";
      plantation: Plantation;
      task: PlantationTask;
      timestamp: string;
    }
  | {
    type: "task_status_change";
    plantation: Plantation;
    task: PlantationTask;
    previousStatus: TaskStatus;
    nextStatus: TaskStatus;
    timestamp: string;
  }
  | {
      type: "yield_checkpoint_added";
      plantation: Plantation;
      checkpoint: YieldCheckpoint;
      timestamp: string;
    }
  | {
      type: "collaborator_added";
      plantation: Plantation;
      collaborator: PlantationCollaborator;
      timestamp: string;
    }
  | {
      type: "collaborator_note_logged";
      plantation: Plantation;
      collaborator: PlantationCollaborator;
      note: string;
      timestamp: string;
    }
  | {
      type: "coordinates_updated";
      plantation: Plantation;
      coordinates: PlantationCoordinates;
      timestamp: string;
    };

export type PlantationEventListener = (event: PlantationEvent) => void;

const plantationEventListeners = new Set<PlantationEventListener>();

export const subscribeToPlantationEvents = (
  listener: PlantationEventListener
) => {
  plantationEventListeners.add(listener);
  return () => {
    plantationEventListeners.delete(listener);
  };
};

const emitPlantationEvent = (event: PlantationEvent) => {
  plantationEventListeners.forEach((listener) => {
    try {
      listener(event);
    } catch (error) {
      console.error("[plantations] event listener error", error);
    }
  });
};

const stageOrder: GrowthStage[] = ["planted", "growing", "harvested"];

const generateCollaboratorId = () =>
  `collab-${Math.random().toString(36).slice(2, 9)}`;

const generateRecurringTemplateId = () =>
  `recur-${Math.random().toString(36).slice(2, 9)}`;

const generateStageTemplateId = () =>
  `stage-${Math.random().toString(36).slice(2, 9)}`;

const generateYieldCheckpointId = () =>
  `yield-${Math.random().toString(36).slice(2, 9)}`;

const clampInterval = (interval?: number) => Math.max(1, interval ?? 1);

const addIntervalToDate = (
  date: Date,
  frequency: RecurringFrequency,
  interval: number
): Date => {
  const next = new Date(date);
  switch (frequency) {
    case "daily":
      next.setDate(next.getDate() + interval);
      break;
    case "weekly":
      next.setDate(next.getDate() + interval * 7);
      break;
    case "monthly":
      next.setMonth(next.getMonth() + interval);
      break;
    default:
      next.setDate(next.getDate() + interval);
  }
  return next;
};

const assignCollaboratorByRole = (
  collaborators: PlantationCollaborator[],
  role?: string
) => {
  if (!role) {
    return undefined;
  }
  const normalizedRole = role.trim().toLowerCase();
  return collaborators.find(
    (collaborator) =>
      collaborator.role?.trim().toLowerCase() === normalizedRole
  );
};

const generateStageTemplateTasks = (
  plantation: Plantation,
  targetStage: GrowthStage,
  stageTemplates: StageTaskTemplate[]
): { tasks: PlantationTask[]; created: PlantationTask[] } => {
  if (!stageTemplates.length) {
    return { tasks: plantation.tasks, created: [] };
  }

  const relevant = stageTemplates.filter(
    (template) => template.stage === targetStage && template.enabled
  );

  if (!relevant.length) {
    return { tasks: plantation.tasks, created: [] };
  }

  const created: PlantationTask[] = [];
  const nextTasks = [...plantation.tasks];

  relevant.forEach((template) => {
    const templateKey = `stage:${template.id}`;
    const hasActiveTask = nextTasks.some(
      (task) => task.templateId === templateKey && task.status !== "completed"
    );

    if (hasActiveTask) {
      return;
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + template.dueOffsetDays);
    const assignee = assignCollaboratorByRole(
      plantation.collaborators,
      template.assigneeRole
    );

    const task: PlantationTask = {
      id: generateTaskId(),
      title: template.title,
      dueDate: dueDate.toISOString(),
      status: "pending",
      templateId: templateKey,
      assigneeId: assignee?.id,
      notes: template.description,
      attachments: template.attachments ? [...template.attachments] : [],
    };

    created.push(task);
    nextTasks.push(task);
  });

  return { tasks: nextTasks, created };
};

type SeedCollaborator = Omit<PlantationCollaborator, "id"> & { id?: string };
type SeedPlantation = Omit<
  Plantation,
  "yieldTimeline" | "collaborators" | "tasks"
> & {
  yieldTimeline?: YieldCheckpoint[];
  collaborators?: SeedCollaborator[];
  tasks?: PlantationTask[];
};

type SeedStageTemplate = Omit<StageTaskTemplate, "createdAt"> & {
  createdAt?: string;
};

const normalizeCollaborator = (
  collaborator: SeedCollaborator,
  fallbackTimestamp: string
): PlantationCollaborator => {
  const timestamp = collaborator.lastUpdated ?? fallbackTimestamp;
  return {
    ...collaborator,
    id: collaborator.id ?? generateCollaboratorId(),
    lastUpdated: timestamp,
  };
};

const normalizePlantation = (plantation: SeedPlantation): Plantation => {
  const updatedAt = plantation.updatedAt ?? new Date().toISOString();
  return {
    ...plantation,
    updatedAt,
    yieldTimeline: Array.isArray(plantation.yieldTimeline)
      ? plantation.yieldTimeline.map((checkpoint) =>
          normalizeYieldCheckpoint(checkpoint)
        )
      : [],
    collaborators: Array.isArray(plantation.collaborators)
      ? plantation.collaborators.map((collaborator) =>
          normalizeCollaborator(collaborator, updatedAt)
        )
      : [],
    tasks: Array.isArray(plantation.tasks)
      ? plantation.tasks.map((task) => normalizeTask(task))
      : [],
  };
};

const clampDueOffset = (offset?: number) => Math.max(0, offset ?? 0);

const normalizeStageTemplate = (
  template: SeedStageTemplate
): StageTaskTemplate => {
  const nowIso = new Date().toISOString();
  return {
    ...template,
    id: template.id ?? generateStageTemplateId(),
    dueOffsetDays: clampDueOffset(template.dueOffsetDays),
    enabled: template.enabled ?? true,
    attachments: Array.isArray(template.attachments)
      ? template.attachments
      : [],
    createdAt: template.createdAt ?? nowIso,
    updatedAt: template.updatedAt,
  };
};

const seedData: Plantation[] = (
  plantationsSeedData as unknown as SeedPlantation[]
).map(normalizePlantation);

const stageTemplateSeed: StageTaskTemplate[] = (
  stageTaskTemplatesSeedData as unknown as SeedStageTemplate[]
).map(normalizeStageTemplate);

const generateId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `seed-${Date.now()}`;
};

const generateTaskId = () => `task-${Math.random().toString(36).slice(2, 9)}`;

const normalizeTask = (
  task: PlantationTask | Omit<PlantationTask, "id">
): PlantationTask => ({
  id: "id" in task ? task.id : generateTaskId(),
  status: task.status ?? "pending",
  title: task.title,
  dueDate: task.dueDate,
  templateId: "templateId" in task ? task.templateId : undefined,
  assigneeId: "assigneeId" in task ? task.assigneeId : undefined,
  notes: "notes" in task ? task.notes : undefined,
  attachments: Array.isArray(task.attachments) ? task.attachments : [],
});

const normalizeYieldCheckpoint = (
  checkpoint: YieldCheckpoint | YieldCheckpointDraft
): YieldCheckpoint => ({
  id: "id" in checkpoint && checkpoint.id
    ? checkpoint.id
    : generateYieldCheckpointId(),
  date: checkpoint.date ?? new Date().toISOString(),
  event: checkpoint.event,
  yieldKg: Number.isFinite(checkpoint.yieldKg)
    ? Number(checkpoint.yieldKg)
    : 0,
  notes: "notes" in checkpoint ? checkpoint.notes : undefined,
  photos:
    "photos" in checkpoint && Array.isArray(checkpoint.photos)
      ? checkpoint.photos
      : [],
});

const buildPersistOptions = (): PersistOptions<PlantationState> => {
  const options: PersistOptions<PlantationState> = {
    name: "cocoa-chain-plantations",
    version: 4,
    skipHydration: true,
    onRehydrateStorage: () => (state) => {
      if (!state) {
        return;
      }

      if (!state.plantations.length) {
        state.plantations = seedData;
      }

      if (!state.recurringTemplates) {
        state.recurringTemplates = [];
      }

      if (!state.stageTemplates) {
        state.stageTemplates = stageTemplateSeed;
      }
    },
  };

  if (typeof window !== "undefined") {
    options.storage = createJSONStorage(() => window.localStorage);
    options.skipHydration = false;
  }

  return options;
};

export const usePlantationsStore = create<PlantationState>()(
  persist(
    (set, get) => ({
      plantations: seedData,
      recurringTemplates: [],
      stageTemplates: stageTemplateSeed,
      addPlantation: (payload) => {
        const now = new Date().toISOString();
        const {
          stage: draftStage,
          tasks: draftTasks,
          collaborators: draftCollaborators,
          yieldTimeline: draftTimeline,
          ...rest
        } = payload;

        const collaborators =
          draftCollaborators?.map((collaborator) =>
            normalizeCollaborator(collaborator, now)
          ) ?? [];

        const plantation: Plantation = {
          id: generateId(),
          stage: draftStage ?? "planted",
          updatedAt: now,
          tasks: draftTasks?.map((task) => normalizeTask(task)) ?? [],
          yieldTimeline: draftTimeline ?? [],
          collaborators,
          ...rest,
        };

        set((state) => ({
          plantations: [plantation, ...state.plantations],
        }));

        return plantation;
      },
      updateStage: (id, nextStage, note) => {
        if (!stageOrder.includes(nextStage)) {
          return;
        }

        const previous = get().plantations.find(
          (plantation) => plantation.id === id
        );

        if (!previous) {
          return;
        }

        if (previous.stage === nextStage) {
          return;
        }

        const now = new Date().toISOString();
        const stageTemplates = get().stageTemplates;
        const newStageTaskRefs: Array<{
          plantationId: string;
          task: PlantationTask;
        }> = [];

        set((state) => ({
          plantations: state.plantations.map((plantation) =>
            plantation.id === id
              ? {
                  ...plantation,
                  stage: nextStage,
                  updatedAt: now,
                  notes: note ?? plantation.notes,
                  ...(() => {
                    const { tasks, created } = generateStageTemplateTasks(
                      { ...plantation, stage: nextStage },
                      nextStage,
                      stageTemplates
                    );
                    created.forEach((task) =>
                      newStageTaskRefs.push({
                        plantationId: plantation.id,
                        task,
                      })
                    );
                    return { tasks };
                  })(),
                }
              : plantation
          ),
        }));

        const updated = get().plantations.find(
          (plantation) => plantation.id === id
        );

        if (updated) {
          emitPlantationEvent({
            type: "stage_change",
            plantation: updated,
            previousStage: previous.stage,
            nextStage,
            timestamp: now,
            note,
          });
        }

        if (newStageTaskRefs.length) {
          const latest = get();
          newStageTaskRefs.forEach(({ plantationId, task }) => {
            const plantation = latest.plantations.find(
              (item) => item.id === plantationId
            );
            const currentTask = plantation?.tasks.find(
              (item) => item.id === task.id
            );
            if (plantation && currentTask) {
              emitPlantationEvent({
                type: "task_added",
                plantation,
                task: currentTask,
                timestamp: now,
              });
            }
          });
        }
      },
      updateStages: (ids, nextStage, note) => {
        if (!stageOrder.includes(nextStage) || !ids.length) {
          return;
        }

        const setOfIds = new Set(ids);
        const previousMap = new Map<string, Plantation>();

        get().plantations.forEach((plantation) => {
          if (setOfIds.has(plantation.id)) {
            previousMap.set(plantation.id, plantation);
          }
        });

        if (!previousMap.size) {
          return;
        }

        const nowIso = new Date().toISOString();
        const stageTemplates = get().stageTemplates;
        const newStageTaskRefs: Array<{
          plantationId: string;
          task: PlantationTask;
        }> = [];

        set((state) => ({
          plantations: state.plantations.map((plantation) => {
            if (!setOfIds.has(plantation.id)) {
              return plantation;
            }

            if (plantation.stage === nextStage) {
              return plantation;
            }

            const { tasks, created } = generateStageTemplateTasks(
              { ...plantation, stage: nextStage },
              nextStage,
              stageTemplates
            );
            created.forEach((task) =>
              newStageTaskRefs.push({
                plantationId: plantation.id,
                task,
              })
            );

            return {
              ...plantation,
              stage: nextStage,
              updatedAt: nowIso,
              notes: note ?? plantation.notes,
              tasks,
            };
          }),
        }));

        const latestState = get();
        latestState.plantations.forEach((plantation) => {
          if (!setOfIds.has(plantation.id)) {
            return;
          }
          const previous = previousMap.get(plantation.id);
          if (previous && previous.stage !== plantation.stage) {
            emitPlantationEvent({
              type: "stage_change",
              plantation,
              previousStage: previous.stage,
              nextStage: plantation.stage,
              timestamp: nowIso,
              note,
            });
          }
        });

        if (newStageTaskRefs.length) {
          const latest = get();
          newStageTaskRefs.forEach(({ plantationId, task }) => {
            const plantation = latest.plantations.find(
              (item) => item.id === plantationId
            );
            const currentTask = plantation?.tasks.find(
              (item) => item.id === task.id
            );
            if (plantation && currentTask) {
              emitPlantationEvent({
                type: "task_added",
                plantation,
                task: currentTask,
                timestamp: nowIso,
              });
            }
          });
        }
      },
      getPlantationsByWallet: (walletAddress) => {
        if (!walletAddress) {
          return [];
        }

        const normalized = walletAddress.toLowerCase();

        return get().plantations.filter(
          (plantation) =>
            plantation.walletAddress.toLowerCase() === normalized
        );
      },
      addTask: (plantationId, task) => {
        const now = new Date().toISOString();
        const taskId = generateTaskId();
        const normalizedTask: PlantationTask = {
          id: taskId,
          status: "pending",
          ...task,
        };

        set((state) => ({
          plantations: state.plantations.map((plantation) =>
            plantation.id === plantationId
              ? {
                  ...plantation,
                  updatedAt: now,
                  tasks: [
                    normalizedTask,
                    ...plantation.tasks,
                  ],
                }
              : plantation
          ),
        }));

        const updated = get().plantations.find(
          (plantation) => plantation.id === plantationId
        );
        const createdTask = updated?.tasks.find(
          (taskItem) => taskItem.id === taskId
        );

        if (updated && createdTask) {
          emitPlantationEvent({
            type: "task_added",
            plantation: updated,
            task: createdTask,
            timestamp: now,
          });
        }
      },
      updateTaskStatus: (plantationId, taskId, status) => {
        if (!["pending", "in_progress", "completed"].includes(status)) {
          return;
        }

        const targetPlantation = get().plantations.find(
          (plantation) => plantation.id === plantationId
        );
        const targetTask = targetPlantation?.tasks.find(
          (taskItem) => taskItem.id === taskId
        );

        if (!targetPlantation || !targetTask) {
          return;
        }

        if (targetTask.status === status) {
          return;
        }

        set((state) => ({
          plantations: state.plantations.map((plantation) =>
            plantation.id === plantationId
              ? {
                  ...plantation,
                  updatedAt: new Date().toISOString(),
                  tasks: plantation.tasks.map((taskItem) =>
                    taskItem.id === taskId
                      ? {
                          ...taskItem,
                          status,
                        }
                      : taskItem
                  ),
                }
              : plantation
          ),
        }));

        const updated = get().plantations.find(
          (plantation) => plantation.id === plantationId
        );
        const updatedTask = updated?.tasks.find(
          (taskItem) => taskItem.id === taskId
        );

        if (updated && updatedTask) {
          emitPlantationEvent({
            type: "task_status_change",
            plantation: updated,
            task: updatedTask,
            previousStatus: targetTask.status,
            nextStatus: status,
            timestamp: new Date().toISOString(),
          });
        }
      },
      setTaskAssignee: (plantationId, taskId, assigneeId) => {
        const now = new Date().toISOString();
        set((state) => ({
          plantations: state.plantations.map((plantation) =>
            plantation.id === plantationId
              ? {
                  ...plantation,
                  updatedAt: now,
                  tasks: plantation.tasks.map((taskItem) =>
                    taskItem.id === taskId
                      ? {
                          ...taskItem,
                          assigneeId,
                        }
                      : taskItem
                  ),
                }
              : plantation
          ),
        }));
      },
      addCollaborator: (plantationId, collaborator) => {
        const timestamp = new Date().toISOString();
        const normalized = normalizeCollaborator(collaborator, timestamp);

        set((state) => ({
          plantations: state.plantations.map((plantation) =>
            plantation.id === plantationId
              ? {
                  ...plantation,
                  updatedAt: timestamp,
                  collaborators: [normalized, ...plantation.collaborators],
                }
              : plantation
          ),
        }));

        const updated = get().plantations.find(
          (plantation) => plantation.id === plantationId
        );

        if (updated) {
          emitPlantationEvent({
            type: "collaborator_added",
            plantation: updated,
            collaborator: normalized,
            timestamp,
          });
        }
      },
      addYieldCheckpoint: (plantationId, checkpointDraft) => {
        const timestamp = new Date().toISOString();
        const checkpoint = normalizeYieldCheckpoint(checkpointDraft);
        set((state) => ({
          plantations: state.plantations.map((plantation) =>
            plantation.id === plantationId
              ? {
                  ...plantation,
                  updatedAt: timestamp,
                  yieldTimeline: [...plantation.yieldTimeline, checkpoint].sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  ),
                }
              : plantation
          ),
        }));

        const updated = get().plantations.find(
          (plantation) => plantation.id === plantationId
        );
        const created = updated?.yieldTimeline.find(
          (entry) => entry.id === checkpoint.id
        );

        if (updated && created) {
          emitPlantationEvent({
            type: "yield_checkpoint_added",
            plantation: updated,
            checkpoint: created,
            timestamp,
          });
        }

        return checkpoint;
      },
      updateYieldCheckpoint: (plantationId, checkpointId, updates) => {
        const timestamp = new Date().toISOString();
        set((state) => ({
          plantations: state.plantations.map((plantation) => {
            if (plantation.id !== plantationId) {
              return plantation;
            }
            const updatedTimeline = plantation.yieldTimeline
              .map((checkpoint) =>
                checkpoint.id === checkpointId
                  ? {
                      ...checkpoint,
                      event: updates.event ?? checkpoint.event,
                      date: updates.date ?? checkpoint.date,
                      yieldKg:
                        updates.yieldKg !== undefined
                          ? Number(updates.yieldKg)
                          : checkpoint.yieldKg,
                      notes:
                        updates.notes !== undefined
                          ? updates.notes
                          : checkpoint.notes,
                      photos:
                        updates.photos !== undefined
                          ? [...updates.photos]
                          : checkpoint.photos,
                    }
                  : checkpoint
              )
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              );
            return {
              ...plantation,
              updatedAt: timestamp,
              yieldTimeline: updatedTimeline,
            };
          }),
        }));
      },
      addYieldCheckpointPhoto: (plantationId, checkpointId, photoUrl) => {
        const trimmed = photoUrl.trim();
        if (!trimmed) {
          return;
        }
        const timestamp = new Date().toISOString();
        set((state) => ({
          plantations: state.plantations.map((plantation) =>
            plantation.id === plantationId
              ? {
                  ...plantation,
                  updatedAt: timestamp,
                  yieldTimeline: plantation.yieldTimeline.map((checkpoint) =>
                    checkpoint.id === checkpointId
                      ? {
                          ...checkpoint,
                          photos: checkpoint.photos.includes(trimmed)
                            ? checkpoint.photos
                            : [...checkpoint.photos, trimmed],
                        }
                      : checkpoint
                  ),
                }
              : plantation
          ),
        }));
      },
      recordCollaboratorNote: (plantationId, collaboratorId, note) => {
        const timestamp = new Date().toISOString();
        set((state) => ({
          plantations: state.plantations.map((plantation) =>
            plantation.id === plantationId
              ? {
                  ...plantation,
                  collaborators: plantation.collaborators.map((collaborator) =>
                    collaborator.id === collaboratorId
                      ? {
                          ...collaborator,
                          lastNote: note,
                          lastUpdated: timestamp,
                        }
                      : collaborator
                  ),
                }
              : plantation
          ),
        }));

        const updated = get().plantations.find(
          (plantation) => plantation.id === plantationId
        );
        const collaborator = updated?.collaborators.find(
          (item) => item.id === collaboratorId
        );

        if (updated && collaborator) {
          emitPlantationEvent({
            type: "collaborator_note_logged",
            plantation: updated,
            collaborator,
            note,
            timestamp,
          });
        }
      },
      addRecurringTemplate: (templateDraft) => {
        const now = new Date();
        const nowIso = now.toISOString();
        const frequency = templateDraft.frequency ?? "weekly";
        const interval = clampInterval(templateDraft.interval);
        const nextRunBase = templateDraft.nextRunDate
          ? new Date(templateDraft.nextRunDate)
          : addIntervalToDate(now, frequency, interval);
        const nextRunDate = Number.isNaN(nextRunBase.getTime())
          ? nowIso
          : nextRunBase.toISOString();

        const template: RecurringTaskTemplate = {
          id: templateDraft.id ?? generateRecurringTemplateId(),
          plantationId: templateDraft.plantationId,
          title: templateDraft.title,
          description: templateDraft.description,
          frequency,
          interval,
          leadTimeDays: Math.max(0, templateDraft.leadTimeDays ?? 0),
          nextRunDate,
          createdAt: nowIso,
          enabled: templateDraft.enabled ?? true,
          lastGeneratedAt: undefined,
        };

        set((state) => ({
          recurringTemplates: [template, ...state.recurringTemplates],
        }));

        return template;
      },
      updateRecurringTemplate: (id, updates) => {
        set((state) => ({
          recurringTemplates: state.recurringTemplates.map((template) =>
            template.id === id
              ? {
                  ...template,
                  ...updates,
                  interval: updates.interval
                    ? clampInterval(updates.interval)
                    : template.interval,
                  leadTimeDays:
                    updates.leadTimeDays !== undefined
                      ? Math.max(0, updates.leadTimeDays)
                      : template.leadTimeDays,
                  nextRunDate:
                    updates.nextRunDate !== undefined
                      ? new Date(updates.nextRunDate).toISOString()
                      : template.nextRunDate,
                }
              : template
          ),
        }));
      },
      removeRecurringTemplate: (id) => {
        set((state) => ({
          recurringTemplates: state.recurringTemplates.filter(
            (template) => template.id !== id
          ),
        }));
      },
      processRecurringTemplates: (currentDate) => {
        const now =
          currentDate instanceof Date
            ? currentDate
            : currentDate
            ? new Date(currentDate)
            : new Date();
        const nowIso = new Date().toISOString();
        const newTaskRefs: Array<{ plantationId: string; taskId: string }> = [];

        set((state) => {
          if (!state.recurringTemplates.length) {
            return {};
          }

          const additions = new Map<string, PlantationTask[]>();
          const updatedTemplates = state.recurringTemplates.map((template) => {
            if (!template.enabled) {
              return template;
            }

            const plantation = state.plantations.find(
              (item) => item.id === template.plantationId
            );
            if (!plantation) {
              return template;
            }

            let nextRun = new Date(template.nextRunDate);
            if (Number.isNaN(nextRun.getTime())) {
              nextRun = new Date();
            }

            const interval = clampInterval(template.interval);
            const tasksToAdd: PlantationTask[] = [];
            let iterations = 0;

            while (iterations < 12) {
              const creationThreshold = new Date(nextRun);
              creationThreshold.setDate(
                creationThreshold.getDate() - template.leadTimeDays
              );

              if (now < creationThreshold) {
                break;
              }

              const dueIso = nextRun.toISOString();
              const taskExists = plantation.tasks.some(
                (task) =>
                  task.templateId === template.id && task.dueDate === dueIso
              );

              if (!taskExists) {
                const task: PlantationTask = {
                  id: generateTaskId(),
                  title: template.title,
                  dueDate: dueIso,
                  status: "pending",
                  templateId: template.id,
                };
                tasksToAdd.push(task);
                const existing = additions.get(plantation.id) ?? [];
                existing.push(task);
                additions.set(plantation.id, existing);
                newTaskRefs.push({
                  plantationId: plantation.id,
                  taskId: task.id,
                });
              }

              iterations += 1;
              nextRun = addIntervalToDate(nextRun, template.frequency, interval);
            }

            if (tasksToAdd.length) {
              return {
                ...template,
                nextRunDate: nextRun.toISOString(),
                lastGeneratedAt: nowIso,
              };
            }

            return template;
          });

          if (!additions.size) {
            return {
              recurringTemplates: updatedTemplates,
            };
          }

          const updatedPlantations = state.plantations.map((plantation) => {
            const addedTasks = additions.get(plantation.id);
            if (!addedTasks?.length) {
              return plantation;
            }

            const tasks = [...addedTasks, ...plantation.tasks].sort(
              (a, b) =>
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            );

            return {
              ...plantation,
              tasks,
              updatedAt: nowIso,
            };
          });

          return {
            plantations: updatedPlantations,
            recurringTemplates: updatedTemplates,
          };
        });

        if (newTaskRefs.length) {
          const latestState = get();
          newTaskRefs.forEach(({ plantationId, taskId }) => {
            const plantation = latestState.plantations.find(
              (item) => item.id === plantationId
            );
            const task = plantation?.tasks.find((item) => item.id === taskId);
            if (plantation && task) {
              emitPlantationEvent({
                type: "task_added",
                plantation,
                task,
                timestamp: nowIso,
              });
            }
          });
        }
      },
      addStageTaskTemplate: (templateDraft) => {
        const now = new Date().toISOString();
        const template: StageTaskTemplate = {
          id: templateDraft.id ?? generateStageTemplateId(),
          stage: templateDraft.stage,
          title: templateDraft.title,
          description: templateDraft.description,
          dueOffsetDays: clampDueOffset(templateDraft.dueOffsetDays),
          assigneeRole: templateDraft.assigneeRole?.trim() || undefined,
          attachments: templateDraft.attachments
            ? [...templateDraft.attachments]
            : [],
          createdAt: now,
          updatedAt: undefined,
          enabled: templateDraft.enabled ?? true,
        };

        set((state) => ({
          stageTemplates: [template, ...state.stageTemplates],
        }));

        return template;
      },
      updateStageTaskTemplate: (id, updates) => {
        set((state) => ({
          stageTemplates: state.stageTemplates.map((template) =>
            template.id === id
              ? {
                  ...template,
                  ...updates,
                  dueOffsetDays:
                    updates.dueOffsetDays !== undefined
                      ? clampDueOffset(updates.dueOffsetDays)
                      : template.dueOffsetDays,
                  assigneeRole:
                    updates.assigneeRole !== undefined
                      ? updates.assigneeRole.trim() || undefined
                      : template.assigneeRole,
                  attachments:
                    updates.attachments !== undefined
                      ? [...updates.attachments]
                      : template.attachments,
                  enabled:
                    updates.enabled !== undefined
                      ? updates.enabled
                      : template.enabled,
                  updatedAt: new Date().toISOString(),
                }
              : template
          ),
        }));
      },
      removeStageTaskTemplate: (id) => {
        set((state) => ({
          stageTemplates: state.stageTemplates.filter(
            (template) => template.id !== id
          ),
        }));
      },
      addTaskAttachment: (plantationId, taskId, attachmentUrl) => {
        const now = new Date().toISOString();
        set((state) => ({
          plantations: state.plantations.map((plantation) =>
            plantation.id === plantationId
              ? {
                  ...plantation,
                  updatedAt: now,
                  tasks: plantation.tasks.map((taskItem) =>
                    taskItem.id === taskId
                      ? {
                          ...taskItem,
                          attachments: [
                            ...(taskItem.attachments ?? []),
                            attachmentUrl,
                          ],
                        }
                      : taskItem
                  ),
                }
              : plantation
          ),
        }));
      },
      setCoordinates: (plantationId, coordinates) => {
        const timestamp = new Date().toISOString();
        set((state) => ({
          plantations: state.plantations.map((plantation) =>
            plantation.id === plantationId
              ? {
                  ...plantation,
                  coordinates,
                  updatedAt: timestamp,
                }
              : plantation
          ),
        }));

        const updated = get().plantations.find(
          (plantation) => plantation.id === plantationId
        );

        if (updated) {
          emitPlantationEvent({
            type: "coordinates_updated",
            plantation: updated,
            coordinates,
            timestamp,
          });
        }
      },
      resetToSeedData: () => {
        set({
          plantations: seedData,
          recurringTemplates: [],
          stageTemplates: stageTemplateSeed,
        });
      },
    }),
    buildPersistOptions()
  )
);

export const getNextStage = (current: GrowthStage): GrowthStage => {
  const currentIndex = stageOrder.findIndex((stage) => stage === current);
  const nextIndex = Math.min(stageOrder.length - 1, currentIndex + 1);
  return stageOrder[nextIndex];
};

