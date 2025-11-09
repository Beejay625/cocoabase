import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type SupplyChainStage =
  | "harvested"
  | "processing"
  | "packaging"
  | "transport"
  | "warehouse"
  | "retail"
  | "delivered";

export type SupplyChainItem = {
  id: string;
  plantationId: string;
  harvestId?: string;
  stage: SupplyChainStage;
  quantityKg: number;
  currentLocation?: string;
  destination?: string;
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  qualityGrade?: string;
  certifications?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type SupplyChainItemDraft = Omit<
  SupplyChainItem,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
};

type SupplyChainState = {
  items: SupplyChainItem[];
  addItem: (draft: SupplyChainItemDraft) => void;
  updateStage: (id: string, stage: SupplyChainStage) => void;
  updateItem: (id: string, updates: Partial<SupplyChainItemDraft>) => void;
  removeItem: (id: string) => void;
  getItemsByStage: (stage: SupplyChainStage) => SupplyChainItem[];
  getItemsByPlantation: (plantationId: string) => SupplyChainItem[];
};

const generateSupplyChainId = () =>
  `sc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const useSupplyChainStore = create<SupplyChainState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (draft) => {
        const now = new Date().toISOString();
        const item: SupplyChainItem = {
          ...draft,
          id: draft.id ?? generateSupplyChainId(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          items: [...state.items, item],
        }));
      },

      updateStage: (id, stage) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, stage, updatedAt: new Date().toISOString() }
              : item
          ),
        }));
      },

      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, ...updates, updatedAt: new Date().toISOString() }
              : item
          ),
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      getItemsByStage: (stage) => {
        return get().items.filter((item) => item.stage === stage);
      },

      getItemsByPlantation: (plantationId) => {
        return get().items.filter((item) => item.plantationId === plantationId);
      },
    }),
    {
      name: "cocoa-chain-supply-chain",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<SupplyChainState>
  )
);

