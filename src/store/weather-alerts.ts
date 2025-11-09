import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type WeatherAlertType =
  | "rain"
  | "drought"
  | "storm"
  | "frost"
  | "heat"
  | "wind";

export type WeatherAlertSeverity = "low" | "medium" | "high" | "critical";

export type WeatherAlert = {
  id: string;
  type: WeatherAlertType;
  severity: WeatherAlertSeverity;
  location: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  impact?: string;
  recommendations?: string[];
  acknowledged: boolean;
  createdAt: string;
};

export type WeatherAlertDraft = Omit<
  WeatherAlert,
  "id" | "createdAt" | "acknowledged"
> & {
  id?: string;
};

type WeatherAlertState = {
  alerts: WeatherAlert[];
  addAlert: (draft: WeatherAlertDraft) => void;
  acknowledgeAlert: (id: string) => void;
  removeAlert: (id: string) => void;
  getActiveAlerts: () => WeatherAlert[];
  getAlertsByLocation: (location: string) => WeatherAlert[];
  getAlertsBySeverity: (severity: WeatherAlertSeverity) => WeatherAlert[];
};

const generateAlertId = () =>
  `wa_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const useWeatherAlertStore = create<WeatherAlertState>()(
  persist(
    (set, get) => ({
      alerts: [],

      addAlert: (draft) => {
        const now = new Date().toISOString();
        const alert: WeatherAlert = {
          ...draft,
          id: draft.id ?? generateAlertId(),
          acknowledged: false,
          createdAt: now,
        };
        set((state) => ({
          alerts: [...state.alerts, alert],
        }));
      },

      acknowledgeAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, acknowledged: true } : alert
          ),
        }));
      },

      removeAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== id),
        }));
      },

      getActiveAlerts: () => {
        const now = new Date();
        return get().alerts.filter((alert) => {
          if (alert.acknowledged) return false;
          const startDate = new Date(alert.startDate);
          if (startDate > now) return false;
          if (alert.endDate) {
            const endDate = new Date(alert.endDate);
            if (endDate < now) return false;
          }
          return true;
        });
      },

      getAlertsByLocation: (location) => {
        return get().alerts.filter((alert) =>
          alert.location.toLowerCase().includes(location.toLowerCase())
        );
      },

      getAlertsBySeverity: (severity) => {
        return get().alerts.filter((alert) => alert.severity === severity);
      },
    }),
    {
      name: "cocoa-chain-weather-alerts",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<WeatherAlertState>
  )
);

