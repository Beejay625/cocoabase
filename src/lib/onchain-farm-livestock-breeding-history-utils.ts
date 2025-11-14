import { type Address } from 'viem';

/**
 * Onchain farm livestock breeding history utilities
 * Breeding history creation on blockchain
 */

export interface BreedingHistory {
  id: string;
  animalId: string;
  recordedBy: Address;
  mateId: string;
  breedingDate: bigint;
  breedingMethod: string;
  success: boolean;
  timestamp: bigint;
}

export function createBreedingHistory(
  address: Address,
  animalId: string,
  mateId: string,
  breedingDate: bigint,
  breedingMethod: string,
  success: boolean
): BreedingHistory {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    mateId,
    breedingDate,
    breedingMethod,
    success,
    timestamp: BigInt(Date.now()),
  };
}

