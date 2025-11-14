import { type Address } from 'viem';

/**
 * Onchain farm livestock mortality tracking utilities
 * Mortality record creation on blockchain
 */

export interface MortalityRecord {
  id: string;
  animalId: string;
  recordedBy: Address;
  deathDate: bigint;
  causeOfDeath: string;
  disposalMethod: string;
  verified: boolean;
  timestamp: bigint;
}

export function createMortalityRecord(
  address: Address,
  animalId: string,
  deathDate: bigint,
  causeOfDeath: string,
  disposalMethod: string
): MortalityRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    recordedBy: address,
    deathDate,
    causeOfDeath,
    disposalMethod,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

