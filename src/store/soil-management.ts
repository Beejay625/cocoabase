import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type SoilTestType = "ph" | "nutrients" | "moisture" | "organic_matter" | "other";

export type SoilTest = {
  id: string;
  plantationId: string;
  testType: SoilTestType;
  ph?: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  organicMatter?: number;
  moisture?: number;
  testDate: string;
  testedBy?: string;
  recommendations?: string[];
  notes?: string;
  createdAt: string;
};

export type SoilTestDraft = Omit<SoilTest, "id" | "createdAt"> & {
  id?: string;
};

type SoilManagementState = {
  tests: SoilTest[];
  addTest: (draft: SoilTestDraft) => void;
  updateTest: (id: string, updates: Partial<SoilTestDraft>) => void;
  removeTest: (id: string) => void;
  getTestsByPlantation: (plantationId: string) => SoilTest[];
  getLatestTest: (plantationId: string) => SoilTest | null;
};

const generateSoilTestId = () =>
  `soil_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const useSoilManagementStore = create<SoilManagementState>()(
  persist(
    (set, get) => ({
      tests: [],

      addTest: (draft) => {
        const now = new Date().toISOString();
        const test: SoilTest = {
          ...draft,
          id: draft.id ?? generateSoilTestId(),
          createdAt: now,
        };
        set((state) => ({
          tests: [...state.tests, test],
        }));
      },

      updateTest: (id, updates) => {
        set((state) => ({
          tests: state.tests.map((test) =>
            test.id === id ? { ...test, ...updates } : test
          ),
        }));
      },

      removeTest: (id) => {
        set((state) => ({
          tests: state.tests.filter((test) => test.id !== id),
        }));
      },

      getTestsByPlantation: (plantationId) => {
        return get().tests.filter((test) => test.plantationId === plantationId);
      },

      getLatestTest: (plantationId) => {
        const tests = get().getTestsByPlantation(plantationId);
        if (tests.length === 0) return null;
        return tests.sort(
          (a, b) =>
            new Date(b.testDate).getTime() - new Date(a.testDate).getTime()
        )[0];
      },
    }),
    {
      name: "cocoa-chain-soil-management",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<SoilManagementState>
  )
);

