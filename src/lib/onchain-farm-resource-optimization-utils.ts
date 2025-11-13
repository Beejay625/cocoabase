import { type Address } from 'viem';

export interface OptimizationPlan {
  id: bigint;
  planner: Address;
  resourceType: string;
  currentUsage: bigint;
  optimizedUsage: bigint;
  savings: bigint;
  timestamp: bigint;
}

export function createOptimizationPlan(
  planner: Address,
  resourceType: string,
  currentUsage: bigint,
  optimizedUsage: bigint
): OptimizationPlan {
  const savings = currentUsage - optimizedUsage;
  return {
    id: BigInt(Date.now()),
    planner,
    resourceType,
    currentUsage,
    optimizedUsage,
    savings,
    timestamp: BigInt(Date.now()),
  };
}

export function calculateSavingsPercentage(
  plan: OptimizationPlan
): number {
  return Number(plan.savings) / Number(plan.currentUsage) * 100;
}

export function getPlansByResource(
  plans: OptimizationPlan[],
  resourceType: string
): OptimizationPlan[] {
  return plans.filter((p) => p.resourceType === resourceType);
}
