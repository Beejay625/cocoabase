import { type Address } from 'viem';

export interface OptimizationPlan {
  id: string;
  plantationId: bigint;
  cropType: string;
  targetYield: bigint;
  currentYield: bigint;
  recommendations: string[];
  owner: Address;
  active: boolean;
}

export function createOptimizationPlan(
  address: Address,
  plantationId: bigint,
  cropType: string,
  targetYield: bigint,
  currentYield: bigint,
  recommendations: string[]
): OptimizationPlan {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    cropType,
    targetYield,
    currentYield,
    recommendations,
    owner: address,
    active: true,
  };
}


