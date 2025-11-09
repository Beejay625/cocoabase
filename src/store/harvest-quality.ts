import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type QualityMetric = {
  id: string;
  harvestId: string;
  plantationId: string;
  testDate: string;
  moistureContent: number;
  beanCount: number;
  defectRate: number;
  fermentationScore?: number;
  flavorNotes?: string;
  grade: "premium" | "grade_a" | "grade_b" | "reject";
  tester?: string;
  notes?: string;
  createdAt: string;
};

export type QualityMetricDraft = Omit<
  QualityMetric,
  "id" | "createdAt"
> & {
  id?: string;
};

type HarvestQualityState = {
  metrics: QualityMetric[];
  addMetric: (draft: QualityMetricDraft) => void;
  updateMetric: (id: string, updates: Partial<QualityMetricDraft>) => void;
  removeMetric: (id: string) => void;
  getMetricsByPlantation: (plantationId: string) => QualityMetric[];
  getAverageGrade: (plantationId?: string) => number;
};

const generateQualityId = () =>
  `quality_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const gradeToNumber = (grade: QualityMetric["grade"]) => {
  switch (grade) {
    case "premium":
      return 4;
    case "grade_a":
      return 3;
    case "grade_b":
      return 2;
    case "reject":
      return 1;
  }
};

export const useHarvestQualityStore = create<HarvestQualityState>()(
  persist(
    (set, get) => ({
      metrics: [],

      addMetric: (draft) => {
        const now = new Date().toISOString();
        const metric: QualityMetric = {
          ...draft,
          id: draft.id ?? generateQualityId(),
          createdAt: now,
        };
        set((state) => ({
          metrics: [...state.metrics, metric],
        }));
      },

      updateMetric: (id, updates) => {
        set((state) => ({
          metrics: state.metrics.map((metric) =>
            metric.id === id ? { ...metric, ...updates } : metric
          ),
        }));
      },

      removeMetric: (id) => {
        set((state) => ({
          metrics: state.metrics.filter((metric) => metric.id !== id),
        }));
      },

      getMetricsByPlantation: (plantationId) => {
        return get()
          .metrics.filter((metric) => metric.plantationId === plantationId)
          .sort(
            (a, b) =>
              new Date(b.testDate).getTime() - new Date(a.testDate).getTime()
          );
      },

      getAverageGrade: (plantationId) => {
        const filtered = plantationId
          ? get().getMetricsByPlantation(plantationId)
          : get().metrics;
        if (filtered.length === 0) return 0;
        const total = filtered.reduce(
          (sum, metric) => sum + gradeToNumber(metric.grade),
          0
        );
        return total / filtered.length;
      },
    }),
    {
      name: "cocoa-chain-harvest-quality",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<HarvestQualityState>
  )
);

