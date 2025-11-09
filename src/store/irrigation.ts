import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type IrrigationRecord = {
  id: string;
  plantationId: string;
  date: string;
  method: "sprinkler" | "drip" | "flood" | "manual" | "other";
  durationMinutes: number;
  waterVolumeLiters?: number;
  soilMoistureBefore?: number;
  soilMoistureAfter?: number;
  weatherConditions?: string;
  notes?: string;
  createdAt: string;
};

export type IrrigationRecordDraft = Omit<
  IrrigationRecord,
  "id" | "createdAt"
> & {
  id?: string;
};

type IrrigationState = {
  records: IrrigationRecord[];
  addRecord: (draft: IrrigationRecordDraft) => void;
  updateRecord: (id: string, updates: Partial<IrrigationRecordDraft>) => void;
  removeRecord: (id: string) => void;
  getRecordsByPlantation: (plantationId: string) => IrrigationRecord[];
  getTotalWaterUsage: (startDate?: string, endDate?: string) => number;
  getAverageMoisture: (plantationId: string) => number | null;
};

const generateIrrigationId = () =>
  `irr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const useIrrigationStore = create<IrrigationState>()(
  persist(
    (set, get) => ({
      records: [],

      addRecord: (draft) => {
        const now = new Date().toISOString();
        const record: IrrigationRecord = {
          ...draft,
          id: draft.id ?? generateIrrigationId(),
          createdAt: now,
        };
        set((state) => ({
          records: [...state.records, record],
        }));
      },

      updateRecord: (id, updates) => {
        set((state) => ({
          records: state.records.map((record) =>
            record.id === id ? { ...record, ...updates } : record
          ),
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

      getTotalWaterUsage: (startDate, endDate) => {
        return get()
          .records.filter((record) => {
            if (startDate && record.date < startDate) return false;
            if (endDate && record.date > endDate) return false;
            return true;
          })
          .reduce((sum, record) => sum + (record.waterVolumeLiters || 0), 0);
      },

      getAverageMoisture: (plantationId) => {
        const plantationRecords = get().getRecordsByPlantation(plantationId);
        const recordsWithMoisture = plantationRecords.filter(
          (r) => r.soilMoistureAfter !== undefined
        );
        if (recordsWithMoisture.length === 0) return null;
        const sum = recordsWithMoisture.reduce(
          (acc, r) => acc + (r.soilMoistureAfter || 0),
          0
        );
        return sum / recordsWithMoisture.length;
      },
    }),
    {
      name: "cocoa-chain-irrigation",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<IrrigationState>
  )
);

