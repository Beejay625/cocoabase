import { type Address } from 'viem';

/**
 * Onchain farm soil conservation utilities
 * Soil conservation plan creation and progress tracking
 */

export interface SoilConservationPlan {
  id: string;
  plantationId: string;
  createdBy: Address;
  conservationMethods: string[];
  startDate: bigint;
  targetErosion: bigint;
  currentErosion?: bigint;
  timestamp: bigint;
}

export function createConservationPlan(
  address: Address,
  plantationId: string,
  conservationMethods: string[],
  startDate: bigint,
  targetErosion: bigint
): SoilConservationPlan {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    createdBy: address,
    conservationMethods,
    startDate,
    targetErosion,
    timestamp: BigInt(Date.now()),
  };
}

