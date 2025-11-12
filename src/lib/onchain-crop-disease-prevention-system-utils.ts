import { type Address } from 'viem';

export interface PreventionPlan {
  id: bigint;
  creator: Address;
  diseaseType: string;
  scheduledDate: bigint;
  completed: boolean;
}

export function createPreventionPlan(
  creator: Address,
  diseaseType: string,
  scheduledDate: bigint
): PreventionPlan {
  return {
    id: BigInt(0),
    creator,
    diseaseType,
    scheduledDate,
    completed: false,
  };
}

export function completePrevention(plan: PreventionPlan): PreventionPlan {
  return {
    ...plan,
    completed: true,
  };
}

export function getScheduledPreventions(
  plans: PreventionPlan[],
  currentTime: bigint
): PreventionPlan[] {
  return plans.filter((p) => !p.completed && p.scheduledDate <= currentTime);
}

export function getPreventionsByDisease(
  plans: PreventionPlan[],
  diseaseType: string
): PreventionPlan[] {
  return plans.filter((p) => p.diseaseType === diseaseType);
}
