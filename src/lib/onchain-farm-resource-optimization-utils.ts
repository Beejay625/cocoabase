import { type Address } from 'viem';

export interface OptimizationPlan {
  id: string;
  planId: bigint;
  farmOwner: Address;
  resourceType: string;
  currentUsage: bigint;
  optimalUsage: bigint;
  savings: bigint;
  date: bigint;
  implemented: boolean;
}

export function createOptimizationPlan(
  farmOwner: Address,
  planId: bigint,
  resourceType: string,
  currentUsage: bigint,
  optimalUsage: bigint
): OptimizationPlan {
  const savings = currentUsage > optimalUsage ? currentUsage - optimalUsage : BigInt(0);

  return {
    id: `${Date.now()}-${Math.random()}`,
    planId,
    farmOwner,
    resourceType,
    currentUsage,
    optimalUsage,
    savings,
    date: BigInt(Date.now()),
    implemented: false,
  };
}
