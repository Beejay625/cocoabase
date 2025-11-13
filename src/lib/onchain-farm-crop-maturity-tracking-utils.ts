import { type Address } from 'viem';

/**
 * Onchain farm crop maturity tracking utilities
 * Crop maturity record creation and updates
 */

export interface CropMaturityRecord {
  id: string;
  plantationId: string;
  recordedBy: Address;
  maturityStage: string;
  maturityPercentage: number;
  expectedHarvestDate: bigint;
  timestamp: bigint;
}

export function createMaturityRecord(
  address: Address,
  plantationId: string,
  maturityStage: string,
  maturityPercentage: number,
  expectedHarvestDate: bigint
): CropMaturityRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    recordedBy: address,
    maturityStage,
    maturityPercentage,
    expectedHarvestDate,
    timestamp: BigInt(Date.now()),
  };
}

