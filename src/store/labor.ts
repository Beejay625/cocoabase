import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type LaborRole = "farmer" | "supervisor" | "harvester" | "maintenance" | "other";

export type LaborRecord = {
  id: string;
  name: string;
  role: LaborRole;
  plantationId?: string;
  taskId?: string;
  date: string;
  hours: number;
  hourlyRate: number;
  totalCost: number;
  notes?: string;
  createdAt: string;
};

export type LaborRecordDraft = Omit<
  LaborRecord,
  "id" | "createdAt" | "totalCost"
> & {
  id?: string;
};

type LaborState = {
  records: LaborRecord[];
  addRecord: (draft: LaborRecordDraft) => void;
  updateRecord: (id: string, updates: Partial<LaborRecordDraft>) => void;
  removeRecord: (id: string) => void;
  getRecordsByPlantation: (plantationId: string) => LaborRecord[];
  getTotalLaborCost: (startDate?: string, endDate?: string) => number;
  getRecordsByRole: (role: LaborRole) => LaborRecord[];
};

const generateLaborId = () =>
  `labor_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const useLaborStore = create<LaborState>()(
  persist(
    (set, get) => ({
      records: [],

      addRecord: (draft) => {
        const now = new Date().toISOString();
        const totalCost = draft.hours * draft.hourlyRate;
        const record: LaborRecord = {
          ...draft,
          id: draft.id ?? generateLaborId(),
          totalCost,
          createdAt: now,
        };
        set((state) => ({
          records: [...state.records, record],
        }));
      },

      updateRecord: (id, updates) => {
        set((state) => ({
          records: state.records.map((record) => {
            if (record.id === id) {
              const updated = { ...record, ...updates };
              updated.totalCost = updated.hours * updated.hourlyRate;
              return updated;
            }
            return record;
          }),
        }));
      },

      removeRecord: (id) => {
        set((state) => ({
          records: state.records.filter((record) => record.id !== id),
        }));
      },

      getRecordsByPlantation: (plantationId) => {
        return get().records.filter(
          (record) => record.plantationId === plantationId
        );
      },

      getTotalLaborCost: (startDate, endDate) => {
        return get()
          .records.filter((record) => {
            if (startDate && record.date < startDate) return false;
            if (endDate && record.date > endDate) return false;
            return true;
          })
          .reduce((sum, record) => sum + record.totalCost, 0);
      },

      getRecordsByRole: (role) => {
        return get().records.filter((record) => record.role === role);
      },
    }),
    {
      name: "cocoa-chain-labor",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<LaborState>
  )
);

