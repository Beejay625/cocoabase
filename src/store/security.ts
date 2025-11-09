"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SecurityEventType =
  | "settings_updated"
  | "wallet_connected"
  | "wallet_disconnected"
  | "risk_detected"
  | "monitor_resolution"
  | "session_locked"
  | "session_unlocked";

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
  locked: boolean;
  lastActivityAt?: string;
  updateSettings: (updates: Partial<SecuritySettings>) => void;
  recordEvent: (event: Omit<SecurityEvent, "id" | "createdAt"> & {
    createdAt?: string;
  }) => void;
  recordActivity: () => void;
  lockSession: () => void;
  unlockSession: () => void;
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
    (set) => ({
      settings: DEFAULT_SETTINGS,
      events: [],
      locked: false,
      lastActivityAt: undefined,
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
      recordActivity: () => {
        set((state) => {
          if (state.locked) {
            return state;
          }

          return {
            ...state,
            lastActivityAt: new Date().toISOString(),
          };
        });
      },
      lockSession: () => {
        set((state) => {
          if (state.locked) {
            return state;
          }

          const timestamp = new Date().toISOString();
          return {
            ...state,
            locked: true,
            events: [
              {
                id: generateId(),
                type: "session_locked",
                message: "Session auto-locked due to inactivity.",
                createdAt: timestamp,
              },
              ...state.events,
            ].slice(0, MAX_EVENTS),
          };
        });
      },
      unlockSession: () => {
        set((state) => {
          if (!state.locked) {
            return state;
          }

          const timestamp = new Date().toISOString();
          return {
            ...state,
            locked: false,
            lastActivityAt: timestamp,
            events: [
              {
                id: generateId(),
                type: "session_unlocked",
                message: "Session unlocked.",
                createdAt: timestamp,
              },
              ...state.events,
            ].slice(0, MAX_EVENTS),
          };
        });
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

        if (typeof state.locked !== "boolean") {
          state.locked = false;
        }

        if (!state.lastActivityAt) {
          state.lastActivityAt = new Date().toISOString();
        }
      },
    }
  )
);


