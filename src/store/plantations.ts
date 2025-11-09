import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";
import plantationsSeedData from "@/data/plantations.json";

export type GrowthStage = "planted" | "growing" | "harvested";

export type TaskStatus = "pending" | "in_progress" | "completed";

export type PlantationTask = {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
};

export type PlantationCoordinates = {
  latitude: number;
  longitude: number;
};

export type YieldCheckpoint = {
  date: string;
  event: string;
  yieldKg: number;
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
  tasks?: PlantationTask[];
  yieldTimeline?: YieldCheckpoint[];
  collaborators?: Omit<PlantationCollaborator, "id">[];
};

type PlantationState = {
  plantations: Plantation[];
  addPlantation: (payload: PlantationDraft) => Plantation;
  updateStage: (id: string, nextStage: GrowthStage, note?: string) => void;
  getPlantationsByWallet: (walletAddress: string | undefined) => Plantation[];
  addTask: (plantationId: string, task: Omit<PlantationTask, "id">) => void;
  updateTaskStatus: (
    plantationId: string,
    taskId: string,
    status: TaskStatus
  ) => void;
  addYieldCheckpoint: (
    plantationId: string,
    checkpoint: YieldCheckpoint
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

type SeedCollaborator = Omit<PlantationCollaborator, "id"> & { id?: string };
type SeedPlantation = Omit<
  Plantation,
  "yieldTimeline" | "collaborators" | "tasks"
> & {
  yieldTimeline?: YieldCheckpoint[];
  collaborators?: SeedCollaborator[];
  tasks?: PlantationTask[];
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
      ? plantation.yieldTimeline
      : [],
    collaborators: Array.isArray(plantation.collaborators)
      ? plantation.collaborators.map((collaborator) =>
          normalizeCollaborator(collaborator, updatedAt)
        )
      : [],
    tasks: Array.isArray(plantation.tasks) ? plantation.tasks : [],
  };
};

const seedData: Plantation[] = (
  plantationsSeedData as unknown as SeedPlantation[]
).map(normalizePlantation);

const generateId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `seed-${Date.now()}`;
};

const generateTaskId = () => `task-${Math.random().toString(36).slice(2, 9)}`;

const buildPersistOptions = (): PersistOptions<PlantationState> => {
  const options: PersistOptions<PlantationState> = {
    name: "cocoa-chain-plantations",
    version: 2,
    skipHydration: true,
    onRehydrateStorage: () => (state) => {
      if (!state) {
        return;
      }

      if (!state.plantations.length) {
        state.plantations = seedData;
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
      addPlantation: (payload) => {
        const now = new Date().toISOString();
        const collaborators =
          payload.collaborators?.map((collaborator) =>
            normalizeCollaborator(collaborator, now)
          ) ?? [];

        const plantation: Plantation = {
          id: generateId(),
          stage: payload.stage ?? "planted",
          updatedAt: now,
          tasks: payload.tasks ?? [],
          yieldTimeline: payload.yieldTimeline ?? [],
          collaborators,
          ...payload,
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

        set((state) => ({
          plantations: state.plantations.map((plantation) =>
            plantation.id === id
              ? {
                  ...plantation,
                  stage: nextStage,
                  updatedAt: now,
                  notes: note ?? plantation.notes,
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
      addYieldCheckpoint: (plantationId, checkpoint) => {
        const timestamp = new Date().toISOString();
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

        if (updated) {
          emitPlantationEvent({
            type: "yield_checkpoint_added",
            plantation: updated,
            checkpoint,
            timestamp,
          });
        }
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
            type: "collaborator_added",
            plantation: updated,
            collaborator,
            timestamp,
          });
        }
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
        set({ plantations: seedData });
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

