import type {
  Plantation,
  PlantationTask,
  GrowthStage,
} from "@/store/plantations";
import {
  type AlertChannel,
  type AlertSeverity,
  type AlertType,
  type NewAlertInput,
  useAlertsStore,
} from "@/store/alerts";

export type TaskDeadlineThreshold = "due_soon" | "overdue";

export type TaskDeadlineAlertParams = {
  plantation: Plantation;
  task: PlantationTask;
  threshold: TaskDeadlineThreshold;
  daysRemaining?: number;
  daysOverdue?: number;
};

export type StageChangeAlertParams = {
  plantation: Plantation;
  previousStage: GrowthStage;
  nextStage: GrowthStage;
  note?: string;
};

export type WalletActivityAlertParams = {
  address: string;
  activity: "connected" | "disconnected" | "watch_added" | "watch_removed";
  label?: string;
};

const stageLabels: Record<GrowthStage, string> = {
  planted: "Planted",
  growing: "Growing",
  harvested: "Harvested",
};

const pluralize = (count: number, singular: string, plural: string) =>
  `${count} ${count === 1 ? singular : plural}`;

const defaultChannels: AlertChannel[] = ["in_app", "email", "sms"];

const buildTaskDeadlineDescription = (
  params: TaskDeadlineAlertParams
): string => {
  if (params.threshold === "overdue") {
    const days = Math.max(1, params.daysOverdue ?? 1);
    return `${params.task.title} is overdue by ${pluralize(
      days,
      "day",
      "days"
    )}.`;
  }

  const days = Math.max(0, params.daysRemaining ?? 0);
  if (days === 0) {
    return `${params.task.title} is due today.`;
  }

  return `${params.task.title} is due in ${pluralize(days, "day", "days")}.`;
};

export const createTaskDeadlineAlert = (
  params: TaskDeadlineAlertParams
): NewAlertInput => {
  const severity: AlertSeverity =
    params.threshold === "overdue" ? "critical" : "warning";
  const title =
    params.threshold === "overdue"
      ? `Task overdue: ${params.task.title}`
      : `Upcoming deadline: ${params.task.title}`;

  return {
    type:
      params.threshold === "overdue"
        ? ("task_overdue" as AlertType)
        : ("task_due" as AlertType),
    title,
    description: buildTaskDeadlineDescription(params),
    severity,
    metadata: {
      plantationId: params.plantation.id,
      taskId: params.task.id,
      dueDate: params.task.dueDate,
      threshold: params.threshold,
      daysRemaining: params.daysRemaining,
      daysOverdue: params.daysOverdue,
    },
    source: {
      kind: "task",
      plantationId: params.plantation.id,
      taskId: params.task.id,
    },
    channels: defaultChannels,
    dedupeKey: `task-${params.task.id}-${params.threshold}`,
  };
};

export const createStageChangeAlert = (
  params: StageChangeAlertParams
): NewAlertInput => {
  const nextStageLabel = stageLabels[params.nextStage] ?? params.nextStage;
  const previousStageLabel =
    stageLabels[params.previousStage] ?? params.previousStage;

  return {
    type: "stage_change",
    title: `${params.plantation.seedName} moved to ${nextStageLabel}`,
    description: `${params.plantation.seedName} advanced from ${previousStageLabel} to ${nextStageLabel}.`,
    severity: "info",
    metadata: {
      plantationId: params.plantation.id,
      previousStage: params.previousStage,
      nextStage: params.nextStage,
      note: params.note,
    },
    source: {
      kind: "plantation",
      plantationId: params.plantation.id,
    },
    channels: defaultChannels,
    dedupeKey: `stage-${params.plantation.id}-${params.nextStage}`,
  };
};

export const createWalletActivityAlert = (
  params: WalletActivityAlertParams
): NewAlertInput => {
  const { address, activity, label } = params;
  const shortened =
    address.length > 10
      ? `${address.slice(0, 6)}…${address.slice(address.length - 4)}`
      : address;

  const titleByActivity: Record<typeof activity, string> = {
    connected: `Wallet connected: ${shortened}`,
    disconnected: `Wallet disconnected: ${shortened}`,
    watch_added: `Watchlist wallet added: ${shortened}`,
    watch_removed: `Watchlist wallet removed: ${shortened}`,
  } as const;

  const descriptionByActivity: Record<typeof activity, string> = {
    connected: label
      ? `${label} (${shortened}) is now active.`
      : `${shortened} is now active.`,
    disconnected: label
      ? `${label} (${shortened}) disconnected.`
      : `${shortened} disconnected.`,
    watch_added: label
      ? `${label} (${shortened}) added to watchlist.`
      : `${shortened} added to watchlist.`,
    watch_removed: label
      ? `${label} (${shortened}) removed from watchlist.`
      : `${shortened} removed from watchlist.`,
  } as const;

  return {
    type: "wallet_activity",
    title: titleByActivity[activity],
    description: descriptionByActivity[activity],
    severity: activity === "disconnected" ? "warning" : "info",
    metadata: {
      address,
      label,
      activity,
    },
    source: {
      kind: "wallet",
      address,
      activity,
    },
    channels: defaultChannels,
    dedupeKey: `wallet-${activity}-${address}`,
  };
};

export const dispatchAlert = (input: NewAlertInput) => {
  const { addAlert } = useAlertsStore.getState();
  return addAlert(input);
};


