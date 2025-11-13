import { type Address } from 'viem';

/**
 * Onchain farm crop monitoring utilities
 * Crop monitoring record creation and updates
 */

export interface CropMonitoring {
  id: string;
  plantationId: string;
  monitoredBy: Address;
  growthStage: string;
  healthScore: number;
  notes: string;
  timestamp: bigint;
}

export function createCropMonitoring(
  address: Address,
  plantationId: string,
  growthStage: string,
  healthScore: number,
  notes: string
): CropMonitoring {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    monitoredBy: address,
    growthStage,
    healthScore,
    notes,
    timestamp: BigInt(Date.now()),
  };
}

