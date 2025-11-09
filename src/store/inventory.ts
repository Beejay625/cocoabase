import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type InventoryItem = {
  id: string;
  name: string;
  category: "seeds" | "fertilizer" | "equipment" | "supplies" | "other";
  quantity: number;
  unit: string;
  unitPrice: number;
  supplier?: string;
  purchaseDate?: string;
  expiryDate?: string;
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type InventoryItemDraft = Omit<
  InventoryItem,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
};

type InventoryState = {
  items: InventoryItem[];
  addItem: (draft: InventoryItemDraft) => void;
  updateItem: (id: string, updates: Partial<InventoryItemDraft>) => void;
  removeItem: (id: string) => void;
  getItemsByCategory: (category: InventoryItem["category"]) => InventoryItem[];
  getLowStockItems: (threshold?: number) => InventoryItem[];
};

const generateInventoryId = () => `inv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (draft) => {
        const now = new Date().toISOString();
        const item: InventoryItem = {
          ...draft,
          id: draft.id ?? generateInventoryId(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          items: [...state.items, item],
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

      getItemsByCategory: (category) => {
        return get().items.filter((item) => item.category === category);
      },

      getLowStockItems: (threshold = 10) => {
        return get().items.filter((item) => item.quantity <= threshold);
      },
    }),
    {
      name: "cocoa-chain-inventory",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<InventoryState>
  )
);

