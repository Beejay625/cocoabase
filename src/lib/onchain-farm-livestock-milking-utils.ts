import { type Address } from 'viem';

export interface MilkingRecord {
  id: string;
  recordId: bigint;
  livestockId: bigint;
  milkQuantity: bigint;
  milkingDate: bigint;
  milker: Address;
  quality: string;
}

export function createMilkingRecord(
  address: Address,
  livestockId: bigint,
  milkQuantity: bigint,
  quality: string
): MilkingRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    livestockId,
    milkQuantity,
    milkingDate: BigInt(Date.now()),
    milker: address,
    quality,
  };
}
