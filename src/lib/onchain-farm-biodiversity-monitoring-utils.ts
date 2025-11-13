import { type Address } from 'viem';

/**
 * Onchain farm biodiversity monitoring utilities
 * Biodiversity record creation and verification
 */

export interface BiodiversityRecord {
  id: string;
  plantationId: string;
  recordedBy: Address;
  speciesType: string;
  speciesCount: number;
  habitatArea: bigint;
  observationDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createBiodiversityRecord(
  address: Address,
  plantationId: string,
  speciesType: string,
  speciesCount: number,
  habitatArea: bigint,
  observationDate: bigint
): BiodiversityRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    recordedBy: address,
    speciesType,
    speciesCount,
    habitatArea,
    observationDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

