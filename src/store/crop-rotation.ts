import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type CropType = "cocoa" | "banana" | "cassava" | "maize" | "other";

export type CropRotationPlan = {
  id: string;
  plantationId: string;
  cropType: CropType;
  season: string;
  year: number;
  plantingDate: string;
  harvestDate?: string;
  expectedYield?: number;
  actualYield?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CropRotationPlanDraft = Omit<
  CropRotationPlan,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
};

type CropRotationState = {
  plans: CropRotationPlan[];
  addPlan: (draft: CropRotationPlanDraft) => void;
  updatePlan: (id: string, updates: Partial<CropRotationPlanDraft>) => void;
  removePlan: (id: string) => void;
  getPlansByPlantation: (plantationId: string) => CropRotationPlan[];
  getPlansBySeason: (season: string, year: number) => CropRotationPlan[];
  getRotationHistory: (plantationId: string) => CropRotationPlan[];
};

const generateRotationId = () =>
  `rot_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const useCropRotationStore = create<CropRotationState>()(
  persist(
    (set, get) => ({
      plans: [],

      addPlan: (draft) => {
        const now = new Date().toISOString();
        const plan: CropRotationPlan = {
          ...draft,
          id: draft.id ?? generateRotationId(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          plans: [...state.plans, plan],
        }));
      },

      updatePlan: (id, updates) => {
        set((state) => ({
          plans: state.plans.map((plan) =>
            plan.id === id
              ? { ...plan, ...updates, updatedAt: new Date().toISOString() }
              : plan
          ),
        }));
      },

      removePlan: (id) => {
        set((state) => ({
          plans: state.plans.filter((plan) => plan.id !== id),
        }));
      },

      getPlansByPlantation: (plantationId) => {
        return get()
          .plans.filter((plan) => plan.plantationId === plantationId)
          .sort(
            (a, b) =>
              new Date(b.plantingDate).getTime() -
              new Date(a.plantingDate).getTime()
          );
      },

      getPlansBySeason: (season, year) => {
        return get().plans.filter(
          (plan) => plan.season === season && plan.year === year
        );
      },

      getRotationHistory: (plantationId) => {
        return get()
          .getPlansByPlantation(plantationId)
          .sort(
            (a, b) =>
              new Date(a.plantingDate).getTime() -
              new Date(b.plantingDate).getTime()
          );
      },
    }),
    {
      name: "cocoa-chain-crop-rotation",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<CropRotationState>
  )
);

