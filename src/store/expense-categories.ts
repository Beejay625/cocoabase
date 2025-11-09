import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type ExpenseCategory = {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  parentId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ExpenseCategoryDraft = Omit<
  ExpenseCategory,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
};

type ExpenseCategoriesState = {
  categories: ExpenseCategory[];
  addCategory: (draft: ExpenseCategoryDraft) => void;
  updateCategory: (id: string, updates: Partial<ExpenseCategoryDraft>) => void;
  removeCategory: (id: string) => void;
  getActiveCategories: () => ExpenseCategory[];
  getCategoryById: (id: string) => ExpenseCategory | undefined;
};

const generateCategoryId = () =>
  `cat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const defaultColors = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // rose
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
];

export const useExpenseCategoriesStore = create<ExpenseCategoriesState>()(
  persist(
    (set, get) => ({
      categories: [
        {
          id: "seed",
          name: "Seeds",
          description: "Seed purchases",
          color: defaultColors[0],
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "fertilizer",
          name: "Fertilizer",
          description: "Fertilizer and soil amendments",
          color: defaultColors[1],
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "labor",
          name: "Labor",
          description: "Labor costs",
          color: defaultColors[2],
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "equipment",
          name: "Equipment",
          description: "Equipment purchases and rentals",
          color: defaultColors[3],
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],

      addCategory: (draft) => {
        const now = new Date().toISOString();
        const category: ExpenseCategory = {
          ...draft,
          id: draft.id ?? generateCategoryId(),
          color: draft.color || defaultColors[Math.floor(Math.random() * defaultColors.length)],
          isActive: draft.isActive !== undefined ? draft.isActive : true,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          categories: [...state.categories, category],
        }));
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id
              ? { ...category, ...updates, updatedAt: new Date().toISOString() }
              : category
          ),
        }));
      },

      removeCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        }));
      },

      getActiveCategories: () => {
        return get().categories.filter((category) => category.isActive);
      },

      getCategoryById: (id) => {
        return get().categories.find((category) => category.id === id);
      },
    }),
    {
      name: "cocoa-chain-expense-categories",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<ExpenseCategoriesState>
  )
);

