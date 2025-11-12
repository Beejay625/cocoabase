import { type Address } from 'viem';

export interface PreventionPlan {
  id: bigint;
  planner: Address;
  diseaseType: string;
  scheduledDate: bigint;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export function createPreventionPlan(
  planner: Address,
  diseaseType: string,
  scheduledDate: bigint
): PreventionPlan {
  return {
    id: BigInt(0),
    planner,
    diseaseType,
    scheduledDate,
    status: 'scheduled',
  };
}
