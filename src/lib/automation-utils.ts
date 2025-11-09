export type AutomationTrigger = 
  | "time-based"
  | "stage-change"
  | "task-completion"
  | "threshold-reached"
  | "event-based";

export type AutomationAction = 
  | "auto-harvest"
  | "send-alert"
  | "generate-report"
  | "backup-data"
  | "update-stage"
  | "create-task"
  | "send-notification";

export type AutomationStatus = "active" | "paused" | "disabled";

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: AutomationTrigger;
  triggerConfig: Record<string, unknown>;
  action: AutomationAction;
  actionConfig: Record<string, unknown>;
  status: AutomationStatus;
  enabled: boolean;
  lastExecuted?: Date;
  executionCount: number;
  createdAt: Date;
}

export const createTimeBasedRule = (
  name: string,
  schedule: string,
  action: AutomationAction,
  actionConfig: Record<string, unknown>
): AutomationRule => {
  return {
    id: `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    description: `Execute ${action} on schedule: ${schedule}`,
    trigger: "time-based",
    triggerConfig: { schedule },
    action,
    actionConfig,
    status: "active",
    enabled: true,
    executionCount: 0,
    createdAt: new Date(),
  };
};

export const createStageChangeRule = (
  name: string,
  fromStage: string,
  toStage: string,
  action: AutomationAction,
  actionConfig: Record<string, unknown>
): AutomationRule => {
  return {
    id: `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    description: `Execute ${action} when stage changes from ${fromStage} to ${toStage}`,
    trigger: "stage-change",
    triggerConfig: { fromStage, toStage },
    action,
    actionConfig,
    status: "active",
    enabled: true,
    executionCount: 0,
    createdAt: new Date(),
  };
};

export const createThresholdRule = (
  name: string,
  metric: string,
  threshold: number,
  operator: ">" | "<" | ">=" | "<=" | "==",
  action: AutomationAction,
  actionConfig: Record<string, unknown>
): AutomationRule => {
  return {
    id: `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    description: `Execute ${action} when ${metric} ${operator} ${threshold}`,
    trigger: "threshold-reached",
    triggerConfig: { metric, threshold, operator },
    action,
    actionConfig,
    status: "active",
    enabled: true,
    executionCount: 0,
    createdAt: new Date(),
  };
};

export const shouldExecuteRule = (
  rule: AutomationRule,
  context: Record<string, unknown>
): boolean => {
  if (!rule.enabled || rule.status !== "active") return false;

  switch (rule.trigger) {
    case "threshold-reached": {
      const { metric, threshold, operator } = rule.triggerConfig;
      const value = context[metric as string] as number;
      if (value === undefined) return false;

      switch (operator) {
        case ">":
          return value > threshold;
        case "<":
          return value < threshold;
        case ">=":
          return value >= threshold;
        case "<=":
          return value <= threshold;
        case "==":
          return value === threshold;
        default:
          return false;
      }
    }
    case "stage-change": {
      const { fromStage, toStage } = rule.triggerConfig;
      return (
        context.currentStage === toStage && context.previousStage === fromStage
      );
    }
    case "time-based": {
      const { schedule } = rule.triggerConfig;
      return checkSchedule(schedule as string);
    }
    default:
      return false;
  }
};

const checkSchedule = (schedule: string): boolean => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();

  if (schedule === "daily") return true;
  if (schedule === "weekly" && day === 0) return true;
  if (schedule === "monthly" && now.getDate() === 1) return true;
  if (schedule.startsWith("hourly-")) {
    const targetHour = parseInt(schedule.split("-")[1]);
    return hour === targetHour;
  }

  return false;
};

export const executeRule = (rule: AutomationRule): AutomationRule => {
  return {
    ...rule,
    lastExecuted: new Date(),
    executionCount: rule.executionCount + 1,
  };
};

export const getActiveRules = (rules: AutomationRule[]): AutomationRule[] => {
  return rules.filter((r) => r.enabled && r.status === "active");
};

export const getRulesByTrigger = (
  rules: AutomationRule[],
  trigger: AutomationTrigger
): AutomationRule[] => {
  return rules.filter((r) => r.trigger === trigger);
};

export const getRulesByAction = (
  rules: AutomationRule[],
  action: AutomationAction
): AutomationRule[] => {
  return rules.filter((r) => r.action === action);
};

export const toggleRule = (rule: AutomationRule): AutomationRule => {
  return {
    ...rule,
    enabled: !rule.enabled,
    status: rule.enabled ? "paused" : "active",
  };
};

export const getAutomationSummary = (rules: AutomationRule[]): {
  total: number;
  active: number;
  paused: number;
  disabled: number;
  byTrigger: Record<AutomationTrigger, number>;
  byAction: Record<AutomationAction, number>;
  totalExecutions: number;
} => {
  const byTrigger = rules.reduce(
    (acc, rule) => {
      if (!acc[rule.trigger]) {
        acc[rule.trigger] = 0;
      }
      acc[rule.trigger]++;
      return acc;
    },
    {} as Record<AutomationTrigger, number>
  );

  const byAction = rules.reduce(
    (acc, rule) => {
      if (!acc[rule.action]) {
        acc[rule.action] = 0;
      }
      acc[rule.action]++;
      return acc;
    },
    {} as Record<AutomationAction, number>
  );

  return {
    total: rules.length,
    active: rules.filter((r) => r.status === "active").length,
    paused: rules.filter((r) => r.status === "paused").length,
    disabled: rules.filter((r) => r.status === "disabled").length,
    byTrigger,
    byAction,
    totalExecutions: rules.reduce((sum, r) => sum + r.executionCount, 0),
  };
};

