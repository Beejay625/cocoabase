import { type Address } from 'viem';

export interface WaterConservationRecord {
  id: bigint;
  recorder: Address;
  method: string;
  savedAmount: bigint;
  timestamp: bigint;
}

export function createWaterConservationRecord(
  recorder: Address,
  method: string,
  savedAmount: bigint
): WaterConservationRecord {
  return {
    id: BigInt(0),
    recorder,
    method,
    savedAmount,
    timestamp: BigInt(Date.now()),
  };
}

export function getRecordsByMethod(
  records: WaterConservationRecord[],
  method: string
): WaterConservationRecord[] {
  return records.filter((r) => r.method === method);
}

export function calculateTotalSaved(records: WaterConservationRecord[]): bigint {
  return records.reduce((total, r) => total + r.savedAmount, BigInt(0));
}

export function getRecentConservation(
  records: WaterConservationRecord[],
  days: number
): WaterConservationRecord[] {
  const cutoff = BigInt(Date.now()) - BigInt(days * 24 * 60 * 60 * 1000);
  return records.filter((r) => r.timestamp >= cutoff);
}
