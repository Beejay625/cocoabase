import { type Address } from 'viem';

/**
 * Onchain farm livestock waste management utilities
 * Waste record creation and verification
 */

export interface LivestockWasteRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  wasteType: string;
  amount: bigint;
  collectionDate: bigint;
  disposalMethod: string;
  verified: boolean;
  timestamp: bigint;
}

export function createWasteRecord(
  address: Address,
  animalId: string,
  wasteType: string,
  amount: bigint,
  collectionDate: bigint,
  disposalMethod: string
): LivestockWasteRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    wasteType,
    amount,
    collectionDate,
    disposalMethod,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

