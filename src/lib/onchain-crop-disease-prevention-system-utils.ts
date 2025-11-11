import { type Address } from 'viem';

export interface PreventionPlan {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  diseaseType: string;
  preventionMethod: string;
  scheduledDate: bigint;
  status: 'scheduled' | 'completed' | 'cancelled';
  txHash: string;
}

export function createPreventionPlan(
  owner: Address,
  plantationId: bigint,
  diseaseType: string,
  preventionMethod: string,
  scheduledDate: bigint
): PreventionPlan {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    diseaseType,
    preventionMethod,
    scheduledDate,
    status: 'scheduled',
    txHash: '',
  };
}

export function completePrevention(
  plan: PreventionPlan
): PreventionPlan {
  return {
    ...plan,
    status: 'completed',
  };
}

export function getScheduledPreventions(
  plans: PreventionPlan[],
  currentTime: bigint
): PreventionPlan[] {
  return plans.filter(
    (p) => p.status === 'scheduled' && p.scheduledDate >= currentTime
  );
}

export function getPreventionsByDisease(
  plans: PreventionPlan[],
  diseaseType: string
): PreventionPlan[] {
  return plans.filter((p) => p.diseaseType === diseaseType);
}
