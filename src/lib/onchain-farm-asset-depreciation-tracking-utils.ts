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
