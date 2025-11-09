import { create } from "zustand";
import { persist, type PersistOptions, createJSONStorage } from "zustand/middleware";
import plantationsSeedData from "@/data/plantations.json";

export type GrowthStage = "planted" | "growing" | "harvested";

export type TaskStatus = "pending" | "in_progress" | "completed";

export type PlantationTask = {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
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
  tasks: PlantationTask[];
};

export type PlantationDraft = Omit<
  Plantation,
  "id" | "stage" | "updatedAt" | "tasks"
> & {
  stage?: GrowthStage;
  tasks?: PlantationTask[];
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
  resetToSeedData: () => void;
};

const stageOrder: GrowthStage[] = ["planted", "growing", "harvested"];

const seedData: Plantation[] = plantationsSeedData;

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
    version: 1,
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
        const plantation: Plantation = {
          id: generateId(),
          stage: payload.stage ?? "planted",
          updatedAt: now,
          tasks: payload.tasks ?? [],
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
        set((state) => ({
          plantations: state.plantations.map((plantation) =>
            plantation.id === plantationId
              ? {
                  ...plantation,
                  updatedAt: now,
                  tasks: [
                    {
                      id: generateTaskId(),
                      status: "pending",
                      ...task,
                    },
                    ...plantation.tasks,
                  ],
                }
              : plantation
          ),
        }));
      },
      updateTaskStatus: (plantationId, taskId, status) => {
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

