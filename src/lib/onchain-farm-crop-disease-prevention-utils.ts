import { type Address } from 'viem';

/**
 * Onchain farm crop disease prevention utilities
 * Disease prevention plan creation and execution
 */

export interface DiseasePreventionPlan {
  id: string;
  plantationId: string;
  createdBy: Address;
  preventionMethods: string[];
  schedule: string;
  startDate: bigint;
  active: boolean;
  timestamp: bigint;
}

export function createPreventionPlan(
  address: Address,
  plantationId: string,
  preventionMethods: string[],
  schedule: string,
  startDate: bigint
): DiseasePreventionPlan {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    createdBy: address,
    preventionMethods,
    schedule,
    startDate,
    active: true,
    timestamp: BigInt(Date.now()),
  };
}

