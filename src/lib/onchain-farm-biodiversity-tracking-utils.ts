import { type Address } from 'viem';

export interface BiodiversityRecord {
  id: bigint;
  recorder: Address;
  species: string;
  count: bigint;
  habitat: string;
  timestamp: bigint;
}

export function createBiodiversityRecord(
  recorder: Address,
  species: string,
  count: bigint,
  habitat: string
): BiodiversityRecord {
  return {
    id: BigInt(0),
    recorder,
    species,
    count,
    habitat,
    timestamp: BigInt(Date.now()),
  };
}

