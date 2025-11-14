import { type Address } from 'viem';

/**
 * Onchain farm livestock milking utilities
 * Milking record creation and verification
 */

export interface MilkingRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  milkAmount: bigint;
  milkingTime: bigint;
  quality: string;
  verified: boolean;
  timestamp: bigint;
}

export function createMilkingRecord(
  address: Address,
  animalId: string,
  milkAmount: bigint,
  milkingTime: bigint,
  quality: string
): MilkingRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    milkAmount,
    milkingTime,
    quality,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

