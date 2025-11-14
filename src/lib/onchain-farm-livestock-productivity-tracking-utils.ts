import { type Address } from 'viem';

export interface ProductivityRecord {
  id: string;
  livestockId: bigint;
  productivityType: string;
  amount: bigint;
  period: bigint;
  recorder: Address;
}

export function createProductivityRecord(
  address: Address,
  livestockId: bigint,
  productivityType: string,
  amount: bigint,
  period: bigint
): ProductivityRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    livestockId,
    productivityType,
    amount,
    period,
    recorder: address,
  };
}

