import { type Address } from 'viem';

export interface RevenueRecord {
  id: bigint;
  recorder: Address;
  source: string;
  amount: bigint;
  recognitionDate: bigint;
  status: 'pending' | 'recognized';
}

export function createRevenueRecord(
  recorder: Address,
  source: string,
  amount: bigint,
  recognitionDate: bigint
): RevenueRecord {
  return {
    id: BigInt(0),
    recorder,
    source,
    amount,
    recognitionDate,
    status: 'pending',
  };
}
