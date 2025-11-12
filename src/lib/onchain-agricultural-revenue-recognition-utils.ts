import { type Address } from 'viem';

export interface RevenueRecord {
  id: bigint;
  owner: Address;
  revenueSource: string;
  amount: bigint;
  recognitionDate: bigint;
  period: string;
  txHash: string;
}

export function recognizeRevenue(
  owner: Address,
  revenueSource: string,
  amount: bigint,
  period: string
): RevenueRecord {
  return {
    id: BigInt(Date.now()),
    owner,
    revenueSource,
    amount,
    recognitionDate: BigInt(Date.now()),
    period,
    txHash: '',
  };
}

export function getTotalRevenueByPeriod(
  records: RevenueRecord[],
  period: string
): bigint {
  return records
    .filter((r) => r.period === period)
    .reduce((total, r) => total + r.amount, BigInt(0));
}

export function getRevenueBySource(
  records: RevenueRecord[],
  revenueSource: string
): RevenueRecord[] {
  return records.filter((r) => r.revenueSource === revenueSource);
}

export function getTotalRevenue(
  records: RevenueRecord[]
): bigint {
  return records.reduce((total, r) => total + r.amount, BigInt(0));
}
