import { create } from "zustand";
import { persist, type PersistOptions, createJSONStorage } from "zustand/middleware";
import plantationsSeedData from "@/data/plantations.json";

export type GrowthStage = "planted" | "growing" | "harvested";

export type Plantation = {
  id: string;
  seedName: string;
  location?: string;
  stage: GrowthStage;
  startDate: string;
  updatedAt: string;
  walletAddress: string;
  notes?: string;
};

export type PlantationDraft = Omit<Plantation, "id" | "stage" | "updatedAt"> & {
  stage?: GrowthStage;
};

type PlantationState = {
  plantations: Plantation[];
  addPlantation: (payload: PlantationDraft) => Plantation;
  updateStage: (id: string, nextStage: GrowthStage) => void;
  getPlantationsByWallet: (walletAddress: string | undefined) => Plantation[];
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
          ...payload,
        };

        set((state) => ({
          plantations: [plantation, ...state.plantations],
        }));

        return plantation;
      },
      updateStage: (id, nextStage) => {
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

