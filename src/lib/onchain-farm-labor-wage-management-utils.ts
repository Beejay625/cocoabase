import { type Address } from 'viem';

/**
 * Onchain farm labor wage management utilities
 * Wage recording and payment processing
 */

export interface WageRecord {
  id: string;
  employer: Address;
  worker: Address;
  amount: bigint;
  period: string;
  paymentDate: bigint;
  paid: boolean;
  timestamp: bigint;
}

export function createWageRecord(
  employer: Address,
  worker: Address,
  amount: bigint,
  period: string,
  paymentDate: bigint
): WageRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    employer,
    worker,
    amount,
    period,
    paymentDate,
    paid: false,
    timestamp: BigInt(Date.now()),
  };
}

