import { type Address } from 'viem';

export interface DepreciationRecord {
  id: bigint;
  owner: Address;
  assetId: bigint;
  originalValue: bigint;
  currentValue: bigint;
  depreciationDate: bigint;
  txHash: string;
}

export function recordDepreciation(
  owner: Address,
  assetId: bigint,
  originalValue: bigint,
  currentValue: bigint
): DepreciationRecord {
  return {
    id: BigInt(Date.now()),
    owner,
    assetId,
    originalValue,
    currentValue,
    depreciationDate: BigInt(Date.now()),
    txHash: '',
  };
}

export function calculateDepreciationAmount(
  record: DepreciationRecord
): bigint {
  return record.originalValue - record.currentValue;
}

export function calculateDepreciationRate(
  record: DepreciationRecord
): number {
  return Number(calculateDepreciationAmount(record)) / Number(record.originalValue);
}

export function getDepreciationByAsset(
  records: DepreciationRecord[],
  assetId: bigint
): DepreciationRecord[] {
  return records.filter((r) => r.assetId === assetId);
}
