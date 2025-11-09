"use client";

import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type AlertType =
  | "task_due"
  | "task_overdue"
  | "stage_change"
  | "wallet_activity"
  | "system";

export type AlertSeverity = "info" | "warning" | "critical";

export type AlertChannel = "in_app" | "email" | "sms";

export type AlertChannelStatus = "pending" | "sent" | "failed";

export type AlertChannelState = {
  channel: AlertChannel;
  status: AlertChannelStatus;
  lastAttemptAt?: string;
  error?: string;
};

export type AlertSource =
  | {
      kind: "plantation";
      plantationId: string;
    }
  | {
      kind: "task";
      plantationId: string;
      taskId: string;
    }
  | {
      kind: "wallet";
      address: string;
      activity: "connected" | "disconnected" | "watch_added" | "watch_removed";
    }
  | {
      kind: "system";
    };

export type Alert = {
  id: string;
  type: AlertType;
  title: string;
  description?: string;
  severity: AlertSeverity;
  createdAt: string;
  acknowledged: boolean;
  channels: AlertChannelState[];
  metadata?: Record<string, unknown>;
  source?: AlertSource;
  dedupeKey?: string;
};

export type NewAlertInput = {
  type: AlertType;
  title: string;
  description?: string;
  severity?: AlertSeverity;
  metadata?: Record<string, unknown>;
  source?: AlertSource;
  channels?: AlertChannel[];
  dedupeKey?: string;
};

export type AlertPreferences = {
  channels: Record<AlertChannel, boolean>;
};

type AlertsState = {
  alerts: Alert[];
  preferences: AlertPreferences;
  addAlert: (input: NewAlertInput) => Alert;
  acknowledgeAlert: (id: string) => void;
  dismissAlert: (id: string) => void;
  markChannelStatus: (
    id: string,
    channel: AlertChannel,
    status: AlertChannelStatus,
    error?: string
  ) => void;
  setChannelPreference: (channel: AlertChannel, enabled: boolean) => void;
  clearAll: () => void;
};

const defaultPreferences: AlertPreferences = {
  channels: {
    in_app: true,
    email: true,
    sms: true,
  },
};

const defaultChannels: AlertChannel[] = ["in_app", "email", "sms"];

const generateAlertId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `alert-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
};

const buildChannels = (
  requestedChannels: AlertChannel[] | undefined,
  preferences: AlertPreferences
): AlertChannelState[] => {
  const channels = new Set<AlertChannel>(
    requestedChannels?.length ? requestedChannels : defaultChannels
  );

  channels.add("in_app");

  return Array.from(channels)
    .filter((channel) => channel === "in_app" || preferences.channels[channel])
    .map((channel) => ({
      channel,
      status: "pending" as const,
    }));
};

const buildPersistOptions = (): PersistOptions<AlertsState> => {
  const options: PersistOptions<AlertsState> = {
    name: "cocoa-chain-alerts",
    version: 1,
    skipHydration: true,
    onRehydrateStorage: () => (state) => {
      if (!state) return;
      if (!state.alerts) {
        state.alerts = [];
      }
      if (!state.preferences) {
        state.preferences = defaultPreferences;
      }
    },
  };

  if (typeof window !== "undefined") {
    options.storage = createJSONStorage(() => window.localStorage);
    options.skipHydration = false;
  }

  return options;
};

export const useAlertsStore = create<AlertsState>()(
  persist(
    (set, get) => ({
      alerts: [],
      preferences: defaultPreferences,
      addAlert: (input) => {
        const { preferences, alerts } = get();

        if (input.dedupeKey) {
          const existing = alerts.find(
            (alert) => alert.dedupeKey === input.dedupeKey
          );
          if (existing) {
            return existing;
          }
        }

        const now = new Date().toISOString();
        const alert: Alert = {
          id: generateAlertId(),
          type: input.type,
          title: input.title,
          description: input.description,
          severity: input.severity ?? "info",
          createdAt: now,
          acknowledged: false,
          metadata: input.metadata,
          source: input.source,
          dedupeKey: input.dedupeKey,
          channels: buildChannels(input.channels, preferences),
        };

        set((state) => ({
          alerts: [alert, ...state.alerts],
        }));

        return alert;
      },
      acknowledgeAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id
              ? {
                  ...alert,
                  acknowledged: true,
                }
              : alert
          ),
        }));
      },
      dismissAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== id),
        }));
      },
      markChannelStatus: (id, channel, status, error) => {
        const lastAttemptAt = new Date().toISOString();
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id
              ? {
                  ...alert,
                  channels: alert.channels.map((channelState) =>
                    channelState.channel === channel
                      ? {
                          ...channelState,
                          status,
                          lastAttemptAt,
                          error,
                        }
                      : channelState
                  ),
                }
              : alert
          ),
        }));
      },
      setChannelPreference: (channel, enabled) => {
        set((state) => ({
          preferences: {
            channels: {
              ...state.preferences.channels,
              [channel]: enabled,
            },
          },
        }));
      },
      clearAll: () => {
        set({ alerts: [] });
      },
    }),
    buildPersistOptions()
  )
);


