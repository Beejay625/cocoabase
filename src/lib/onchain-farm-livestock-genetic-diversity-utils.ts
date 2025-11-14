import { type Address } from 'viem';

export interface DiversityRecord {
  id: string;
  populationId: bigint;
  diversityIndex: bigint;
  uniqueGenotypes: bigint;
  recorder: Address;
}

export function createDiversityRecord(
  address: Address,
  populationId: bigint,
  diversityIndex: bigint,
  uniqueGenotypes: bigint
): DiversityRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    populationId,
    diversityIndex,
    uniqueGenotypes,
    recorder: address,
  };
}

