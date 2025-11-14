import { type Address } from 'viem';

/**
 * Onchain farm livestock growth tracking utilities
 * Growth record creation on blockchain
 */

export interface GrowthRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  weight: bigint;
  height: bigint;
  measurementDate: bigint;
  measurementMethod: string;
  timestamp: bigint;
}

export function createGrowthRecord(
  address: Address,
  animalId: string,
  weight: bigint,
  height: bigint,
  measurementDate: bigint,
  measurementMethod: string
): GrowthRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    weight,
    height,
    measurementDate,
    measurementMethod,
    timestamp: BigInt(Date.now()),
  };
}

