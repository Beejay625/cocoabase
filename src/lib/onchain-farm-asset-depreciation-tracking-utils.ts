import { type Address } from 'viem';

export interface DepreciationRecord {
  id: bigint;
  recorder: Address;
  asset: string;
  initialValue: bigint;
  currentValue: bigint;
  depreciationRate: bigint;
  timestamp: bigint;
}

export function createDepreciationRecord(
  recorder: Address,
  asset: string,
  initialValue: bigint,
  currentValue: bigint,
  depreciationRate: bigint
): DepreciationRecord {
  return {
    id: BigInt(0),
    recorder,
    asset,
    initialValue,
    currentValue,
    depreciationRate,
    timestamp: BigInt(Date.now()),
  };
}

export function calculateDepreciation(record: DepreciationRecord): bigint {
  return record.initialValue - record.currentValue;
}

export function getRecordsByAsset(
  records: DepreciationRecord[],
  asset: string
): DepreciationRecord[] {
  return records.filter((r) => r.asset === asset);
}

export function calculateTotalDepreciation(
  records: DepreciationRecord[]
): bigint {
  return records.reduce(
    (total, r) => total + calculateDepreciation(r),
    BigInt(0)
  );
}
