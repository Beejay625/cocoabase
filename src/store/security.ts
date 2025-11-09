"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SecurityEventType =
  | "settings_updated"
  | "wallet_connected"
  | "wallet_disconnected"
  | "risk_detected"
  | "monitor_resolution";

export type SecurityEvent = {
  id: string;
  type: SecurityEventType;
  message: string;
  createdAt: string;
};

export type SecuritySettings = {
  sessionTimeoutMinutes: number;
  transactionPinEnabled: boolean;
  phishingCode?: string;
  monitorThirdPartySigners: boolean;
  networkMismatchAlerts: boolean;
};

type SecurityState = {
  settings: SecuritySettings;
  events: SecurityEvent[];
  updateSettings: (updates: Partial<SecuritySettings>) => void;
  recordEvent: (event: Omit<SecurityEvent, "id" | "createdAt"> & {
    createdAt?: string;
  }) => void;
  clearEvents: () => void;
};

const DEFAULT_SETTINGS: SecuritySettings = {
  sessionTimeoutMinutes: 10,
  transactionPinEnabled: true,
  phishingCode: undefined,
  monitorThirdPartySigners: true,
  networkMismatchAlerts: true,
};

const MAX_EVENTS = 25;

const generateId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `sec-${Math.random().toString(36).slice(2, 10)}`;
};

export const useSecurityStore = create<SecurityState>()(
  persist(
    (set, get) => ({
      settings: DEFAULT_SETTINGS,
      events: [],
      updateSettings: (updates) => {
        set((state) => {
          const nextSettings = {
            ...state.settings,
            ...updates,
            sessionTimeoutMinutes: Math.max(
              1,
              updates.sessionTimeoutMinutes ?? state.settings.sessionTimeoutMinutes
            ),
          };

          return {
            settings: nextSettings,
            events: [
              {
                id: generateId(),
                type: "settings_updated",
                message: "Security settings updated.",
                createdAt: new Date().toISOString(),
              },
              ...state.events,
            ].slice(0, MAX_EVENTS),
          };
        });
      },
      recordEvent: ({ type, message, createdAt }) => {
        const event: SecurityEvent = {
          id: generateId(),
          type,
          message,
          createdAt: createdAt ?? new Date().toISOString(),
        };

        set((state) => ({
          events: [event, ...state.events].slice(0, MAX_EVENTS),
        }));
      },
      clearEvents: () => {
        set({ events: [] });
      },
    }),
    {
      name: "cocoa-chain-security",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => window.localStorage)
          : undefined,
      skipHydration: true,
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        if (!state.settings) {
          state.settings = DEFAULT_SETTINGS;
        }

        if (!state.events) {
          state.events = [];
        }
      },
    }
  )
);


