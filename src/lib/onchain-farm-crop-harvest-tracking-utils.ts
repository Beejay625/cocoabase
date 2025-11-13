import { type Address } from 'viem';

/**
 * Onchain farm crop harvest tracking utilities
 * Harvest record creation and verification
 */

export interface HarvestRecord {
  id: string;
  plantationId: string;
  recordedBy: Address;
  cropType: string;
  yieldAmount: bigint;
  harvestDate: bigint;
  quality: string;
  verified: boolean;
  timestamp: bigint;
}

export function createHarvestRecord(
  address: Address,
  plantationId: string,
  cropType: string,
  yieldAmount: bigint,
  harvestDate: bigint,
  quality: string
): HarvestRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    recordedBy: address,
    cropType,
    yieldAmount,
    harvestDate,
    quality,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

