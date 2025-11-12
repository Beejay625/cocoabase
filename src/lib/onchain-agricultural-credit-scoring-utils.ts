import { type Address } from 'viem';

export interface CreditScore {
  id: bigint;
  farmer: Address;
  score: number;
  factors: string[];
  timestamp: bigint;
}

export function calculateCreditScore(
  farmer: Address,
  score: number,
  factors: string[]
): CreditScore {
  return {
    id: BigInt(0),
    farmer,
    score,
    factors,
    timestamp: BigInt(Date.now()),
  };
}
