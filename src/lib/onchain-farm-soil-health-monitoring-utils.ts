import { type Address } from 'viem';

export interface SoilHealthRecord {
  id: bigint;
  recorder: Address;
  location: string;
  phLevel: number;
  organicMatter: number;
  timestamp: bigint;
}

export function createSoilHealthRecord(
  recorder: Address,
  location: string,
  phLevel: number,
  organicMatter: number
): SoilHealthRecord {
  return {
    id: BigInt(Date.now()),
    recorder,
    location,
    phLevel,
    organicMatter,
    timestamp: BigInt(Date.now()),
  };
}

export function getRecordsByLocation(
  records: SoilHealthRecord[],
  location: string
): SoilHealthRecord[] {
  return records.filter((r) => r.location === location);
}

export function isHealthySoil(
  record: SoilHealthRecord
): boolean {
  return record.phLevel >= 6 && record.phLevel <= 7.5 && record.organicMatter >= 3;
}