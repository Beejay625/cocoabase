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
