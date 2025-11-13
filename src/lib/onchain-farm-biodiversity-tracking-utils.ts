import { type Address } from 'viem';

export interface BiodiversityRecord {
  id: bigint;
  recorder: Address;
  species: string;
  count: bigint;
  location: string;
  timestamp: bigint;
}

export function createBiodiversityRecord(
  recorder: Address,
  species: string,
  count: bigint,
  location: string
): BiodiversityRecord {
  return {
    id: BigInt(Date.now()),
    recorder,
    species,
    count,
    location,
    timestamp: BigInt(Date.now()),
  };
}

export function getTotalSpeciesCount(
  records: BiodiversityRecord[]
): bigint {
  return records.reduce((total, r) => total + r.count, BigInt(0));
}

export function getRecordsBySpecies(
  records: BiodiversityRecord[],
  species: string
): BiodiversityRecord[] {
  return records.filter((r) => r.species === species);
}