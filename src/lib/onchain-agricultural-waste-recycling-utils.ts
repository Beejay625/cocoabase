import { type Address } from 'viem';

export interface WasteRecord {
  id: bigint;
  recorder: Address;
  wasteType: string;
  amount: bigint;
  recycled: boolean;
  timestamp: bigint;
}

export function createWasteRecord(
  recorder: Address,
  wasteType: string,
  amount: bigint,
  recycled: boolean
): WasteRecord {
  return {
    id: BigInt(0),
    recorder,
    wasteType,
    amount,
    recycled,
    timestamp: BigInt(Date.now()),
  };
}

